Component({
    properties: {
        show: {
            type: Boolean,
            value: false
        }
    },
    data: {
        list:[
            {
                "city": "广州市",
                "createDate": "2018-03-12 21:32:33",
                "id": 1,
                "lineName": "3号线",
                "province": "广东省",
                "routeStop": [
                    "汉溪长隆",
                    "钟村"
                ]
            },
            {
                "city": "广州市",
                "createDate": "2018-03-12 21:32:33",
                "id": 2,
                "lineName": "2号线",
                "province": "广东省",
                "routeStop": [
                    "汉溪",
                    "南村"
                ]
            }
        ],
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
            // http({
            //   url: '/api/access/v1/house/metro/line/list',
            //
            // })
            let {list} = this.data;
            let scrollLeft = list.map(item=>{
                return {
                    lineName: item.lineName
                }
            });
            let scrollRight = (list[0].routeStop).map(item=>{
                return{
                    name: item,
                    active:false
                }
            });
            this.setData({
                scrollLeft,
                scrollRight
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
            let chooseSubWay = routeStop.map(item=> lineName+'/'+item.name);
            this.triggerEvent('close',{detail:chooseSubWay});
        }
    },
    lifetimes:{
        ready() {
            // wx.nextTick(()=>{
            //     this.getList();
            // });
            this.getList()
        }
    }
});
