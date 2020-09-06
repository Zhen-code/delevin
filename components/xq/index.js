const chooseLocation = requirePlugin('chooseLocation');
Component({
    properties: {},
    data: {
        name: '',
        houseType:[],
        actions:[],
        apsh: '',
        show: false,
        type: '',
        title: '',
        arp: '',
        labelType:[{name:'有房'},{name:'没房'}],
        propertyType:[{name:'物业类'}],
        buildingType:[{name:'顶层建筑'}],
        buildingTime:'',
        currentDate:  '',
        showTimePick: false,
        minDate: '',
        cqYear: '',
        developers: '',
        capacity: '',
        greenRate: '',
        park: '',
        propertyCompany:'',
        propertyFare: '',
        address:'',
        latitude: '',
        longitude: ''
    },
    timeFlag: 1,

    methods: {
        confirm(e){
            let time = new Date(e.detail);
            let year = time.getFullYear();
            this.setData({
                buildingTime: year,
                showTimePick: false
            })
        },
        cancel(){
            this.setData({
                showTimePick: false
            })
        },
        goPickTime(){
          this.setData({
              showTimePick: true
          })
        },
        goPickAddress(){
            const key = 'YGYBZ-XGBWW-WEERF-R7V27-PJIIK-O6BWA';
            const referer = 'delevin-mini-program'; //调用插件的app的名称
            const location = JSON.stringify({
                latitude: this.data.latitude,
                longitude: this.data.longitude
            });
            wx.navigateTo({
                url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location
            });
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
        houseTypeInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag=setTimeout(()=>{
                this.setData({
                    houseType: e.detail.value
                })
            },2000);
        },
        apshInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag=setTimeout(()=>{
                this.setData({
                    apsh: e.detail.value
                })
            },2000);
        },
        arpInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag=setTimeout(()=>{
                this.setData({
                    arp: e.detail.value
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
        deleteLabel(e){
            console.log(e.currentTarget.dataset.index)
            let {labelType} = this.data;
            labelType.splice(e.currentTarget.dataset.index,1);
            this.setData({
                labelType
            });
        },
        deleteProperty(e){

        },
        deleteBuilding(e){

        },
        goSheet(e){
            const {type} = e.currentTarget.dataset;
            console.log(type);
            switch (type) {
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
                case 'propertyType':
                    const {propertyType} = this.data;
                    this.setData({
                        type:type,
                        show: true,
                        title: '物业类别',
                        actions:propertyType
                    });
                    break;
                case 'buildingType' :
                    const {buildingType} = this.data;
                    this.setData({
                        type:type,
                        show: true,
                        title: '建筑类型',
                        actions: buildingType
                    });
                    break;
                default:
                    break;
            }
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
                    let {labelType} = this.data;
                    let index1 = labelType.findIndex(item=>item.name==e.detail.detail);
                    if(index1==undefined||index1===-1){
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
                default:
                    break;
            }
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
            })
        },
    },
    pageLifetimes:{
        show() {
            const location = chooseLocation.getLocation();
            console.log(location);
            if(location===null){

            }else{
                let { address, city, district, latitude, longitude, name, province } = location;
                this.setData({
                    address
                })
            }
        }
    }
});
