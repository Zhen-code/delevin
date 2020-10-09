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
    safeBottom: 0
  },
  id: '',
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
    let id = wx.getStorageSync('id')|| '';
    if(id === '' || !id){
      wx.showToast({
        title: '请登录！',
        icon: "none",
        duration: 1000
      })
    }else{
      http({
        url: '/api/access/v1/user/member/visitors/add',
        method: 'POST',
        params:{
          "intervieweeId": id,
          "type": "HOUSE"
        }
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let {id} = options;
    this.setData({
      id: id
    });
    this.id = id;
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
    this.addArticleVisited();
    let res = wx.getSystemInfoSync();
    if(res['model'].includes('iPhone')){
      this.setData({
        safeBottom: Number(res.safeArea.bottom - res.safeArea.height)
      })
    }
    let userId = wx.getStorageSync('userId') || '';
    if(userId!==''){
      request.addMemberVisitor({
        intervieweeId: userId,
        type: 'ARTICLE'
      }).then(res=>{
        console.log(res)
        console.log('添加获客配文访客');
      }).catch(err=>{
        console.log(err)
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
    if(res.from === 'button'){

    }
    return {
      title: title,
      path: '/combination/pages/customerArticleDetail/index?id='+this.id,
      success: function (res) {
        console.log('成功', res)
      }
    }

  },

});
