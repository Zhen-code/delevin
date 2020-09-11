// pages/_index/_index.js
var menus = require('../../datas/js/menus');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    top: 0,
    bgColor: {
      "color": true,
      "border": true
    },
    Identity: false,
    PageCur: "brokerHome",
    menus: {},
  },

  onPageScroll(e) {
    this.setData({
      top: Number(e.scrollTop)
    })
  },

  getData() {
    let than = this;
    if (than.data.Identity) {
      // menus.masterMenuData.activeUrl = 'brokerHome'
      than.setData({
        PageCur: 'brokerHome',
        menus: menus.masterMenuData
      })
    } else {
      // menus.agentMenuData.activeUrl = 'home'
      than.setData({
        PageCur: 'home',
        menus: menus.agentMenuData
      })
    }
  },

  /* ColorUI页面跳转方式 */
  NavChange(e) {
    var cur = e.currentTarget.dataset.cur;
    if (cur) {
      this.setData({
        PageCur: cur,
        "menus.activeUrl": cur
      })
    }
  },

  getItem(e) {
    if (e.detail) {
      this.setData({
        PageCur: 'brokerHome',
        Identity: e.detail
      })
    } else {
      this.setData({
        PageCur: 'home',
        Identity: e.detail
      })
    }
    this.getData();
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
    this.getData();
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