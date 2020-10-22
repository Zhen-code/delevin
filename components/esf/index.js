const chooseLocation = requirePlugin('chooseLocation');
const {key,referer} = require('../../utils/util');
let {http} = require('../../request/http');
var app = getApp();
Component({
    properties: {},
    data: {
        buildingType: '',
        showPane:true,
        imgs: [],
        title: '',
        type: '',
        actions: [],
        show:false,
        name: '',
        houseType:[],
        totalPrice: '',
        labelType:[],
        cqYear: '',
        zxCase:'',
        zxArray: [
            {name:'毛坯',value:'ROUGHCAST'},
            {name:'简装',value:'PAPERBACK'},
            {name:'中装',value: 'CHINESE_DRESS'},
            {name:'精装',value: 'HARDCOVER'},
            {name:'豪装',value: 'HAUTE_COUTURE'}],
        orientArray:[
            {name:'北',value:'NORTH'},{name:'南',value:'SOUTH'},{name:'西',value:'WEST'},{name:'东',value:'EAST'},{name:'西北',value:'NORTHWEST'},{name:'东北',value:'NORTHEAST'},
            {name:'西南',value:'SOUTHWEST'},{name:'东南',value:'SOUTHEAST'},{name:'东西南',value:'EAST_WEST_SOUTH'},{name:'东南北',value:'SOUTHEAST_NORTH'},{name:'西南北',value:'SOUTHWEST_NORTH'},
            {name:'东西北',value:'EAST_WEST_NORTH'}, {name:'东南西北',value:'SOUTHEAST_NORTHWEST'}
        ],
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
        isShow:false,
        showlabel:false,
        districtTitle:'',
        showTextArea:false,
        autofocus:false,
        makerDesc:'',
        city:'',
        district:'',
        province:'',
        videoUrl:'',
        districtId:''
    },
    timeFlag: 1,
    decorationStatus: '',
    orientValue:'',
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
    methods: {
        buildingTypeInput(e){
            this.setData({
                buildingType: e.detail.value
            })
        },
        floorStatusInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    floorStatus: e.detail.value
                })
            },500);
        },
        elevatorInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    elevator: e.detail.value
                })
            },500);
        },
        getImgs(e){
            this.data.imgs = (e.detail.e).map(v=>v.url);
        },
        addHouse(){
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
            }else if(this.data.totalPrice === ''){
                wx.showToast({
                    title: '请输入总价',
                    duration: 1000,
                    icon:"none"
                });
            }else if(this.data.labelType.length === 0){
                wx.showToast({
                    title: '请选择房源标签!',
                    duration: 1000,
                    icon:"none"
                });
            }else if(this.data.indoorType === ''){
                wx.showToast({
                    title: '请输入户型室!',
                    duration: 1000,
                    icon:"none"
                });
            }else if(this.data.buildingArea === ''){
                wx.showToast({
                    title: '请输入建筑面积!',
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
                    url: '/api/access/v1/house/second/hand/add',
                    method: 'POST',
                    params:{
                        "buildingType": this.data.buildingType,
                        "builtYear": this.data.buildingTime,
                        "city": this.data.city,
                        "decorationStatus": this.decorationStatus,
                        "description": this.data.makerDesc,
                        "designSketch": this.data.imgs,
                        "detailsAddress": this.data.area,
                        "elevator": this.data.elevator,
                        "floorCondition": this.data.floorStatus,
                        "floorage": this.data.buildingArea,
                        "houseHall": this.data.room,
                        "houseKitchen": this.data.kitchen,
                        "houseLabel": this.data.labelType,
                        "houseToilet": this.data.wei,
                        "houseType":  this.data.indoorType,
                        "houseVideo": this.data.videoUrl,
                        "latitude": this.data.latitude,
                        "longitude": this.data.longitude,
                        "metro": this.data.subway,
                        "orientation": this.orientValue,
                        "property": this.data.cqYear,
                        "province": this.data.province,
                        "quartersId": this.data.districtId,
                        "region": this.data.district,
                        "street": this.data.address,
                        "title": this.data.name,
                        "totalPrice": this.data.totalPrice
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
        getVideoUrl(e){
            console.log(e)
            if(e.detail.e === ''|| !e.detail.e){
                return
            }
            this.setData({
                videoUrl: e.detail.e
            });
        },
        cqYearInput(e){
            this.setData({
                cqYear: e.detail.value
            })
        },
        kitchenInput(e){
            this.setData({
                kitchen: e.detail.value
            })
        },
        roomInput(e){
            console.log(e)
            this.setData({
                room: e.detail.value
            })
        },
        buildingAreaInput(e){
                this.setData({
                    buildingArea: e.detail.value
                })
        },
        weiInput(e){
            this.setData({
                wei: e.detail.value
            })
        },
        floorStatusInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    floorStatus: e.detail.value
                })
            },500);
        },
        elevatorInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    elevator: e.detail.value
                })
            },500);
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
            if(e.detail.detail===""||e.detail.length===0){
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
        goPickTime(){
            this.setData({
                showTimePick: true
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
            const {type} = e.currentTarget.dataset;
            console.log(type);
            let that = this;
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
                case 'zxCase' :
                    this.setData({
                        type:type,
                        show: true,
                        title: '装修状况',
                        actions: that.data.zxArray,
                    });
                    break;
                default:
                    break;
            }
        },
        totalPriceInput(e){
                this.setData({
                    totalPrice: e.detail.value
                })
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
                let that = this;
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
                        let {labelType} = this.data;
                        let index2 = labelType.findIndex(item=>item.name==e.detail.detail);
                        if(index2==undefined||index2===-1){
                            labelType.push({name:e.detail.detail});
                            this.setData({
                                labelType:labelType,
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
                    case 'orientType':
                        let newArray = that.data.orientArray.filter(v=>v.name===e.detail.detail);
                        that.orientValue = newArray[0]['value'];
                        that.setData({
                            orient: e.detail.detail,
                            show:false
                        });
                        break;
                    case 'zxCase':
                        let zxItem = that.data.zxArray.filter(v=>v.name === e.detail.detail);
                        that.decorationStatus = zxItem[0]['value'];
                        that.setData({
                            zxCase: e.detail.detail,
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
    pageLifetimes:{
        show() {
            let {districtTitle,districtId} = app.globalData;
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
                    city: city,
                    district,
                    latitude,
                    longitude,
                    province
                })
            }
        }
    }
});
