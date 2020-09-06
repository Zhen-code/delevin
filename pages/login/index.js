//获取应用实例
const app = getApp()
const api = require('../../request/api').api;
const domain = require('../../request/http.js').domain;
Page({
  data: {

  },
  //事件处理函数
  getPhoneNumber: function (e) {
    var that = this;
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.getUserInfo({
        success: res => {
          console.log(res.userInfo)
          // app.globalData.userInfo = res.userInfo;
          // wx.navigateTo({
          //   url:"/pages/index/index"
          // })
        },
      });
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            console.log(res.code)
            //发起网络请求
            // wx.request({
            //   url:domain+api.index.login,
            //   data: {
            //     thirdPartyId: res.code
            //   },
            //   method: "POST",
            //   success(res) {
            //     let token = res.data.data.token
            //     wx.removeStorageSync('token')
            //     wx.setStorageSync('token', token)
            //     //获取用户个人信息
            //   },
            //   fail(err) {
            //     console.log(err)
            //   }
            // })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })   
    } else {
      console.log('拒绝授权')
    }
  },

  onLoad: function () {

  }
})