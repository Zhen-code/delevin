// pages/watchhot/watchhot.js
const {topHeight} = require('../../../request/topHeight');
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
    _index: '0',
    active: 0,
    tabActive: 0,
    list: [
      {
        id: 0,
        title: '分类12',
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1488135411,3051215224&fm=26&gp=0.jpg'
      },
      {
        id: 2,
        title: 'BA',
        src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3545561584,783374626&fm=26&gp=0.jpg'
      },
      {
        id: 3,
        title: 'CA',
        src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3553848721,101904718&fm=26&gp=0.jpg'
      },
      {
        id: 4,
        title: 'VA',
        src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3553848721,101904718&fm=26&gp=0.jpg'
      },
      {
        id: 5,
        title: 'EA',
        src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3553848721,101904718&fm=26&gp=0.jpg'
      },
      {
        id: 6,
        title: 'TA',
        src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3553848721,101904718&fm=26&gp=0.jpg'
      }
    ]
  },
  toggleTab(e) {
    this.setData({
      _index: e.target.dataset.index
    })
  },
  onChange(event) {
    console.log(event.detail);
    this.setData({
      tabActive: event.detail.index
    })
  },
  goHouseDetal(e){
    wx.navigateTo({
      url: '/combination/pages/aspectDetail/index?id=' + e.currentTarget.dataset.id,
    })
    console.log(e.currentTarget.dataset.id);
  },
  post(){
    wx.navigateTo({
      url: '/combination/pages/post/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function () {

  }
})
