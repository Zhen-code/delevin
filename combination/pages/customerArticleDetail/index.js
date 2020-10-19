const topHeight = require('../../../request/topHeight.js').topHeight;
const {api} = require('../../../request/api');
const {http} = require('../../../request/http');
const {request} = require('../../../request/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paddingTop:topHeight,
    bgColor: {
      "color": true,
      "border": true
    },
    title: '',
    author: '',
    time: '',
    nodes: '',
    id: '',
    safeBottom: 0,
    userId:''
  },
  timeFlag: 1,
  getNewsDetail(id){
    http({
      url: api.personalHome.customerArticleDetail(id),
      method: 'GET',
      params:{}
    }).then(res=>{
      console.log(res)
      this.setData({
        title: res.name,
        author: res.author,
        time: res.createDate,
        nodes: res.newsDetails.replace(/\<img /gi,'<img class="news-img" ')
      });
    }).catch(err=>{
      console.log(err);
    })
  },
  addArticleVisited(){
    let userId = this.data.userId;
    console.log(userId)
    console.log('被访用户id');
    if(userId!==''){
      request.addMemberVisitor({
        intervieweeId: userId,
        type: 'ARTICLE'
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }else{
      console.log('暂无用户id')
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let {id,userId} = options;
    console.log(userId)
    console.log('经纪人id')
    this.setData({
      id: id,
      userId: userId||''
    });
    this.getNewsDetail(id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.userId);
    console.log('show中id')
    if(this.data.userId){
      this.addArticleVisited();
    }
    let res = wx.getSystemInfoSync();
    if(res['model'].includes('iPhone')){
      this.setData({
        safeBottom: Number(res.safeArea.bottom - res.safeArea.height)
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let { title} = this.data;
    console.log(res);
    let userId = wx.getStorageSync('userId');
    if(res.from === 'button'){

    }
    return {
      title: title,
      path: '/combination/pages/customerArticleDetail/index?id='+this.data.id+'&userId='+userId,
      success: function (res) {
        console.log('成功', res)
      }
    }

  },

});
