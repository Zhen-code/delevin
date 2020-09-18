const {http} = require('../../request/http');
Component({
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        province:{
            type: String,
            value: ''
        },
        city:{
            type: String,
            value: ''
        }
    },
    data: {
        list:[],
        scrollLeft:[],
        scrollRight:[],
        _index: 0
    },
    methods: {
        handleLeft(e){
            console.log(e)
            let {index} = e.currentTarget.dataset;
            let {list} = this.data;
            let scrollRight = (list[index].routeStop).map(item=>{
                return{
                    name: item,
                    active:false
                }
            });
            this.setData({
                _index:index,
                scrollRight:scrollRight
            })
        },
        handleRight(e){
            let {index} = e.currentTarget.dataset;
            console.log(index);
            let {scrollRight} = this.data;
            scrollRight[index]['active'] = !scrollRight[index]['active']
            this.setData({
                scrollRight
            });
        },
        getList(){
            let that = this;
            let {province,city} = this.properties;
            http({
                url: '/api/access/v1/house/metro/line/list',
                method: 'GET',
                params:{
                    city: city,
                    proviince: province
                }
            }).then(res=>{
                console.log(res)
                let scrollLeft = res.map(item=>{
                    return {
                        lineName: item.lineName
                    }
                });
                let scrollRight = (res[0].routeStop).map(item=>{
                    return{
                        name: item,
                        active:false
                    }
                });
                that.setData({
                    scrollLeft,
                    scrollRight,
                    list: res
                });

            }).catch(err=>{
                console.log(err)
            });
        },
        onClose(){
           this.triggerEvent('close',{detail:''})
        },
        clear(){
            let {scrollRight} = this.data;
            scrollRight.forEach(item=>{
               item.active=false;
            });
            this.setData({
                _index: -1,
                scrollRight:scrollRight
            });
        },
        sure(){
            let {_index,scrollLeft,scrollRight}=this.data;
            let lineName = scrollLeft[_index]['lineName'];
            console.log(lineName);
            let routeStop = scrollRight.filter(item=>item.active===true);
            console.log(routeStop);
            // let chooseSubWay = routeStop.map(item=> lineName+'/'+item.name);
            let chooseSubWay = routeStop.map(item=> {
                return{
                    lineName: lineName,
                    routeStop: item.name
                }
            });
            this.triggerEvent('close',{detail:chooseSubWay});
        }
    },
    lifetimes:{
        ready() {
            // wx.nextTick(()=>{
            //     this.getList();
            // });
            this.getList();
        }
    }
});
