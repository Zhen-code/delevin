const chooseLocation = requirePlugin('chooseLocation');
const {key,referer} = require('../../utils/util');
const {request} = require('../../request/request');
const {http} = require('../../request/http');
Component({
    properties: {

    },
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
        autofocus:false,
        videoUrl: ''
    },
    timeFlag: 1,
    propertyTypeArray:[],
    constructClassify: [],
    constructClassifyId: '',
    imgs: [],
    houseType: [],
    propertyClassifyId: '',
    methods: {
        getVideoUrl(e){
            console.log(e)
            if(e.detail.e === ''|| !e.detail.e){
                return
            }
            this.setData({
                videoUrl: e.detail.e
            });
        },
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
            if(e.detail.detail.length===0 || e.detail.detail===''){
                this.setData({
                    showIndoor:false
                })
            }else{
                this.houseType = e.detail.detail.map(v=>v.id);
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
            console.log(e);
            if(e.detail['detail'].length===0){
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
        goSubWaySheet(){
            let { city,province} = this.data;
            if(city===''&&province===''){
                wx.showToast({
                    title: '请选择地址',
                    icon: "none"
                });
                // return
            }
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
            let that = this;
            switch (type) {
                case 'propertyType':
                    this.setData({
                        type:type,
                        show: true,
                        title: '物业类别',
                        actions: that.propertyTypeArray
                    });
                    break;
                case 'buildingType' :
                    this.setData({
                        type:type,
                        show: true,
                        title: '建筑类型',
                        actions: that.constructClassify
                    });
                    break;
                default:
                    break;
            }
        },
        onClose(e){
            let that = this;
            console.log(e)
            const {type} = e.detail;
            if(e.detail.detail===''||e.detail.detail===null||!e.detail.detail||(e.detail.detail).length===0){
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
                        that.setData({
                            houseType:houseType,
                            show:false
                        });
                    }
                    that.setData({
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
                    that.setData({
                        show:false
                    });
                    break;
                case 'propertyType':
                    let propertyTypeArr = that.propertyTypeArray.filter(v=>v.name === e.detail.detail);
                    that.propertyClassifyId = propertyTypeArr[0]['id'];
                    that.setData({
                        show:false,
                        propertyType:e.detail.detail
                    });
                    break;
                case 'buildingType':
                    let buildingType = that.constructClassify.filter(v=>v.name === e.detail.detail);
                    that.constructClassifyId = buildingType[0]['id'];
                        that.setData({
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
        getImgs(e){
            this.imgs = (e.detail.e).map(v=>v.url);
        },
        developersInput(e){
          clearTimeout(this.timeFlag);
          this.timeFlag = setTimeout(()=>{
              this.setData({
                  developers: e.detail.value
              })
          },2000);
        },
        greenRateInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    greenRate: e.detail.value
                })
            },2000);
        },
        parkInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    park: e.detail.value
                })
            },2000);
        },
        capacityInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    capacity: e.detail.value
                })
            },2000);
        },
        cqYearInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    cqYear: e.detail.value
                })
            },2000);
        },
        propertyCompanyInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    propertyCompany: e.detail.value
                })
            },2000);
        },
        propertyFareInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    propertyFare: e.detail.value
                })
            },2000);
        },
        addXQ(){
            http({
                url: '/api/access/v1/house/residential/quarters/add',
                method: 'POST',
                params: {
                    "averagePrice": this.apsh,
                    "builtYear": this.buildingTime,
                    "city": this.city,
                    "constructClassifyId": this.constructClassifyId,
                    "description": this.data.makerDesc,
                    "designSketch": this.imgs,
                    "detailsAddress": this.data.address,
                    "developers": this.data.developers,
                    "greenCoverage": this.data.greenRate,
                    "houseLabel": this.data.labelType,
                    "houseType":  this.houseType,
                    "houseVideo": this.data.videoUrl,
                    "latitude": this.latitude,
                    "longitude": this.longitude,
                    "metro": this.data.subway,
                    "parkingSpace": this.data.park,
                    "plotRatio": this.data.capacity,
                    "property": this.data.cqYear,
                    "propertyClassifyId": this.propertyClassifyId,
                    "propertyCompany": this.data.propertyCompany,
                    "propertyFee": this.data.propertyFare,
                    "province": this.data.province,
                    "region": this.data.district,
                    "rentalAveragePrice": this.data.arp,
                    "street": this.data.area,
                    "title": this.data.title
                }
            }).then(res=>{
                console.log(res)
                if(res.data['code'] === 500){
                    wx.showToast({
                        title: res.data['msg']
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    lifetimes:{

        created() {
            let that = this;
            request.getHouseProperty().then(res=>{
                that.propertyTypeArray = res.map(v=>{
                    return {
                        name: v.name,
                        id: v.id
                    }
                })
            });
            request.getConstructClassify().then(res=>{
                that.constructClassify = res.map(v=>{
                    return{
                        name: v.name,
                        id: v.id
                    }
                });
            });
            },
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
