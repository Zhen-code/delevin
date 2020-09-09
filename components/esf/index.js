const chooseLocation = requirePlugin('chooseLocation');
const {key,referer} = require('../../utils/util');
var app = getApp();
Component({
    properties: {},
    data: {
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
        isShow:false,
        showlabel:false,
        districtTitle:'',
        showTextArea:false,
        autofocus:false,
        makerDesc:'',
        city:''
    },
    timeFlag: 1,
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
        weiInput(e){

        },
        kitchenInput(e){

        },
        roomInput(e){

        },
        indoorTypeInput(){

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
            let startTime = year+month+date;
            this.setData({
                showTimePick: false
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
                case 'orientType':
                    this.setData({
                        type:type,
                        show: true,
                        title: '朝向选择',
                        actions:[
                            {name:'北'},{name:'南'},{name:'西'},{name:'东'},{name:'西北'},{name:'东北'},
                            {name:'西南'},{name:'东南'},{name:'东西南'},{name:'东南北'},{name:'西南北'},
                            {name:'东西北'}, {name:'东南西北'}
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
                default:
                    break;
            }
        },
        totalPriceInput(e){

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
            let {districtTitle} = app.globalData;
            this.setData({
                districtTitle
            });
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
