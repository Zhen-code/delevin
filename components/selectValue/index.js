const util = require('../../utils/util111')
const computedBehavior = require('miniprogram-computed')
let app = getApp()
//配合computer 传值给home
let triggerEvent
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [computedBehavior],
  properties: {
    shadow: Boolean,
    screen: Object,
    mainArea: Array,
    subArea: Array,
    tabTitle: Array,
    pricePrice: Array,
    type: Array,
    areaFirstList: Array,
    subwayList: Array,
    areaList: Array,
    city: Boolean,
  },
  /**
   * 组件的初始数据
   */
  data: {
    e: '',
    leftAction: 0,
    search: "", //搜索内容
    pullimg: ["/combination/image/icon_dragdown_12_nor@2x.png", "/combination/image/icon_dragdown_12_pre@2x.png"],
    bgShow: false,
    tabIndex: 0,
    itemType: false,
    conditionList: ['区域', '单价', '户型', '销售状态'],
    Amount: {
      title: '单价区间(元/m²)',
      up: '最高价格(元/m²)',
      down: '最低价格(元/m²)',
    },
    areaFirst: { //区域数据
      list: ['区域', '地铁'], //一级区域列表
      index: 0, //一级区域下表
    },
    areaSecond: [ //二级区域列表
      [ //全部区域
        {
          selected: false,
          value: "不限"
        },
      ],
      [{
        selected: false,
        value: "大石"
      }]
    ],
    areaSecondList: [],
    areaTypeList: [],
    areaTypeList2: [],
    areaSquare: [{
        id: 0,
        type: "areaSquare",
        selected: false,
        value: "不限"
      },
      {
        id: 1,
        type: "areaSquare",
        selected: false,
        value: "20m²以下"
      },
    ],
    totalPrice: [],
    totalPriceSelft: {
      top: "",
      bottom: ""
    },
    houseType: [{
        id: 0,
        type: "houseType",
        selected: false,
        value: "不限"
      },
      {
        id: 1,
        type: "houseType",
        selected: false,
        value: "一室",
      }
    ],
    sales: [{
        id: 0,
        type: "salesType",
        selected: false,
        value: "在售"
      },
      {
        id: 1,
        type: "salesType",
        selected: false,
        value: "待售",
      }
    ],
    roomage: [{
        id: 0,
        type: "roomageType",
        selected: false,
        buildingAgeOptions: "WITHIN_FIVE_YEARS",
        value: "5年以内"
      },
      {
        id: 1,
        type: "roomageType",
        selected: false,
        buildingAgeOptions: "WITHIN_TEN_YEARS",
        value: "10年以内"
      },
      {
        id: 2,
        type: "roomageType",
        selected: false,
        buildingAgeOptions: "WITHIN_FIFTEEN_YEARS",
        value: "15年以内"
      },
      {
        id: 3,
        type: "roomageType",
        selected: false,
        buildingAgeOptions: "WITHIN_TWENTY_YEARS",
        value: "20年以内"
      },
      {
        id: 4,
        type: "roomageType",
        selected: false,
        buildingAgeOptions: "MORE_TWENTY_YEARS",
        value: "20年或以上"
      },
    ],
    rent: [{
        id: 0,
        type: "rentType",
        selected: false,
        rentType: "WHOLE_RENT",
        value: "整租"
      },
      {
        id: 1,
        type: "rentType",
        selected: false,
        rentType: "COTENANCY",
        value: "合租"
      },
    ],
    areaSquareSelft: {
      top: "",
      bottom: ""
    },
    rentPrice: {
      top: "",
      bottom: "",
    },
    transferFee: {
      top: "",
      bottom: "",
    },
    freeSecond: [
      [{
        id: "0-0",
        type: "freeSecond",
        selected: false,
        value: '不限'
      }],
      [{
        id: "1-0",
        type: "freeSecond",
        selected: false,
        value: '不限'
      }, ]
    ],
    conditionType: -1, //0区域 1面积 2费用 3筛选
    selected: [], //选中条件列表
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //清空搜索框
    delSearch() {
      this.setData({
        search: ""
      })
    },

    // tab切换
    conditionTab(e) {
      let index = e.currentTarget.dataset.index || e.currentTarget.dataset.index;
      console.log(this.data.areaselected)
      if (index === 0) {
        this.setData({
          tabIndex: index,
          conditionType: -1,
        }, () => {
          if (this.data.areaselected.length !== 0) {
            this.changeReset()
          }
          this.triggerEvent('myEvent', {})
        })
      } else {
        this.setData({
          tabIndex: index,
          conditionType: -1,
        }, () => {
          this.triggerEvent('myEvent', this.data.areaselected)
        })
      }
    },

    leftTab(e) {
      let areaTypeList = this.data.areaTypeList
      let areaSecondList = this.data.areaSecondList;
      let index = e.currentTarget.dataset.index;
      if (index === 0) {
        areaSecondList.map((item)=>{
          item.selected = false
        })
        this.setData({
          areaSecondList:areaSecondList,
          leftAction: index,
        })
      } else {
        areaTypeList.map((item)=>{
          item.selected = false;
          item.routeStop.map((key)=>{
            key.selected = false;
            return key
          })
        })
        this.setData({
          areaTypeList:areaTypeList,
          leftAction: index,
        })
      }
    },

    changeArea(e) {
      let index = e.currentTarget.dataset.index;
      let subwayList = this.data.subwayList;
      if (subwayList[index].selected) {
        subwayList[index].selected = false;
        this.setData({
          subwayList,
          routeStop: [],
        })
      } else {
        subwayList.map((item) => {
          item.selected = false;
          if (item.routeStopItem) {
            for (let i = 0; i < item.routeStopItem.length; i++) {
              item.routeStopItem[i].selected = false;
            }
          }
          return item;
        })
        subwayList[index].selected = true;
        this.setData({
          subwayList,
          routeStop: subwayList[index].routeStopItem || [],
        })
      }
    },

    //重置
    changeReset() {
      let e = this.data.e;
      this.cacel(e)
      this.triggerEvent('myEvent', {})
    },

    onHide() {
      this.setData({
        conditionType: -1
      }, () => {
        this.changeReset()
        this.triggerEvent('myEvent', {})
      })
    },

    //确认条件,关闭下拉框和蒙版
    comfirm() {
      this.triggerEvent('sendShadow', {
        shadow: true
      }, {})
      // if (this.data.areaselected.length != 0) {
      this.triggerEvent('options', this.data.areaselected) //options名称事件，父组件中使用
      // }

    },
    cacel(e) {
      //当type为all 全部删除
      let type = '';
      if (e.currentTarget.dataset.item !== undefined) {
        type = e.currentTarget.dataset.item.type
      } else {
        type = e.currentTarget.dataset.type
      }
      console.log(type)
      //新增 删除区域条件
      if (type == "streetType" || type == "all") {
        let areaSecondList = this.data.areaSecondList
        areaSecondList.map(item => {
          item.selected = false
        })
        this.setData({
          areaSecondList: areaSecondList,
        })
      }
      if (type == "totalPriceSelft" || type == "all") {
        let totalPriceSelft = this.data.totalPriceSelft
        totalPriceSelft.top = "";
        totalPriceSelft.bottom = "";
        this.setData({
          totalPriceSelft: totalPriceSelft,
        })
      }
      if (type == "subwayType" || type == "all") {
        let areaTypeList = this.data.areaTypeList;
        areaTypeList.map(item => {
          item.selected = false
        })
        this.setData({
          areaTypeList: areaTypeList,
          areaTypeList2: []
        })
      }
      //新增 删除总价条件
      if (type == "salesType" || type == "all") {
        let sales = this.data.sales
        sales.map(item => {
          item.selected = false
        })
        this.setData({
          sales: sales
        })
      }
      if (type == "totalPrice" || type == "all") {
        let totalPrice = this.data.totalPrice
        totalPrice.map(item => {
          item.selected = false
        })
        this.setData({
          totalPrice: totalPrice
        })
      }
      if (type == "houseType" || type == "all") {
        let houseType = this.data.houseType
        houseType.map(item => {
          item.selected = false
        })
        this.setData({
          houseType: houseType
        })
      }
      if (type == "roomageType" || type == "all") {
        let roomage = this.data.roomage
        roomage.map(item => {
          item.selected = false
        })
        this.setData({
          roomage: roomage
        })
      }
      if (type == "rentType" || type == "all") {
        let rent = this.data.rent
        rent.map(item => {
          item.selected = false
        })
        this.setData({
          rent: rent
        })
      }
      //删除区域条件
      if (type == "areaSecond" || type == "all") {
        let areaSecond = this.data.areaSecond
        areaSecond.map(item => {
          item.map(item2 => {
            item2.selected = false
          })
        })
        this.setData({
          areaSecond: areaSecond
        })
      }
      //删除面积条件
      if (type == "areaSquare" || type == "all" || type == "selfSquare") {
        let areaSquare = this.data.areaSquare
        areaSquare.map(item => {
          item.selected = false
        })
        this.setData({
          areaSquare: areaSquare,
          // areaSquareSelft: {
          //   top: "",
          //   bottom: ""
          // }
        })
      }
      //删除自选面积
      if (type == "areaSquareSelft" || type == "all" || type == "selfSquare") {
        let areaSquareSelft = this.data.areaSquareSelft
        areaSquareSelft.top = ""
        areaSquareSelft.bottom = ""
        this.setData({
          areaSquareSelft: areaSquareSelft
        })
      }
      //删除费用条件
      if (type == "freeSecond" || type == "all" || type == "free") {
        let freeSecond = this.data.freeSecond
        freeSecond.map(item => {
          item.map(item2 => {
            item2.selected = false
          })
        })
        this.setData({
          freeSecond: freeSecond,
        })
      }
      if (type == "rentPrice" || type == "all" || type == "free") {
        let rentPrice = this.data.rentPrice
        rentPrice.top = ""
        rentPrice.bottom = ""
        this.setData({
          rentPrice: rentPrice
        })
      }
      if (type == "transferFee" || type == "all" || type == "free") {
        let transferFee = this.data.transferFee
        transferFee.top = ""
        transferFee.bottom = ""
        this.setData({
          transferFee: transferFee
        })
      }
      //删除筛选条件
      // if (type == "shopSource" || type == "propertyType" || type == "operation" || type == "supportFacility" || type == "screen" || type == "all") {
      if (type == "screen" || type == "all") {
        let screen = this.data.screen
        for (let key in screen) {
          screen[key].list.map(item => {
            item.selected = false
          })
        }
        this.setData({
          screen: screen
        })
      }
      if (type == "all") {
        this.triggerEvent('options', this.data.areaselected) //options名称事件，父组件中使用
        this.triggerEvent('myEvent', {})
      }
    },
    //显示下拉条件框
    pulldown(e) {
      const index = e.currentTarget.dataset.index;
      // console.log(this.data.shadow)
      if (this.data.shadow) {
        this.triggerEvent('sendShadow', {
          shadow: false
        }, {})
      }
      if (this.data.conditionType == index) {
        this.setData({
          conditionType: -1,
        })
        this.triggerEvent('sendShadow', {
          shadow: true
        }, {})
        this.comfirm()
        return
      }
      this.setData({
        conditionType: index,
      })
      // this.triggerEvent('sendShadow', { shadow: false }, {})
    },
    changebg() {
      console.log(321)
      this.setData({
        bgShow: true
      })
    },
    //改变区域的index
    changeIndex(e) {
      const index = e.currentTarget.dataset.index;
      const type = e.currentTarget.dataset.type;
      if (type == 'area') {
        var areaIndex = 'areaFirst.index';
        this.setData({
          [areaIndex]: index
        })
      } else if (type == 'free') {
        var freeIndex = 'freeFirst.index';
        this.setData({
          [freeIndex]: index
        })
      }
    },
    shadeClose() {
      console.log("shadeClose")
      this.setData({
        bgShow: false
      })
    },
    //选择区域条件
    areaSelected(e) {
      // var array = this.data.selected
      let id = e.currentTarget.dataset.areaid;
      var index1 = id.split("-")[0]
      var index2 = id.split("-")[1]
      var selected = !this.data.areaSecond[index1][index2].selected
      //保留用户所在区域的选中状态
      let areaSecond1 = JSON.parse(JSON.stringify(this.data.areaSecond[index1]))
      console.log(id)
      console.log(areaSecond1)

      let areaSecond = this.data.areaSecond
      areaSecond[index1][index2].selected = !areaSecond[index1][index2].selected
      var string = 'areaSecond[' + index1 + '][' + index2 + '].selected'
      if (index1 == 0 && index2 == 0) {
        console.log(123)
        e.currentTarget.dataset.type = "areaSecond"
        this.cacel(e)
        this.setData({
          [string]: selected
          // areaSecond:areaSecond
        })
        return
      }
      //选择区域内不限时，清空改区域选中
      else if (index2 == 0 && areaSecond1[0].selected == false) {
        console.log(321)
        let areaSecond = this.data.areaSecond
        areaSecond[index1].map((item, index) => {
          if (index != 0) {
            item.selected = false
          } else {
            item.selected = true
          }
        })
        this.setData({
          areaSecond: areaSecond
        })
        return
      }
      //清空所有区域下选中状态
      e.currentTarget.dataset.type = "areaSecond"
      this.cacel(e)
      //保留用户所在区域的选中
      this.setData({
        ['areaSecond[' + index1 + ']']: areaSecond1
      })
      let areaLength = 0 //选中子区域数量为3
      areaSecond1.map(item => {
        if (item.selected == true) {
          areaLength++
        }
      })
      if (areaLength >= 3) {
        this.setData({
          [string]: false
        })
        return
      }
      //点击选中
      this.setData({
        [string]: selected,
        // areaSecond:areaSecond,
        ['areaSecond[0][0].selected']: false,
        ['areaSecond[' + index1 + '][0].selected']: false,
      })
      console.log(this.data.areaselected)
    },
    //选择面积条件
    areaSquareSelect(e) {
      console.log(e)
      let index = e.currentTarget.dataset.index;
      let areaSquare = this.data.areaSquare
      areaSquare[index].selected = !areaSquare[index].selected
      areaSquare.map((item, index1) => {
        if (index != index1) {
          item.selected = false
        }
      })
      console.log(areaSquare)
      // let string = 'areaSquare[' + index + '].selected'
      e.currentTarget.dataset.type = "areaSquareSelft"
      this.cacel(e)
      this.setData({
        // [string]: selected
        areaSquare: areaSquare
      })
    },
    //新增  totalPrice 选择总价
    totalPriceSelect(e) {
      console.log(e)
      let index = e.currentTarget.dataset.index;
      let totalPrice = this.data.totalPrice
      totalPrice[index].selected = !totalPrice[index].selected
      totalPrice.map((item, index1) => {
        if (index != index1) {
          item.selected = false
        }
      })

      // let string = 'areaSquare[' + index + '].selected'
      // e.currentTarget.dataset.type = "totalPrice"
      // this.cacel(e)  //清空 type 类型的选项
      this.setData({
        // [string]: selectede:e,
        e: e,
        totalPrice: totalPrice,
      })
    },
    //新增  houseType 选择户型
    houseTypeSelect(e) {
      console.log(e)
      let index = e.currentTarget.dataset.index;
      let houseType = this.data.houseType
      houseType[index].selected = !houseType[index].selected
      let list = houseType.filter(item => {
        return item.selected === true
      })
      if (list.length >= 6) {
        wx.showToast({
          title: '最多选择5种类型',
          icon: 'none',
          duration: 2500
        })
      } else {
        this.setData({
          e: e,
          houseType: houseType
        })
      }
      console.log(list.length)
    },
    areaSecondList(e) {
      console.log(e)
      let index = e.currentTarget.dataset.index;
      let areaSecondList = this.data.areaSecondList
      areaSecondList[index].selected = !areaSecondList[index].selected
      areaSecondList.map((item, index1) => {
        if (index != index1) {
          item.selected = false
        }
      })
      this.setData({
        e: e,
        areaSecondList: areaSecondList
      })
    },
    areaTypeList(e) {
      let index = e.currentTarget.dataset.index;
      let areaTypeList = this.data.areaTypeList
      areaTypeList[index].selected = !areaTypeList[index].selected
      areaTypeList.map((item, index1) => {
        if (index != index1) {
          item.selected = false
          item.routeStop.map((key)=>{
            key.selected = false;
            return key
          })
        }
      })
      this.setData({
        e: e,
        areaTypeList: areaTypeList,
        areaTypeList2: areaTypeList[index].selected ? areaTypeList[index].routeStop : [],
      })
    },
    areaTypeList2(e) {
      console.log(e)
      let index = e.currentTarget.dataset.index;
      let areaTypeList2 = this.data.areaTypeList2
      areaTypeList2[index].selected = !areaTypeList2[index].selected
      this.setData({
        e: e,
        itemType: areaTypeList2[index].selected,
        areaTypeList2: areaTypeList2
      })
    },
    salesSelect(e) {
      console.log(e)
      let index = e.currentTarget.dataset.index;
      let sales = this.data.sales
      sales[index].selected = !sales[index].selected
      sales.map((item, index1) => {
        if (index != index1) {
          item.selected = false
        }
      })
      this.setData({
        e: e,
        sales: sales
      })
    },
    roomageSelect(e) {
      console.log(e)
      let index = e.currentTarget.dataset.index;
      let roomage = this.data.roomage
      roomage[index].selected = !roomage[index].selected
      roomage.map((item, index1) => {
        if (index != index1) {
          item.selected = false
        }
      })
      this.setData({
        e: e,
        roomage: roomage
      })
    },
    rentSelect(e) {
      console.log(e)
      let index = e.currentTarget.dataset.index;
      let rent = this.data.rent
      rent[index].selected = !rent[index].selected
      rent.map((item, index1) => {
        if (index != index1) {
          item.selected = false
        }
      })
      this.setData({
        e: e,
        rent: rent
      })
    },
    //搜索框 双向绑定 防抖
    searchEdit: util.debounce(function (e) {
      var value = e.detail.value
      this.setData({
        search: value
      })
    }, 1000),
    //input上限
    limitTop(e) {
      console.log(e)
      var value = e.detail.value
      let type = e.target.dataset.type
      var string = type + '.top'
      if (this.data[type].bottom != "" && Number.parseInt(value) < Number.parseInt(this.data[type].bottom)) {
        console.log(value + ":" + this.data[type].bottom)
        value = this.data[type].bottom
      }
      console.log(string + value)
      if (e.target.dataset.type == "areaSquareSelft") {
        e.currentTarget.dataset.type = "areaSquare"
        this.cacel(e)
      } else if (e.target.dataset.type == "rentPrice") {
        e.currentTarget.dataset.type = "freeSecond"
        this.cacel(e)
      } else if (e.target.dataset.type == "transferFee") {
        e.currentTarget.dataset.type = "freeSecond"
        this.cacel(e)
      }
      this.setData({
        [string]: value
      })
      console.log(this.data.areaSquareSelft)
    },
    //input下限
    limitbottom(e) {
      var value = e.detail.value
      let type = e.target.dataset.type
      console.log(e)
      var string = type + '.bottom'
      if (this.data[type].top != "" && Number.parseInt(value) > Number.parseInt(this.data[type].top)) {
        console.log(value + ":" + this.data.areaSquareSelft.top)
        value = this.data[type].top
      }
      if (e.target.dataset.type == "areaSquareSelft") {
        e.currentTarget.dataset.type = "areaSquare"
        // this.cacel(e)
      } else if (e.target.dataset.type == "rentPrice") {
        e.currentTarget.dataset.type = "freeSecond"
        this.cacel(e)
      } else if (e.target.dataset.type == "transferFee") {
        e.currentTarget.dataset.type = "freeSecond"
        this.cacel(e)
      }
      this.setData({
        [string]: value
      })
    },
    //费用选中
    freeSelect(e) {
      let id = e.currentTarget.dataset.id;
      var index1 = id.split("-")[0]
      var index2 = id.split("-")[1]
      let freeSecond = this.data.freeSecond
      freeSecond[index1][index2].selected = !freeSecond[index1][index2].selected
      freeSecond[index1].map((item, index) => {
        if (index != index2) {
          item.selected = false
        }
      })
      e.currentTarget.dataset.type = "rentPrice"
      this.cacel(e)
      e.currentTarget.dataset.type = "transferFee"
      this.cacel(e)
      this.setData({
        freeSecond: freeSecond
      })
    },

    //筛选选中
    screenSelect(e) {
      console.log(this.data.screen)
      var index = e.currentTarget.dataset.id;
      var type = e.currentTarget.dataset.type
      // console.log(this.data.screen[type].list[])
      // return
      var selected = !this.data.screen[type].list[index].selected
      var string = 'screen.' + type + '.list[' + index + '].selected'
      this.setData({
        [string]: selected
      })
    },
    //删除selected某个元素
    deleteSelected(e) {
      console.log(e)
      var type = e.currentTarget.dataset.type
      var index = e.currentTarget.dataset.id
      console.log(type)
      switch (type) {
        case "streetType": //新增 删除区域选项
          var index = e.currentTarget.dataset.id
          var selected = false
          var string = 'areaSecondList[' + index + '].selected'
          console.log(this.data.areaSecondList, index)
          this.setData({
            [string]: selected
          })
          break;
        case "subwayType": //新增 删除区域选项
          var index = e.currentTarget.dataset.id
          var selected = false
          var string = 'areaTypeList[' + index + '].selected'
          console.log(this.data.areaTypeList, index)
          this.setData({
            [string]: selected
          })
          break;
        case "routeStopType": //新增 删除区域选项
          var index = e.currentTarget.dataset.id
          var selected = false
          var string = 'areaTypeList2[' + index + '].selected'
          console.log(this.data.areaTypeList2, index)
          this.setData({
            [string]: selected
          })
          break;
        case "totalPrice": //新增 删除总价选项
          var index = e.currentTarget.dataset.id
          var selected = false
          var string = 'totalPrice[' + index + '].selected'
          console.log(this.data.totalPrice, index)
          this.setData({
            [string]: selected
          })
          break;
        case "houseType": //新增 删除户型选项
          var index = e.currentTarget.dataset.id
          var selected = false
          var string = 'houseType[' + index + '].selected'
          console.log(this.data.areaselected)
          this.setData({
            [string]: selected
          })
          this.triggerEvent('myEvent', this.data.areaselected)
          break;
        case "salesType": //新增 删除销售状态选项
          var index = e.currentTarget.dataset.id
          var selected = false
          var string = 'sales[' + index + '].selected'
          console.log(string)
          this.setData({
            [string]: selected
          })
          break;
        case "roomageType": //新增 删除楼龄选项
          var index = e.currentTarget.dataset.id
          var selected = false
          var string = 'roomage[' + index + '].selected'
          console.log(string)
          this.setData({
            [string]: selected
          })
          break;
        case "rentType": //新增 删除出租选项
          var index = e.currentTarget.dataset.id
          var selected = false
          var string = 'rent[' + index + '].selected'
          console.log(string)
          this.setData({
            [string]: selected
          })
          break;
        case "areaSecond":
          console.log(type)
          var id = e.currentTarget.dataset.id
          var index1 = id.split("-")[0]
          var index2 = id.split("-")[1]
          var string = 'areaSecond[' + index1 + '][' + index2 + '].selected'
          if (type == "areaSecond") {
            this.setData({
              [string]: false
            })
          }
          break;
        case "areaSquare":
          let index = e.currentTarget.dataset.id;
          var selected = false
          var string = 'areaSquare[' + index + '].selected'
          this.setData({
            [string]: selected
          })
          break;
        case "areaSquareSelft":
          let areaSquareSelft = this.data.areaSquareSelft
          areaSquareSelft.top = ""
          areaSquareSelft.bottom = ""
          this.setData({
            areaSquareSelft: areaSquareSelft
          })
          break;
        case "totalPriceSelft":
          let totalPriceSelft = this.data.totalPriceSelft
          totalPriceSelft.top = ""
          totalPriceSelft.bottom = ""
          this.setData({
            totalPriceSelft: totalPriceSelft
          })
          break;
        case "freeSecond":
          var id = e.currentTarget.dataset.id
          var index1 = id.split("-")[0]
          var index2 = id.split("-")[1]
          var string = 'freeSecond[' + index1 + '][' + index2 + '].selected'
          if (type == "freeSecond") {
            this.setData({
              [string]: false
            })
          }
          break;
        case "transferFee":
          this.setData({
            transferFee: {
              top: "",
              bottom: ""
            }
          })
          break;
        case "rentPrice":
          this.setData({
            rentPrice: {
              top: "",
              bottom: ""
            }
          })
          break;
        default:
          var type = e.currentTarget.dataset.type
          var index = e.currentTarget.dataset.id
          console.log(index, type)
          var string = 'screen.' + type + '.list[' + index + '].selected'
          this.setData({
            [string]: false,
          })
      }
      console.log(599)
      this.triggerEvent('options', this.data.areaselected) //options名称事件，父组件中使用
    },
    //清空selected
    deleteAll(e) {
      this.cacel(e)
      this.triggerEvent('myEvent', {})
    },
    aa() {
      console.log(123)
    }
  },
  //计算属性
  computed: {
    //统计选中条件
    areaselected(data) {
      var list = [];
      var itemValue = '';
      //统计区域
      for (let key in data.areaSecond) {
        if (key == 0 && data.areaSecond[key][0].selected == true) { //选择全部区域
          let item = {}
          item.value = "不限"
          item.type = "areaSecond"
          item.id = "0-0"
          list.push(item)
        } else {
          data.areaSecond[key].map((item, index) => {
            if (index != 0 && item.selected == true) { //选择区域所有子区域
              item.type = "areaSecond"
              item.id = key + "-" + index
              list.push(item)
            } else if (item.selected == true) {
              let item2 = {}
              item2.type = "areaSecond"
              item2.mainAreaName = item.mainAreaName
              item2.areaId = item.areaId
              item2.value = item.mainAreaName + item.value
              item2.id = key + "-" + index
              list.push(item2)
            }
          })
        }
      }

      //新增 统计区域
      data.areaSecondList.map((item, index) => {
        if (item.selected) {
          list.push({
            id: index,
            ids: item.id,
            value: item.cityName,
            type: item.type,
            parentId: item.parentId
          })
        }
      })

      //新增 统计地铁 
      data.areaTypeList.map((item, index) => {
        if (item.selected) {
          if (data.itemType) {
            itemValue = item
            console.log('选择地铁名后会打印到')
          } else {
            list.push({
              id: index,
              ids: item.id,
              value: item.value,
              type: item.type,
              lineName: item.value,
            })
          }
        }
      })
      data.areaTypeList2.map((item, index) => {
        if (item.selected) {
          list.push({
            id: index,
            ids: item.id,
            value: itemValue.value + '/' + item.value,
            type: item.type,
            lineName: itemValue.value,
            routeStop: item.value
          })
        }
      })

      //统计面积
      for (let key in data.areaSquare) {
        if (data.areaSquare[key].selected == true) {
          if (data.areaSquare[0].selected == true) {
            let item = JSON.parse(JSON.stringify(data.areaSquare[0]))
            item.value = "面积不限"
            list.push(item)
          } else {
            list.push(data.areaSquare[key])
          }
        }
      }
      if (data.areaSquareSelft.top != "" || data.areaSquareSelft.bottom != "") {
        var value;
        if (data.areaSquareSelft.top && data.areaSquareSelft.bottom == "") {
          value = data.areaSquareSelft.top + "m²以下"
        } else if (data.areaSquareSelft.top == "" && data.areaSquareSelft.bottom) {
          value = data.areaSquareSelft.bottom + "m²以上"
        } else {
          value = data.areaSquareSelft.bottom + "-" + data.areaSquareSelft.top + "m²"
        }
        var item = {
          type: "areaSquareSelft",
          bottomAcreage: data.areaSquareSelft.bottom == "" ? 0 : data.areaSquareSelft.bottom,
          topAcreage: data.areaSquareSelft.top == "" ? 0 : data.areaSquareSelft.top,
          value: value,
        }
        list.push(item)
      }
      //统计费用
      for (let key in data.freeSecond) {
        let name = ""
        if (key == 0) {
          name = "月租金"
        } else {
          name = "转让费"
        }
        if (data.freeSecond[key][0].selected == true) {
          //序列化数据，由于computer内不能直接修改，需要深度克隆
          var item = JSON.parse(JSON.stringify(data.freeSecond[key][0]))
          console.log(item)
          item.value = data.freeFirst.list[key] + '不限'
          list.push(item)
        } else {
          data.freeSecond[key].map((item, index) => {
            if (item.selected == true) {
              list.push(item)
            }
          })
        }
      }
      //自定义租金
      if (data.rentPrice.top != "" || data.rentPrice.bottom != "") {
        var value;
        if (data.rentPrice.top && data.rentPrice.bottom == "") {
          value = "月租金" + data.rentPrice.top + "元以下"
        } else if (data.rentPrice.top == "" && data.rentPrice.bottom) {
          value = "月租金" + data.rentPrice.bottom + "元以上"
        } else {
          value = "月租金" + data.rentPrice.bottom + "-" + data.rentPrice.top + "元"
        }
        var item = {
          type: "rentPrice",
          bottomAcreage: data.rentPrice.bottom == "" ? 0 : data.rentPrice.bottom,
          topAcreage: data.rentPrice.top == "" ? 0 : data.rentPrice.top,
          value: value,
        }
        list.push(item)
      }
      //自定义转让费
      if (data.transferFee.top != "" || data.transferFee.bottom != "") {
        var value;
        if (data.transferFee.top && data.transferFee.bottom == "") {
          value = "转让费" + data.transferFee.top + "元以下"
        } else if (data.transferFee.top == "" && data.transferFee.bottom) {
          value = "转让费" + data.transferFee.bottom + "元以上"
        } else {
          value = "转让费" + data.transferFee.bottom + "-" + data.transferFee.top + "元"
        }
        var item = {
          type: "transferFee",
          bottomAcreage: data.transferFee.bottom == "" ? 0 : data.transferFee.bottom,
          topAcreage: data.transferFee.top == "" ? 0 : data.transferFee.top,
          value: value,
        }
        list.push(item)
      }
      //统计筛选
      for (let key in data.screen) {
        data.screen[key].list.map((item, index) => {
          if (item.selected == true) {
            item.id = index
            list.push(item)
          }
        })
      }
      //新增 统计总价筛选
      for (let key in data.totalPrice) {
        if (data.totalPrice[key].selected == true) {
          list.push(data.totalPrice[key])
        }
      }
      if (data.totalPriceSelft.top != "" || data.totalPriceSelft.bottom != "") {
        var value;
        if (data.totalPriceSelft.top && data.totalPriceSelft.bottom == "") {
          value = data.totalPriceSelft.top + "元以下"
        } else if (data.totalPriceSelft.top == "" && data.totalPriceSelft.bottom) {
          value = data.totalPriceSelft.bottom + "元以上"
        } else {
          value = data.totalPriceSelft.bottom + "-" + data.totalPriceSelft.top + "元"
        }
        var item = {
          type: "totalPriceSelft",
          bottomAcreage: data.totalPriceSelft.bottom == "" ? 0 : data.totalPriceSelft.bottom,
          topAcreage: data.totalPriceSelft.top == "" ? 0 : data.totalPriceSelft.top,
          value: value,
        }
        list.push(item)
      }

      //新增 统计户型筛选
      for (let key in data.houseType) {
        if (data.houseType[key].selected == true) {
          let item = JSON.parse(JSON.stringify(data.houseType[key]))
          item.id = item.id - 1
          list.push(item)
        }
      }

      //新增 统计销售状态筛选
      for (let key in data.sales) {
        if (data.sales[key].selected == true) {
          list.push(data.sales[key])
        }
      }

      //新增 统计楼龄筛选
      for (let key in data.roomage) {
        if (data.roomage[key].selected == true) {
          list.push(data.roomage[key])
        }
      }

      //新增 统计出租筛选
      for (let key in data.rent) {
        if (data.rent[key].selected == true) {
          list.push(data.rent[key])
        }
      }
      return list
    },

    //统计全部区域地方
    areaSecondAll(data) {
      let areaSecondAll = [];
      areaSecondAll.push(data.areaSecond[0][0])
      // for (let key in data.areaSecond) {
      //   if (key != 0) {
      //     data.areaSecond[key].map((item, index) => {
      //       if (index != 0) {
      //         item.id = key + "-" + index
      //         areaSecondAll.push(item)
      //       }
      //     })
      //   }
      // }
      // // console.log(areaSecondAll)
      return areaSecondAll
    }
  },
  watch: {
    mainArea: function () {
      //配置区域列表
      let areaFirst = {
        list: ["全部"],
        index: 0
      }
      //重新初始化，清空
      this.setData({
        areaFirst: areaFirst
      })
      this.data.mainArea.map(item => {
        areaFirst.list.push(item.name)
      })
      this.setData({
        areaFirst: areaFirst
      })
    },
    subArea: function () {
      let areaSecond = [
        [{
          selected: false,
          value: "不限"
        }]
      ]
      //重新初始化，清空
      this.setData({
        areaSecond: areaSecond,
      })
      this.data.subArea.map((item, index) => {
        let array = [{
          selected: false,
          value: "不限"
        }]
        item.map(item2 => {
          array[0].mainAreaName = item2.mainAreaName
          array[0].areaId = item2.parentId
          array.push({
            areaId: item2.areaId,
            mainAreaName: item2.mainAreaName,
            selected: false,
            value: item2.name
          })
        })
        areaSecond.push(array)
      })
      // console.log(areaSecond)
      this.setData({
        areaSecond: areaSecond
      })
    }
  },
  //监听器
  observers: {
    "search": function () { //监听搜索内容，发送请求
      // console.log()
      triggerEvent('search', this.data.search) //search名称事件，父组件中使用
    },
    "shadow": function (params) {
      // console.log(params)
      if (params == true) {
        this.setData({
          conditionType: -1
        })
      }
    },
    "conditionType": function (conditionType) {
      let areaContent = this.data.areaContent
      let areaSecondAll = [{
        selected: false,
        value: "不限"
      }]
    },
    city(val, newVal) {
      if (val) {
        this.setData({
          conditionType: -1
        })
      }
    },
    subwayList(val, newVal) {
      if (val) {
        this.setData({
          areaSecondList: val
        })
      }
    },
    areaList(val, newVal) {
      if (val) {
        this.setData({
          areaTypeList: val
        })
      }
    },
    type(val, newVal) {
      if (val) {
        this.setData({
          houseType: val
        })
      }
    },
    pricePrice(val, newVal) {
      console.log(val, 'pricePrice')
      this.setData({
        totalPrice: val
      })
    },
    tabTitle(val, newVal) {
      let Amount = this.data.Amount;
      if (val) {
        switch (val[1]) {
          case '单价':
            Amount.title = '单价区间(元/m²)';
            Amount.up = '最高价格(元/m²)';
            Amount.down = '最低价格(元/m²)';
            break
          case '总价':
            Amount.title = '总价(元)';
            Amount.up = '最高价格(万元)';
            Amount.down = '最低价格(万元)';
            break
          case '租金':
            Amount.title = '租金(元/月)';
            Amount.up = '最高价格(元/月)';
            Amount.down = '最低价格(元/月)';

            break
          case '单月均价':
            Amount.title = '均价(元/m²)';
            Amount.up = '最高价格(元/m²)';
            Amount.down = '最低价格(元/m²)';
            break
        }
        this.setData({
          Amount: Amount,
          conditionList: val,
        })
      }
    },
  },
  // 组件挂载之前执行
  attached: function () {

    var t = this
    triggerEvent = this.triggerEvent
    //获取配置列表数据，
    // wx.$http.get(wx.$Api.getAllAddressNeed).then(res => {
    //   wx.$allAddressNeed = res.data

    //   //配置面积列表
    //   let areaSquare = res.data.areaLabelList.map((item, index) => {
    //     return {
    //       id: (Number.parseInt(index)),
    //       value: item.typeName,
    //       bottomAcreage: item.bottomAcreage,
    //       bottomAcreage: item.bottomAcreage,
    //       topAcreage: item.topAcreage,
    //       selected: false,
    //       type: "areaSquare"
    //     }
    //   })
    //   //配置费用列表
    //   let freeSecond = [res.data.rentPriceLabelList.map((item, index) => {
    //     return {
    //       id: "0-" + (Number.parseInt(index)),
    //       value: item.typeName,
    //       bottomAcreage: item.bottomAcreage,
    //       topAcreage: item.topAcreage,
    //       selected: false,
    //       type: "freeSecond"
    //     }
    //   }), res.data.transferFeeList.map((item, index) => {
    //     // if(index != 0){
    //     return {
    //       id: "1-" + (Number.parseInt(index)),
    //       value: item.typeName,
    //       bottomTransferFee: item.bottomTransferFee,
    //       topTransferFee: item.topTransferFee,
    //       selected: false,
    //       type: "freeSecond"
    //     }
    //     // }
    //   })]
    //   // freeSecond[0].unshift({
    //   //   id: "0-0",
    //   //   value: '不限',
    //   //   selected: false,
    //   //   type: 'freeSecond'
    //   // })
    //   // freeSecond[1].unshift({id:"1-0",value:'不限',selected:false,type:'freeSecond'})
    //   // console.log(areaSquare)
    //   let screen = {
    //     shopSource: {
    //       title: "铺源类型",
    //       list: res.data.shopLabelList.map(item => {
    //         return {
    //           Id: item.id,
    //           value: item.labelName,
    //           selected: false,
    //           type: "shopSource",

    //         }
    //       })
    //     },
    //     supportFacility: {
    //       title: "配套设施",
    //       list: res.data.facilityList.map(item => {
    //         return {
    //           Id: item.facilityId,
    //           value: item.facilityName,
    //           selected: false,
    //           type: "supportFacility"
    //         }
    //       })
    //     },
    //     propertyType: {
    //       title: "物业类型",
    //       list: res.data.propertyLabelList.map(item => {
    //         return {
    //           Id: item.type,
    //           value: item.typeName,
    //           selected: false,
    //           type: "propertyType"
    //         }
    //       })
    //     },
    //     operation: {
    //       title: "适合经营",
    //       list: res.data.tradeList.map(item => {
    //         return {
    //           Id: item.tradeId,
    //           value: item.tradeName,
    //           selected: false,
    //           type: "operation"
    //         }
    //       })
    //     }
    //   }
    //   this.setData({
    //     screen: screen,
    //     freeSecond: freeSecond,
    //     areaSquare: areaSquare
    //   })
    // })
  },
})