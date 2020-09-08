//获取应用实例
const app = getApp()
const api = require('../../request/api').api;
const domain = require('../../request/http.js').domain;
const {
  request
} = require('../../request/request');
Page({
  data: {

  },
  //事件处理函数
  getPhoneNumber: function (e) {
    let userInfo = '';
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      let msg = e.detail;
      wx.getUserInfo({
        success: res => {
          userInfo = res.userInfo;
          wx.login({
            success: res => {
              if (res.code) {
                wx.request({
                  url: domain + api.login.authorization,
                  data: {
                    "code": res.code,
                    "headImgUri": userInfo.avatarUrl,
                    "nickName": userInfo.nickName
                  },
                  method: "POST",
                  success(res) {
                    let data = res.data.data;
                    let source = {
                      "encryptedData": msg.encryptedData,
                      "iv": msg.iv,
                      "openId": data.openId,
                      "sessionKey": data.sessionKey,
                    }
                    request.login(source).then((res) => {
                      let token = res.token
                      wx.removeStorageSync('token')
                      wx.setStorageSync('token', token)
                      wx.navigateTo({
                        url: "/pages/index/index"
                      })
                    }).catch((err) => {
                      console.log(err)
                    })
                  },
                  fail(err) {
                    console.log(err)
                  }
                })
              } else {
                console.log('登录失败！')
              }
            }
          })
        },
      });
    } else {
      console.log('拒绝授权')
    }
  },

  onLoad: function () {

  }
})