const chooseLocation = requirePlugin('chooseLocation');
const {key,referer,min_time,currentDate,getTime} = require('../../utils/util');
Component({
    properties: {},
    data: {
        title: '',
        type: '',
        actions: [],
        show:false,
        name: '',
        houseType:[],
        price: '',
        labelType:[],
        project: '',
        newHouseHelp:'',
        propertyType:'',
        buildingType:'',
        cqYear: '',
        zxCase:'',
        zxType: [{name:'毛坯',name:'简装',name:'中装',name:'精装',name:'豪装'}],
        lineSite: '',
        xsCase:'',
        currentDate: '',
        minDate:'',
        startTime:'',
        showTimePick:false,
        endTime: '',
        developers: '',
        salesAddress:'',
        telphone: '',
        ocupyArea: '',
        buildingArea: '',
        greenRate: '',
        park:'',
        parkRate:'',
        planCount: '',
        floorStatus:'',
        totalFloor: '',
        propertyCompany:'',
        propertyFare:'',
        address:'',
        area:'',
        subway:[],
        latitude: '',
        longitude: '',
        isShow: false,
        showlabel:false,
        showIndoor:false,
        showTextArea:false,
        autofocus:false,
        makerDesc:'',
        minDate:'',
        showSE:1,
        city:''
    },
    timeFlag: 1,
    lifetimes:{
      ready() {
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
      }
    },
    methods: {
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
        goIndoorSheet(){
            this.setData({
                showIndoor:true
            })
        },
        closeIndoor(e){
            if(e.detail.detail===""){
                this.setData({
                    showIndoor:false
                })
            }else{
                this.setData({
                    houseType: e.detail.detail,
                    showIndoor:false
                })
            }
        },
        closeLabel(e){
            if(e.detail.detail===""){
                this.setData({
                    showlabel:false
                });
            }else{
                this.setData({
                    showlabel:false,
                    labelType: e.detail.detail
                });
            }
        },
        goLabelSheet(){
            this.setData({
                showlabel:true
            });
        },
        deleteLabel(e){
            console.log(e.currentTarget.dataset.index)
            let {labelType} = this.data;
            labelType.splice(e.currentTarget.dataset.index,1);
            this.setData({
                labelType
            });
        },
        goTimePick(e){
            let {type} = e.currentTarget.dataset;
            if(type==="endTime"){
                this.setData({
                    showTimePick:true,
                    showSE:2
                });
            }else if(type==="startTime"){
                this.setData({
                    showTimePick:true,
                    showSE:1
                });
            }
        },
        confirm(e){
            let chooseTime = getTime(e.detail);
            let { showSE } = this.data;
            if(showSE===1){
                this.setData({
                    startTime: chooseTime,
                    showTimePick: false
                })
            }else{
                this.setData({
                    endTime: chooseTime,
                    showTimePick: false
                })
            }
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
            },2000);
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
            const {type} = e.currentTarget.dataset;
            console.log(type);
            switch (type) {
                case 'labelType':
                    const {labelType} = this.data;
                    this.setData({
                        type:type,
                        show: true,
                        title: '房源标签',
                        actions:labelType
                    });
                    break;
                case 'propertyType':
                    // const {propertyType} = this.data;
                    this.setData({
                        type:type,
                        show: true,
                        title: '物业类别',
                        actions:[{name:'快递类物业'}]
                    });
                    break;
                case 'buildingType' :
                    this.setData({
                        type:type,
                        show: true,
                        title: '建筑类型',
                        actions: [{name:'顶层建筑'}]
                    });
                    break;
                case 'zxCase' :
                    this.setData({
                        type:type,
                        show: true,
                        title: '建筑类型',
                        actions: [{name:'毛坯'},{name:'简装'},{name:'中装'},{name:'精装'},{name:'豪装'}]
                    });
                    break;
                case 'xsCase':
                    this.setData({
                        type:type,
                        show: true,
                        title: '销售状态',
                        actions: [{name:'在售'},{name:'待售'}]
                    });
                    break;
                default:
                    break;
            }
        },
        priceInput(e){

        },
        projectInput(e){
            console.log(e)
        },
        newHouseHelpInput(e){

        },
        deleteProperty(e){

        },
        deleteBuilding(e){

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
            const {type} = e.detail;
            if(e.detail.detail===''||e.detail.detail===null||!e.detail.detail){
                this.setData({
                    show:false
                });
                return;
            }
            switch (type) {
                case 'houseInType' :
                    let {houseType} = this.data;
                    let index = houseType.findIndex(item=>item.name==e.detail.detail);
                    if(index==undefined||index===-1){
                        houseType.push({name:e.detail.detail});
                        this.setData({
                            houseType:houseType,
                            show:false
                        });
                    }
                    this.setData({
                        show:false
                    });
                    break;
                case 'labelType':
                    let {propertyType} = this.data;
                    let index2 = labelType.findIndex(item=>item.name==e.detail.detail);
                    if(index2==undefined||index2===-1){
                        propertyType.push({name:e.detail.detail});
                        this.setData({
                            propertyType:propertyType,
                            show:false
                        });
                    }
                    this.setData({
                        show:false
                    });
                    break;
                case 'propertyType':
                    this.setData({
                        show:false,
                        propertyType:e.detail.detail
                    });
                    break;
                case 'buildingType':
                    this.setData({
                        buildingType: e.detail.detail,
                        show:false
                    });
                    break;
                case 'zxCase':
                    this.setData({
                        zxCase: e.detail.detail
                    });
                    break;
                default:
                    break;
            }
        },
        close(e){
            console.log(e);
            if(e.detail.detail===""||!e.detail.detail){
                this.setData({
                    isShow:false
                });
            }else{
                let {subway} = this.data;
                let newArr = Array.from(new Set([...subway,...(e.detail.detail)]))
                this.setData({
                    subway : newArr,
                    isShow: false
                });
            }
        },
        goSubWaySheet(){
            this.setData({
                isShow: true
            });
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
        },
        deleteSubWay(e){
            let {index} = e.currentTarget.dataset;
            let {subway} = this.data;
            subway.splice(index,1);
            this.setData({
                subway
            });
        }
    },
    pageLifetimes:{
        show() {
            const location = chooseLocation.getLocation();
            console.log(location);
            if(location===null){

            }else{
                let { address, city, district, latitude, longitude, name, province } = location;
                this.setData({
                    address: name,
                    area: address,
                    city: city
                })
            }
        }
    }
});
