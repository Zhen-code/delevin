const chooseLocation = requirePlugin('chooseLocation');
const {key,referer} = require('../../utils/util');
const {request} = require('../../request/request');
const {http} = request('../../request/http');
Component({
    properties: {
        test: {
            type: String
        }
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
                    console.log(e.detail.detail)
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
            if(e.detail.detail.length === 0 ||!e.detail.detail){
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
        addXQ(){
            // http({
            //     url: '/api/access/v1/house/residential/quarters/add',
            //     method: 'POST',
            //     params: {
            //         "averagePrice": this.apsh,
            //         "builtYear": this.buildingTime,
            //         "city": this.city,
            //         "constructClassifyId": this.constructClassifyId,
            //         "description": '',
            //         "designSketch": [
            //             "http://beiru.oss-cn-hangzhou.aliyuncs.com/admin-file/547db840-e288-4ded-97b7-31c630d2e7d0.jpg",
            //             "http://beiru.oss-cn-hangzhou.aliyuncs.com/admin-file/547db840-e288-4ded-97b7-31c630d2e7d0.jpg"
            //         ],
            //         "detailsAddress": "广州市番禺区钟村街道汉溪社区汉溪大道东290号",
            //         "developers": "李林",
            //         "greenCoverage": "69.3",
            //         "houseLabel": [
            //             "标签1",
            //             "标签2"
            //         ],
            //         "houseType": [
            //             "1",
            //             "2"
            //         ],
            //         "houseVideo": "https://aliyuncdn.beiru168.com/diana/eb07a841-f327-475b-a781-eb35b833f1f0.mp4",
            //         "latitude": 21.63534413,
            //         "longitude": 113.25456442,
            //         "metro": [
            //             {
            //                 "lineName": "3号线",
            //                 "routeStop": "汉溪长隆"
            //             },
            //             {
            //                 "lineName": "3号线",
            //                 "routeStop": "钟村"
            //             }
            //         ],
            //         "parkingSpace": "96.3",
            //         "plotRatio": "96.3",
            //         "property": 60,
            //         "propertyClassifyId": 1,
            //         "propertyCompany": "贝如科技",
            //         "propertyFee": "1000/月",
            //         "province": "广东省",
            //         "region": "番禺区",
            //         "rentalAveragePrice": 2010,
            //         "street": "钟村街道",
            //         "title": "碧桂园学区房一期开售，首付仅需15万"
            //     }
            // }).then(res=>{
            //     console.log(res)
            // }).catch(err=>{
            //     console.log(err)
            // })

        }
    },
    lifetimes:{

        created() {
            console.log(request)
            let that = this;
            request.getHouseProperty().then(res=>{
                that.propertyTypeArray = res.map(v=>{
                    return {
                        name: v.name
                    }
                })
            });
            request.getConstructClassify().then(res=>{
                that.constructClassify = res.map(v=>{
                    return{
                        name: v.name
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
