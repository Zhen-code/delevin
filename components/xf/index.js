const chooseLocation = requirePlugin('chooseLocation');
const {key,referer,min_time,currentDate,getTime,formatTimeTwo} = require('../../utils/util');
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
        province: '',
        imgs: [],
    },
        timeFlag: 1,
        constructClassify: [],
        constructClassifyId: '',
        decorationStatus: '',
        propertyClassifyId: '',
        propertyTypeArray:[],
        saleStatuVal: '',
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
    },
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
            this.data.imgs = (e.detail.e).map(v=>v.url);
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
            console.log(e)
            if(e.detail.detail===""|| e.detail['detail'].length===0){
                this.setData({
                    showIndoor:false
                })
            }else{
                let houseTypeArray = e.detail['detail'].map(v=>{
                    return{
                        name: v.name,
                        id: v.id
                    }
                });
                this.setData({
                    houseType: houseTypeArray,
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
            let chooseTime = formatTimeTwo(e.detail);
            console.log(chooseTime)
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
            },500);
        },
        projectInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    project: e.detail.value
                });
            },500);
        },
        newHouseHelpInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    newHouseHelp: e.detail.value
                })
            },500);

        },
        propertyCompanyInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    propertyCompany: e.detail.value
                })
            },500);

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
            this.setData({
                ocupyArea: e.detail.value
            });
        },
        totalFloorInput(e){
            this.setData({
                totalFloor: e.detail.value
            });
        },
        developersInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    developers: e.detail.value
                })
            },500);
        },
        buildingAreaInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    buildingArea: e.detail.value
                })
            },500);
        },
        floorStatusInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    floorStatus: e.detail.value
                })
            },2000);
        },
        greenRateInput(e){
            this.setData({
                greenRate: e.detail.value
            })
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
            },500);
        },
        parkInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    park: e.detail.value
                })
            },500);
        },
        planCountInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    planCount: e.detail.value
                })
            },500);
        },
        propertyFareInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    propertyFare: e.detail.value
                })
            },500);
        },
        salesAddressInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    salesAddress: e.detail.value
                })
            },500);
        },
        telphoneInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    telphone: e.detail.value
                })
            },500);
        },
        cqYearInput(e){
            clearTimeout(this.timeFlag);
            this.timeFlag = setTimeout(()=>{
                this.setData({
                    cqYear: e.detail.value
                })
            },500);
        },
        addHouse(){
            if(this.data.name === ''){
                wx.showToast({
                    title: '请输入新房标题!',
                    icon: "none",
                    duration: 1000
                })
            }else if(this.data.houseType.length === 0){
                wx.showToast({
                    title: '请至少选择一项户型!',
                    duration: 1000,
                    icon:"none"
                });
            }else if(this.data.price === ''){
                wx.showToast({
                    title: '请输入单价!',
                    duration: 1000,
                    icon:"none"
                });
            }else if(this.data.labelType.length === 0){
                wx.showToast({
                    title: '请选择房源标签!',
                    duration: 1000,
                    icon:"none"
                });
            }else if(this.data.propertyType === ''){
                wx.showToast({
                    title: '请选择物业类型!',
                    duration: 1000,
                    icon:"none"
                });
            }else if(this.data.buildingType === ''){
                wx.showToast({
                    title: '请选择建筑类型!',
                    duration: 1000,
                    icon:"none"
                });
            }else if(this.data.xsCase === ''){
                wx.showToast({
                    title: '请选择销售状态!',
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
                let houseTypeId = this.data.houseType.map(v=>v.id);
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
                        "designSketch":  this.data.imgs,
                        "detailsAddress": this.data.address,
                        "developers": this.data.developers,
                        "floorCondition": this.data.floorStatus,
                        "floorage": Number(this.data.buildingArea),
                        "greenCoverage": this.data.greenRate,
                        "houseLabel": this.data.labelType,
                        "houseSubsidy": this.data.newHouseHelp,
                        "houseType": houseTypeId,
                        "houseVideo":  this.data.videoUrl,
                        "latitude": this.data.latitude,
                        "longitude": this.data.longitude,
                        "loopLocation": this.data.lineSite,
                        "metro": this.data.subway,
                        "openingDate": this.data.startTime,
                        "parkingRatio": this.data.parkRate,
                        "parkingSpace": this.data.park,
                        "plannedHouseholds": this.data.planCount,
                        "projectFeatures": this.data.project,
                        "property": this.data.cqYear,
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
                    wx.hideLoading();
                    console.log(res)
                    wx.showToast({
                        title: '添加成功！',
                        icon: "success",
                        duration:2000
                    });
                    if(res.data['code'] === 500){
                        wx.showToast({
                            title: res.data['msg'],
                            icon: "none"
                        })
                    }
                }).catch(err=>{
                    wx.hideLoading();
                    console.log(err)
                })
            }
        }
    },

});
