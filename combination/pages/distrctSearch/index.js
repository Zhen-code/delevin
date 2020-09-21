const {topHeight} = require('../../../request/topHeight');
const {http} = require('../../../request/http');
var app = getApp();
var sy = 0;
Page({
    data: {
        bgColor:{
            color: true,
            border: true
        },
        paddingTop: topHeight,
        list: [],
        isCancel: false,
        isIndrag: false,
        scrollTop: 0,
        hei: 0
    },
    timeFlag:1,
    pageIndex:1,
    pageSize: 10,
    pageTotla:0,
    searchVal: '',
    onLoad: function (options) {
        this.getNKDistrct();
    },
    start(e){
        sy = e.touches[0].clientY;
    },
    move(e){
        // console.log(e)
        let delta = e.touches[0].clientY - sy;
        if(this.data.hei<=0 && delta<=0){
            console.log('上拉')
            return
        }
        if(this.data.scrollTop>0){
            return;
        }
        if(this.data.scrollTop<=0){
            // console.log('触发顶部，scrollTopo<=0')
            console.log(this.data.scrollTop);
            if(!this.data.isIndrag){
                this.setData({
                    isIndrag: true
                })
            }
            var tempdelta = 0;
            if(delta>0){
                console.log('正在下拉')
                if(this.data.hei>80){
                    // console.log('hei='+'80')
                    this.setData({
                        desc: '松开刷新'
                    })
                    tempdelta =  this.data.hei+delta/ (this.data.hei - 80)
                }else{
                    // console.log('hei未达到80')
                    this.setData({
                        desc: '下拉刷新'
                    });
                    tempdelta = this.data.hei+delta;
                }
            }else{
                // console.log('正在上拉'+this.data.hei + delta)
                tempdelta = this.data.hei + delta;
                if(tempdelta<=0){
                    tempdelta = 0;
                }
                this.setData({
                    desc: '下拉刷新'
                })
            }
            this.setData({
                hei: tempdelta
            })
        }
        sy = e.touches[0].clientY;
    },
    end(e){
        // console.log(e)
        sy = 0;
        let that = this;
        // console.log('离开高度'+this.data.hei)
        if(this.data.hei>80){
            this.setData({
                desc: '正在刷新',
                hei: 80
            });
            that.pageIndex = 1;
            if(that.searchVal===null || that.searchVal===undefined || !that.searchVal || that.searchVal==''){
                that.getNKDistrct();
            }else{
                that.getDistrct(that.searchVal);
            }
        }else{
            this.setData({
                desc: '下拉刷新',
                hei: 0,
                isIndrag: false
            })
        }
    },
    scrollList(){
            this.pageIndex++;
            if(this.pageIndex>this.pageTotal){
                this.setData({
                    isBottom: true
                })
            }else{

            }

    },
    scroll(e){
        clearTimeout(this.timeFlag);
        this.timeFlag = setTimeout(()=>{
            let st = e.detail.scrollTop;
            // console.log('st='+st)
            this.setData({
                scrollTop: st
            })
        },200);
    },
    getDistrct(value){
        console.log(value)
        http({
            url: '/api/access/v1/house/residential/quarters/list',
            method: 'GET',
            params:{
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                keyword: value
            }
        }).then(res=>{
            console.log(res)
            this.setData({
                list: res.list
            })
        }).then(()=>{
            this.setData({
                hei: 0,
                scrollTop: 0,
                desc: '下拉刷新',
                isInDrag: false
            })
        }).catch(err=>{
            console.log(err)
        });
        console.log(value)//获取小区列表
    },
    getNKDistrct(){
        http({
            url: '/api/access/v1/house/residential/quarters/list',
            method: 'GET',
            params:{
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
            }
        }).then(res=>{
            console.log(res)
            this.setData({
                list: res.list
            })
        }).then(()=>{
            this.setData({
                hei: 0,
                scrollTop: 0,
                desc: '下拉刷新',
                isInDrag: false
            })
        }).catch(err=>{
            console.log(err)
        });
    },
    getData(e){
        console.log(e)
        clearTimeout(this.timeFlag);
        let value = e.detail.detail;
        this.searchVal = value;
        this.timeFlag = setTimeout(()=>{
            if(!value || value===null || value===undefined){
                this.getNKDistrct();
            }else{
                this.getDistrct(value);
            }
        },1000);
    },
    cancel(e){
        console.log(e)
        this.setData({
            isCancel:e.detail.show
        })
    },
    selectDistrct(e){
        console.log(e)
        let {title,id} = e.currentTarget.dataset;
        // let pages = getCurrentPages();
        // if(pages.length>1){
        //     let prePage = pages[pages.length-2];
        //     console.log(prePage);
        // }
        app.globalData.districtTitle = title;
        app.globalData.districtId = id;
        wx.navigateBack({
            delta:1
        });
    }
});
