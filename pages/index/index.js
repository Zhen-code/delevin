// pages/_index/_index.js
const app = getApp()
// var menus = require('../../datas/js/menus');
const api = require('../../request/api').api;
const domain = require('../../request/http.js').domain;
const {
  request
} = require('../../request/request.js');
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
    showInfo: false,
    PageCur: "brokerHome",
    menus: {},
    userInfo:{},
  },

  onPageScroll(e) {
    this.setData({
      top: Number(e.scrollTop)
    })
  },

  getData() {
    let than = this;
    request.information().then((res) => {
      this.setData({
        userInfo:res,
      })
    }).catch((err) => {
      console.log(err)
    })
  },

  getUserInfo(e) {
    let than = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              let loginInfo = app.globalData.loginInfo;
              let data = {
                "encryptedData": loginInfo.encryptedData,
                "headImgUri": res.userInfo.avatarUrl,
                "iv": loginInfo.iv,
                "nickName": res.userInfo.nickName,
                "openId": loginInfo.openId,
                "sessionKey": loginInfo.sessionKey,
              }
              request.login(data).then((res) => {
                let token = res.token;
                console.log(res.token, 1111)
                wx.removeStorageSync('token')
                wx.setStorageSync('token', token)
                than.setData({
                  showInfo: false,
                })
              }).catch((err) => {
                wx.showToast({
                  title: '获取失败，请重新登录',
                  icon: 'none',
                  duration: 2500
                })
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let then = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          then.setData({
            showInfo: false,
          })
        } else {
          then.setData({
            showInfo: true,
          })
        }
      }
    })
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