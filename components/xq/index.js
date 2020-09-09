const chooseLocation = requirePlugin('chooseLocation');
const {key,referer} = require('../../utils/util');
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
        labelType:[],
        propertyType:'',
        buildingType:'',
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
        longitude: '',
        area: '',
        subway: [],
        makerDesc:'',
        city: '',
        district: '',
        province:'',
        isShow: false,
        showlabel:false,
        showIndoor:false,
        showTextArea:false,
        autofocus:false
    },
    timeFlag: 1,

    methods: {
        looseBlur(e){
            let {value} = e.detail;
                this.setData({
                    makerDesc:value,
                    showTextArea:false
                });
        },
        goTextArea(){
          this.setData({
              showTextArea:true,
              autofocus:true
          })
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
        goLabelSheet(){
            this.setData({
                showlabel:true
            });
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
            let {latitude,longitude} = this.data;
            const location = JSON.stringify({
                latitude: latitude,
                longitude: longitude
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
        goSheet(e){
            const {type} = e.currentTarget.dataset;
            console.log(type);
            switch (type) {
                case 'propertyType':
                    // const {propertyType} = this.data;
                    this.setData({
                        type:type,
                        show: true,
                        title: '物业类别',
                        actions:[{name:'物业类别'}]
                    });
                    break;
                case 'buildingType' :
                    // const {buildingType} = this.data;
                    this.setData({
                        type:type,
                        show: true,
                        title: '建筑类型',
                        actions: [{name:'建筑类型'}]
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
                    address:name,
                    area: address,
                    city: city,
                    district:district,
                    province: province
                })
            }
        }
    }
});
