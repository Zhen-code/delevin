// combination/pages/postDetail/index.js
const topHeight = require('../../../request/topHeight.js').topHeight;
const {api} = require('../../../request/api');
const {http} = require('../../../request/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paddingTop: topHeight,
    bgColor: {
      "color": true,
      "border": true
    },
    newsImg:[
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1251668712,1631279038&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2203904651,2859066540&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3054075612,3413957361&fm=26&gp=0.jpg'
    ],
    isCollect: false,
    title: '关于股市涨停你怎么看'
  },
  getPostDetail(id){
    http({
      url: api.personalHome.postDetail(id),
      method: 'GET',
      params:{}
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let {id} = options;
    this.getPostDetail(id);
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


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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
      path: '/combination/pages/aspectDetail/index?id='+1,
      success: function (res) {
        console.log('成功', res)
      }
    }
  },
  toWrite() {
    wx.navigateTo({
      url: '/combination/pages/comment/index'
    })
  },
  collect(){
    let {isCollect} = this.data;
    this.setData({
      isCollect: !isCollect
    });
  }
});
