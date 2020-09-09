Component({
    properties: {
        show:{
            type: Boolean,
            value:false
        }
    },
    data: {
        indoorList:[{name:'一室',isActive:false},{name:'两室',isActive:false},{name:'三室',isActive:false},{name:'四室',isActive:false},{name:'五室',isActive:false},{name:'五室以上',isActive:false}]
    },
    methods:{
        handleItem(e){
            console.log(e);
            let {index} = e.currentTarget.dataset;
            let {indoorList} = this.data;
            let chooseArray = indoorList.filter(i=>i.isActive);
            if(chooseArray.length>=5){
                if(indoorList[index]['isActive']){
                    indoorList[index]['isActive']=!indoorList[index]['isActive'];
                }
            }else{
                indoorList[index]['isActive']=!indoorList[index]['isActive'];
            }
            this.setData({
                indoorList
            });
        },
        clear(){
            let {indoorList} = this.data;
            indoorList.forEach(i=>i.isActive=false);
            this.setData({
                indoorList
            })
        },
        sure(){
            let {indoorList} = this.data;
            let chooseArray = indoorList.filter(i=>i.isActive);
            this.triggerEvent('closeIndoor',{detail:chooseArray});
        },
        close(){
            this.triggerEvent('closeIndoor',{detail:''});
        }
    }
});
