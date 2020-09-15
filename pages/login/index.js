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
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      let numberData = e.detail;
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            wx.request({
              url: domain + api.login.authorization,
              data: {
                "code": res.code,
              },
              method: "POST",
              success(res) {
                let rese = res.data.data;
                app.globalData.loginInfo.encryptedData = numberData.encryptedData;
                app.globalData.loginInfo.unionId = numberData.iv;
                app.globalData.loginInfo.openId = rese.openId;
                app.globalData.loginInfo.sessionKey = rese.sessionKey;
                wx.getSetting({
                  success(res) {
                    if (res.authSetting['scope.userInfo']) {
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                      wx.getUserInfo({
                        success: function (res) {
                          request.login({
                            "encryptedData": numberData.encryptedData,
                            "headImgUri": res.userInfo.avatarUrl,
                            "iv": numberData.iv,
                            "nickName": res.userInfo.nickName,
                            "openId": rese.openId,
                            "sessionKey": rese.sessionKey,
                          }).then((res) => {
                            let token = res.token;
                            console.log(token, 1111222)
                            // wx.removeStorageSync('token')
                            wx.setStorageSync('token', token)
                            wx.showToast({
                              title: '登录成功',
                              icon: 'none',
                              duration: 2500
                            })
                            wx.reLaunch({
                              url: "/pages/index/index"
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
                    } else {
                      request.login({
                        "encryptedData": numberData.encryptedData,
                        "headImgUri": "",
                        "iv": numberData.iv,
                        "nickName": "",
                        "openId": rese.openId,
                        "sessionKey": rese.sessionKey,
                      }).then((res) => {
                        console.log(res.token, 1111)
                        let token = res.token;
                        wx.removeStorageSync('token')
                        wx.setStorageSync('token', token);
                        wx.showToast({
                          title: '登录成功',
                          icon: 'none',
                          duration: 2500
                        })
                        wx.reLaunch({
                          url: "/pages/index/index"
                        })
                      }).catch((err) => {
                        wx.showToast({
                          title: '获取失败，请重新登录',
                          icon: 'none',
                          duration: 2500
                        })
                      })
                    }
                  }
                })
              },
              fail(err) {
                console.log(err)
              }
            })
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