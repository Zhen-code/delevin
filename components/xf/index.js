const chooseLocation = requirePlugin('chooseLocation');
const {key,referer,min_time,currentDate,getTime} = require('../../utils/util');
const {http} = require('../../request/http');
const {request} = require('../../request/request');
Component({
    properties: {
        houseProperty:{
            type: Array,
            value: []
        }
    },
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
        showSE:1,
        city:'',
        zxArray: [
            {name:'毛坯',value:'ROUGHCAST'},
            {name:'简装',value:'PAPERBACK'},
            {name:'中装',value: 'CHINESE_DRESS'},
            {name:'精装',value: 'HARDCOVER'},
            {name:'豪装',value: 'HAUTE_COUTURE'}],
        videoUrl: '',
        district: '',
        province: ''
    },
        timeFlag: 1,
        constructClassify: [],
        constructClassifyId: '',
        decorationStatus: '',
        imgs: [],
        propertyClassifyId: '',
        propertyTypeArray:[],
        saleStatuVal: '',
        lifetimes:{
        created() {
            let that = this;
            request.getConstructClassify().then(res=>{
                that.constructClassify = res.map(v=>{
                    return{
                        name: v.name,
                        id: v.id
                    }
                });
            });
            request.getHouseProperty().then(res=>{
                that.propertyTypeArray = res.map(v=>{
                    return {
                        name: v.name,
                        id: v.id
                    }
                })
            });
        },
        ready() {
            console.log(this.properties.houseProperty)
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
            getVideoUrl(e){
                console.log(e)
                if(e.detail.e === ''|| !e.detail.e){
                    return
                }
                this.setData({
                    videoUrl: e.detail.e
                });
            },
            getImgs(e){
                this.imgs = (e.detail.e).map(v=>v.url);
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
            let that = this;
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
                    const propertyType = (this.propertyTypeArray).map(v=>{
                        return {
                            name: v.name,
                        }
                    });
                    this.setData({
                        type:type,
                        show: true,
                        title: '物业类别',
                        actions:propertyType
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
                case 'xsCase':
                    this.setData({
                        type:type,
                        show: true,
                        title: '销售状态',
                        actions: [{name:'在售',value:'ON_SALE'},{name:'待售',value:'FOR_SALE'}]
                    });
                    break;
                default:
                    break;
            }
        },
        priceInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    price: e.detail.value
                });
            },2000);
        },
        projectInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    project: e.detail.value
                });
            },2000);
        },
        newHouseHelpInput(e){
                clearTimeout(this.timeFlag);
                this.timeFlag = setTimeout(()=>{
                    this.setData({
                        newHouseHelp: e.detail.value
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
                case 'zxCase':
                    let zxItem = this.data.zxArray.filter(v=>v.name === e.detail.detail);
                    this.decorationStatus = zxItem[0]['value'];
                    this.setData({
                        zxCase: e.detail.detail,
                        show:false
                    });
                    break;
                case 'xsCase':
                    let saleStatu = [{name:'在售',value:'ON_SALE'},{name:'待售',value:'FOR_SALE'}].filter(v=>v.name ===  e.detail.detail);
                    that.saleStatuVal = saleStatu[0]['value'];
                    this.setData({
                        xsCase:  e.detail.detail,
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
        },
        ocupyAreaInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    ocupyArea: e.detail.value
                });
            },2000);
        },
        totalFloorInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    totalFloor: e.detail.value
                });
            },2000);
        },
            developersInput(e){
                clearTimeout(this.timeFlag);
                this.timeFlag = setTimeout(()=>{
                    this.setData({
                        floorStatus: e.detail.value
                    })
                },2000);
            },
            buildingAreaInput(e){
                clearTimeout(this.timeFlag);
                this.timeFlag = setTimeout(()=>{
                    this.setData({
                        buildingArea: e.detail.value
                    })
                },2000);
            },
            floorStatusInput(e){
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
            lineSiteInput(e){
                clearTimeout(this.timeFlag);
                this.timeFlag = setTimeout(()=>{
                    this.setData({
                        lineSite: e.detail.value
                    })
                },2000);
            },
            parkRateInput(e){
                clearTimeout(this.timeFlag);
                this.timeFlag = setTimeout(()=>{
                    this.setData({
                        parkRate: e.detail.value
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
            planCountInput(e){
                clearTimeout(this.timeFlag);
                this.timeFlag = setTimeout(()=>{
                    this.setData({
                        planCount: e.detail.value
                    })
                },2000);
            },
            planCountInput(e){
                clearTimeout(this.timeFlag);
                this.timeFlag = setTimeout(()=>{
                    this.setData({
                        cqYearInput: e.detail.value
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
            salesAddressInput(e){
                clearTimeout(this.timeFlag);
                this.timeFlag = setTimeout(()=>{
                    this.setData({
                        salesAddress: e.detail.value
                    })
                },2000);
            },
            telphoneInput(e){
                clearTimeout(this.timeFlag);
                this.timeFlag = setTimeout(()=>{
                    this.setData({
                        telphone: e.detail.value
                    })
                },2000);
            },
        addHouse(){
            http({
                url: '/api/access/v1/house/estate/add',
                method: 'POST',
                params:{
                    "areaCovered": this.data.ocupyArea,
                    "buildingsCount": this.data.totalFloor,
                    "city": this.data.city,
                    "constructClassifyId": this.constructClassifyId,
                    "decorationStatus": this.decorationStatus,
                    "deliveryDate": this.data.startTime,
                    "description": this.data.makerDesc,
                    "designSketch":  this.imgs,
                    "detailsAddress": this.data.address,
                    "developers": this.developers,
                    "floorCondition": this.data.floorStatus,
                    "floorage": this.data.buildingArea,
                    "greenCoverage": this.data.greenRate,
                    "houseLabel": this.labelType,
                    "houseSubsidy": this.newHouseHelp,
                    "houseType": this.houseType,
                    "houseVideo":  this.data.videoUrl,
                    "latitude": this.data.latitude,
                    "longitude": this.data.longitude,
                    "loopLocation": this.data.lineSite,
                    "metro": this.subway,
                    "openingDate": this.data.startTime,
                    "parkingRatio": this.data.parkRate,
                    "parkingSpace": this.data.park,
                    "plannedHouseholds": this.data.planCount,
                    "projectFeatures": this.data.project,
                    "property": this.data.cqYearInput,
                    "propertyClassifyId": this.propertyClassifyId,
                    "propertyCompany": this.data.propertyCompany,
                    "propertyFee": this.data.propertyFare,
                    "province": this.data.province,
                    "region": this.data.district,
                    "salesAddress": this.data.salesAddress,
                    "salesStatus": this.saleStatuVal,
                    "street": this.data.area,
                    "telephone": this.data.telphone,
                    "title": this.data.name,
                    "unitPrice": this.data.price
                }
            }).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })

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
