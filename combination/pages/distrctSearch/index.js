const {topHeight} = require('../../../request/topHeight');
var app = getApp();
Page({
    data: {
        bgColor:{
            color: true,
            border: true
        },
        paddingTop: topHeight,
        isCancel: false
    },
    timeFlag:1,
    pageIndex:1,
    pageTotla:0,
    onLoad: function (options) {

    },
    getDistrct(value){
        console.log(value)//获取小区列表
    },
    getData(e){
        console.log(e)
        if(e.detail.detail===""){
            return
        }
        clearTimeout(this.timeFlag);
        this.timeFlag = setTimeout(()=>{
            this.getDistrct(e.detail.detail);
        },1500);
    },
    cancel(e){
        console.log(e)
        this.setData({
            isCancel:e.detail.show
        })
    },
    selectDistrct(e){
        console.log(e)
        let title = '丽江花园 丽岛豪宅高层视野开阔 家私齐全 采光好光线好';
        // let pages = getCurrentPages();
        // if(pages.length>1){
        //     let prePage = pages[pages.length-2];
        //     console.log(prePage);
        // }
        app.globalData.districtTitle = title;
        wx.navigateBack({
            delta:1
        });
    }
});
