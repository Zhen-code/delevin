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
        labelType:[{name:'有房'},{name:'没房'}],
        project: '',
        newHouseHelp:'',
        propertyType:[{name:'物业类'}],
        buildingType:[{name:'顶层建筑'}],
        cqYear: '',
        zxCase:'',
        zxType: [{name:'毛坯',name:'简装',name:'中装',name:'精装',name:'豪装'}],
        lineSite: '',
        xsCase:'',
        currentDate: '',
        startTime:'',
        showTimePick:false
    },
    timeFlag: 1,
    lifetimes:{
      ready() {
          let currentDate = new Date().getTime();
          this.setData({
              currentDate:currentDate,
          })
      }
    },
    methods: {
        goTimePick(){
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
                startTime: startTime,
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
                    const {zxType} = this.data;
                    this.setData({
                        type:type,
                        show: true,
                        title: '装修状况',
                        actions: zxType
                    });
                    break;
                case 'zxCase' :
                    const {buildingType} = this.data;
                    this.setData({
                        type:type,
                        show: true,
                        title: '建筑类型',
                        actions: buildingType
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
        onClose(){

        }
    }
});
