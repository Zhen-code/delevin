const {request} = require('../../request/request');
Component({
    properties: {
        show:{
            type: Boolean,
            value:''
        }
    },
    data: {
        labelList:[]
    },
    lifetimes:{
      created() {
          request.getLabelList().then(res=>{
              console.log(res)
              let labelList = res.map(v=>{
                  return{
                      name: v.name,
                      isActive:false
                  }
              });
              this.setData({
                  labelList
              })
          }).catch(err=>{
              console.log(err)
          })
      }
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
