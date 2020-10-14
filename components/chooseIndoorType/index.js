Component({
    properties: {
        show:{
            type: Boolean,
            value:false
        }
    },
    data: {
        indoorList:[{name:'一室',id: 1,isActive:false},
                    {name:'两室',id: 2,isActive:false},
                    {name:'三室',id: 3,isActive:false},
                    {name:'四室',id: 4,isActive:false},
                    {name:'五室',id: 5,isActive:false},
                    {name:'五室以上',id: 6,isActive:false}]
    },
    methods:{
        handleItem(e){
            console.log(e);
            let {index} = e.currentTarget.dataset;
            let {indoorList} = this.data;
            let chooseArray = indoorList.filter(i=>i.isActive);
            // if(chooseArray.length>=5){
            //     if(indoorList[index]['isActive']){
            //         indoorList[index]['isActive']=!indoorList[index]['isActive'];
            //     }
            // }else{
                indoorList[index]['isActive']=!indoorList[index]['isActive'];
            // }
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
