const chooseLocation = requirePlugin('chooseLocation');
const {key,referer} = require('../../utils/util');
let {http} = require('../../request/http');
var app = getApp();
Component({
    properties: {},
    data: {
        showPane: true,
        title: '',
        type: '',
        actions: [],
        show:false,
        houseType:[],
        labelType:[],
        zxCase:'',
        zxType: [{name:'毛坯',name:'简装',name:'中装',name:'精装',name:'豪装'}],
        currentDate: '',
        minDate:'',
        showTimePick:false,
        buildingArea: '',
        floorStatus:'',
        address:'',
        area:'',
        subway:[],
        latitude: '',
        longitude: '',
        indoorType:'',
        room:'',
        kitchen:'',
        wei:'',
        buildingTime:'',
        elevator:'',
        orient:'',
        monthPrice:'',
        payWay:'',
        buildingConfig:'',
        isShow:false,
        showlabel:false,
        districtTitle:'',
        districtId:'',
        showTextArea:false,
        autofocus:false,
        makerDesc:'',
        city: '',
        province: '',
        region: '',
        zxArray: [
            {name:'毛坯',value:'ROUGHCAST'},
            {name:'简装',value:'PAPERBACK'},
            {name:'中装',value: 'CHINESE_DRESS'},
            {name:'精装',value: 'HARDCOVER'},
            {name:'豪装',value: 'HAUTE_COUTURE'}],
        videoUrl: '',
        rentType: '',
        orientArray:[
            {name:'北',value:'NORTH'},{name:'南',value:'SOUTH'},{name:'西',value:'WEST'},{name:'东',value:'EAST'},{name:'西北',value:'NORTHWEST'},{name:'东北',value:'NORTHEAST'},
            {name:'西南',value:'SOUTHWEST'},{name:'东南',value:'SOUTHEAST'},{name:'东西南',value:'EAST_WEST_SOUTH'},{name:'东南北',value:'SOUTHEAST_NORTH'},{name:'西南北',value:'SOUTHWEST_NORTH'},
            {name:'东西北',value:'EAST_WEST_NORTH'}, {name:'东南西北',value:'SOUTHEAST_NORTHWEST'}
        ],
        name:'',
        imgs: [],
    },
    timeFlag: 1,
    rentTypeVal: '',
    orientValue:'',
    methods: {
        getImgs(e){
            this.data.imgs = (e.detail.e).map(v=>v.url);
        },
        confirm(e){
            let time = new Date(e.detail);
            let year = time.getFullYear();
            this.setData({
                buildingTime: year,
                showTimePick: false
            })
        },
        getVideoUrl(e){
            console.log(e)
            if(e.detail.e === ''|| !e.detail.e){
                return
            }
            this.setData({
                videoUrl: e.detail.e
            });
        },
        cancel(){
            this.setData({
                showTimePick: false
            })
        },
        addHouse(){
            console.log(this.data.name)
            if(this.data.name===''){
                wx.showToast({
                    title: '请输入房源标题!',
                    duration: 1000,
                    icon:"none"
                });
            }else if(this.data.districtTitle === ''){
                wx.showToast({
                    title: '请选择所属小区!',
                    duration: 1000,
                    icon:"none"
                });
            }else if(this.data.labelType.length === 0){
                wx.showToast({
                    title: '请选择房源标签!',
                    duration: 1000,
                    icon:"none"
                });
            }else if(this.data.monthPrice === ''){
                wx.showToast({
                    title: '请输入月租!',
                    duration: 1000,
                    icon:"none"
                });
            }else if(this.data.rentType === ''){
                wx.showToast({
                    title: '请选择出租方式!',
                    duration: 1000,
                    icon:"none"
                });
            }else if(this.data.buildingArea === ''){
                wx.showToast({
                    title: '请输入建筑面积!',
                    duration: 1000,
                    icon:"none"
                });
            }else if(this.data.indoorTypeInput === ''){
                wx.showToast({
                    title: '请输入户型室!',
                    duration: 1000,
                    icon:"none"
                });
            }else if(this.data.address === '' || this.data.area===''){
                wx.showToast({
                    title: '请选择地址与所在区域!',
                    duration: 1000,
                    icon:"none"
                });
            }else if(this.data.imgs.length===0){
                wx.showToast({
                    title: '请上传至少一张效果图!',
                    duration: 1000,
                    icon:"none"
                });
            }else{
                wx.showLoading({
                    title: '加载中'
                });
                http({
                    url: '/api/access/v1/house/tenancy/add',
                    method: 'POST',
                    params:{
                        "builtYear": Number(this.data.buildingTime),
                        "city": this.data.city,
                        "decorationStatus": this.data.zxCase,
                        "description": this.data.makerDesc,
                        "designSketch": this.data.imgs,
                        "detailsAddress": this.data.address,
                        "elevator": this.data.elevator,
                        "floorCondition": this.data.floorStatus,
                        "floorage": Number(this.data.buildingArea),
                        "houseDisposal": this.data.buildingConfig,
                        "houseHall": this.data.room,
                        "houseKitchen": this.data.kitchen,
                        "houseLabel": this.data.labelType,
                        "houseToilet": this.data.wei,
                        "houseType": this.data.indoorType,
                        "houseVideo": this.data.videoUrl,
                        "latitude": this.data.latitude,
                        "longitude": this.data.longitude,
                        "metro": this.data.subway,
                        "monthRent": this.data.monthPrice,
                        "payMethod": this.data.payWay,
                        "province": this.data.province,
                        "quartersId": this.data.districtId,
                        "region": this.data.region,
                        "rentType": this.rentTypeVal,
                        "street": this.data.address,
                        "title": this.data.name,
                        "orientation":this.orientValue
                    }
                }).then(res=>{
                    wx.hideLoading();
                    console.log(res)
                    this.setData({
                        showPane: false
                    });

                }).catch(err=>{
                    wx.hideLoading();
                    console.log(err)
                })
            }
        },
        goTextArea(){
            this.setData({
                showTextArea:true,
                autofocus:true
            })
        },
        looseBlur(e){
            let {value} = e.detail;
            this.setData({
                makerDesc:value,
                showTextArea:false
            });
        },
        goSelectDistrct(){
            wx.navigateTo({
                url: '/combination/pages/distrctSearch/index'
            })
        },
        closeLabel(e){
            console.log(e)
            if(e.detail.detail===""){
                this.setData({
                    showlabel:false
                });
            }else{
                let labelTypeArray = e.detail['detail'].map(v=>v.name);
                this.setData({
                    showlabel:false,
                    labelType: labelTypeArray
                });
            }
        },
        goLabelSheet(){
            this.setData({
                showlabel:true
            });
        },
        goSubWaySheet(){
            this.setData({
                isShow: true
            });
        },
        deleteSubWay(e){
            let {index} = e.currentTarget.dataset;
            let {subway} = this.data;
            subway.splice(index,1);
            this.setData({
                subway
            });
        },
        monthPriceInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    monthPrice: e.detail.value
                })
            },500);
        },
        payWayInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    payWay: e.detail.value
                })
            },500);
        },
        goPickTime(){
            this.setData({
                showTimePick: true
            })
        },
        elevatorInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    elevator: e.detail.value
                })
            },500);
        },
        floorStatusInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    floorStatus: e.detail.value
                })
            },500);
        },
        buildingAreaInput(e){
                this.setData({
                    buildingArea: e.detail.value
                })
        },
        buildingConfigInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    buildingConfig: e.detail.value
                })
            },500);
        },
        weiInput(e){
                this.setData({
                    wei: e.detail.value
                })
        },
        kitchenInput(e){
                this.setData({
                    kitchen: e.detail.value
                })
        },
        roomInput(e){
                this.setData({
                    room: e.detail.value
                })
        },
        indoorTypeInput(e){
                this.setData({
                    indoorType: e.detail.value
                })
        },
        goTimePick(e){
            console.log(e)
            this.setData({
                showTimePick:true
            });
        },
        confirm(e){
            let time = new Date(e.detail);
            let year = time.getFullYear();
            let month = time.getMonth();
            let date = time.getDate();
            console.log(year)
            this.setData({
                showTimePick: false,
                buildingTime: year
            })
        },
        cancel(){
            this.setData({
                showTimePick: false
            })
        },
        nameInput(e){
            console.log(e);
            clearTimeout(this.timeFlag);
            this.timeFlag=setTimeout(()=>{
                this.setData({
                    name: e.detail.value
                })
            },500);
        },
        deleteType(e){
            console.log(e.currentTarget.dataset.index)
            let {houseType} = this.data;
            houseType.splice(e.currentTarget.dataset.index,1);
            this.setData({
                houseType
            })
        },
        goSheet(e){
            let that = this;
            const {type} = e.currentTarget.dataset;
            console.log(type);
            switch (type) {
                case 'orientType':
                    this.setData({
                        type:type,
                        show: true,
                        title: '朝向选择',
                        actions: [
                            {name:'北',value:'NORTH'},{name:'南',value:'SOUTH'},{name:'西',value:'WEST'},{name:'东',value:'EAST'},{name:'西北',value:'NORTHWEST'},{name:'东北',value:'NORTHEAST'},
                            {name:'西南',value:'SOUTHWEST'},{name:'东南',value:'SOUTHEAST'},{name:'东西南',value:'EAST_WEST_SOUTH'},{name:'东南北',value:'SOUTHEAST_NORTH'},{name:'西南北',value:'SOUTHWEST_NORTH'},
                            {name:'东西北',value:'EAST_WEST_NORTH'}, {name:'东南西北',value:'SOUTHEAST_NORTHWEST'}
                        ]
                    });
                    break;
                case 'houseInType':
                    this.setData({
                        type:type,
                        show: true,
                        title: '户型选择',
                        actions:[
                            {name:'一室'},{name:'两室'},{name:'三室'},{name:'四室'},{name:'五室'},{name:'五室以上'}
                        ]
                    });
                    break;
                case 'labelType':
                    const {labelType} = this.data;
                    this.setData({
                        type:type,
                        show: true,
                        title: '房源标签',
                        actions:labelType
                    });
                    break;
                case 'rantType':
                    this.setData({
                        type:type,
                        show: true,
                        title: '出租方式选择',
                        actions:[
                            {name:'整租',value:'WHOLE_RENT'},{name:'合租',value:'COTENANCY'}
                        ]
                    });
                    break;
                case 'zxCase' :
                    this.setData({
                        type:type,
                        show: true,
                        title: '装修状况',
                        actions: [
                            {name:'毛坯',value:'ROUGHCAST'},
                            {name:'简装',value:'PAPERBACK'},
                            {name:'中装',value: 'CHINESE_DRESS'},
                            {name:'精装',value: 'HARDCOVER'},
                            {name:'豪装',value: 'HAUTE_COUTURE'}],
                    });
                    break;
                default:
                    break;
            }
        },
        deleteLabel(e){
            console.log(e.currentTarget.dataset.index)
            let {labelType} = this.data;
            labelType.splice(e.currentTarget.dataset.index,1);
            this.setData({
                labelType
            });
        },
        onClose(e){
            console.log(e)
            var that = this;
            const {type} = e.detail;
            if(e.detail.detail===''||e.detail.detail===null||!e.detail.detail){
                this.setData({
                    show:false
                });
                return;
            }
            switch (type) {
                case 'zxCase':
                    let zxItem = this.data.zxArray.filter(v=>v.name === e.detail.detail);
                    that.decorationStatus = zxItem[0]['value'];
                    that.setData({
                        zxCase: e.detail.detail,
                        show:false
                    });
                    break;
                case 'rantType':
                if(e.detail.detail==='整租'){
                    that.rentTypeVal = 'WHOLE_RENT';
                }else{
                    that.rentTypeVal = 'COTENANCY';
                }
                    that.setData({
                        rentType: e.detail.detail,
                        show:false
                    });
                    break;
                case 'orientType':
                    let newArray = that.data.orientArray.filter(v=>v.name===e.detail.detail);
                    that.orientValue = newArray[0]['value'];
                    this.setData({
                        orient: e.detail.detail,
                        show:false
                    });
                    break;
                default:
                    break;
            }

        },
        close(e){
            console.log(e);
            if(e.detail.detail.length === 0){
                this.setData({
                    isShow:false
                });
            }else{
                let {subway} = this.data;
                let newArr = subway.concat(e.detail.detail);
                let newArray = [];
                let obj = {};
                for (let i = 0; i < newArr.length; i++) {
                    if (!obj[newArr[i].routeStop]) {
                        newArray.push(newArr[i]);
                        obj[newArr[i].routeStop] = true;
                    }
                }
                console.log(newArray);
                this.setData({
                    subway : newArray,
                    isShow: false
                });
            }
        },
        goPickAddress(){
            let {latitude,longitude} = this.data;
            const location = JSON.stringify({
                latitude: latitude,
                longitude: longitude
            });
            wx.navigateTo({
                url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location
            });
        }
    },
    lifetimes:{
        ready() {
            let min_time = new Date("1900-01-01 00:00:00").getTime();
            let currentDate = new Date().getTime();
            this.setData({
                currentDate:currentDate,
                minDate : min_time
            });
            wx.getLocation({
                type: 'wgs84',
                success: (res) => {
                    console.log(res);
                    let latitude = res.latitude;
                    let longitude = res.longitude;
                    this.setData({ latitude: latitude, longitude: longitude })
                }
            });
            app.globalData.districtTitle = '';
        }
    },
    pageLifetimes:{
        show() {
            let  {districtTitle,districtId} = app.globalData;
            this.setData({
                districtTitle,
                districtId
            });
            const location = chooseLocation.getLocation();
            console.log(location);
            if(location===null){

            }else{
                let { address, city, district, latitude, longitude, name, province } = location;
                this.setData({
                    address: name,
                    area: address,
                    city:city,
                    region: district,
                    latitude: latitude,
                    longitude: longitude,
                    province: province
                })
            }
        }
    }
});
