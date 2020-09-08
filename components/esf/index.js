const chooseLocation = requirePlugin('chooseLocation');
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
        labelType:[{name:'有房'},{name:'没房'}],
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
        subway:'',
        latitude: '',
        longitude: '',
        indoorType:'',
        room:'',
        kitchen:'',
        wei:'',
        buildingTime:'',
        elevator:'',
        orient:''
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
        }
    },
    methods: {
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
        onClose(){

        },
        goPickAddress(){
            let {latitude,longitude} = this.data;
            const key = 'YGYBZ-XGBWW-WEERF-R7V27-PJIIK-O6BWA';
            const referer = 'delevin-mini-program'; //调用插件的app的名称
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
