Component({
    properties: {
        show:{
            type: Boolean,
            value:''
        }
    },
    data: {
        labelList:[{name:'标签',isActive:false},{name:'标签1',isActive:false},{name:'标签2',isActive:false},{name:'标签3',isActive:false},{name:'标签4',isActive:false},{name:'标签5',isActive:false},{name:'标签6',isActive:false}]
    },
    methods: {
        handleItem(e){
            console.log(e);
            let {index} = e.currentTarget.dataset;
            let {labelList} = this.data;
            let chooseArray = labelList.filter(i=>i.isActive);
            if(chooseArray.length>=5){
                if(labelList[index]['isActive']){
                    labelList[index]['isActive']=!labelList[index]['isActive'];
                }
            }else{
                labelList[index]['isActive']=!labelList[index]['isActive'];
            }
            this.setData({
                labelList
            });
        },
        clear(){
            let {labelList} = this.data;
            labelList.forEach(i=>i.isActive=false);
            this.setData({
                labelList
            })
        },
        sure(){
            let {labelList} = this.data;
            let chooseArray = labelList.filter(i=>i.isActive);
            this.triggerEvent('closeLabel',{detail:chooseArray});
        },
        close(){
            this.triggerEvent('closeLabel',{detail:''});
        }
    }
});
