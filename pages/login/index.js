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
    let _this = this;
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
                app.globalData.loginInfo.iv = numberData.iv;
                app.globalData.loginInfo.openId = rese.openId;
                app.globalData.loginInfo.sessionKey = rese.sessionKey;
                wx.getSetting({
                  success(res) {
                    if (res.authSetting['scope.userInfo']) {
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                      wx.getUserInfo({
                        success: function (res) {
                          _this.getToLogin(true, rese, res, numberData)
                        }
                      })
                    } else {
                      _this.getToLogin(false, rese, {}, numberData)
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

  getToLogin(type, rese, res, numberData) {
    let data = {};
    let homePage = '';
    console.warn(wx.getStorageSync('homePage'));
    if (wx.getStorageSync('homePage')) {
      homePage = wx.getStorageSync('homePage')
    }
    if (type) {
      console.log(res.userInfo, 1111)
      data = {
        "encryptedData": numberData.encryptedData,
        "headImgUri": res.userInfo.avatarUrl,
        "iv": numberData.iv,
        "nickName": res.userInfo.nickName,
        "openId": rese.openId,
        "sessionKey": rese.sessionKey,
      }
    } else {
      console.log(res.userInfo, 1111)
      data = {
        "encryptedData": numberData.encryptedData,
        "headImgUri": "",
        "iv": numberData.iv,
        "nickName": "",
        "openId": rese.openId,
        "sessionKey": rese.sessionKey,
      }
    }
    request.login(data).then((res) => {
      let token = res.token;
      wx.removeStorageSync('token')
      wx.setStorageSync('token', token)
      wx.showToast({
        title: '登录成功',
        icon: 'none',
        duration: 2500
      });
      if (homePage.name === 'homepage') {
        wx.reLaunch({
          url: `/combination/pages/homepage/index?agentId=${homePage.agentId}`,
        });
        wx.removeStorageSync('homePage')
      }else if (homePage.name === 'customerArticleDetail') {
        console.log(homePage.url)
        wx.reLaunch({
          url: homePage.url,
          success:function(){
            console.log("清除缓存")
            wx.removeStorageSync('homePage')
          }
        })
      }else if(homePage.name === 'aspectDetail'){
        wx.reLaunch({
          url: homePage.url,
          success:()=>{
            console.log("清除缓存")
            wx.removeStorageSync('homePage')
          }
        })
      }else {
        app.globalData.state = true
        wx.reLaunch({
          url: "/pages/mine/index"
        })
      }
    }).catch((err) => {
      console.log(err.data.msg)
      wx.showToast({
        title: err.data.msg || '获取失败，请重新登录',
        icon: 'none',
        duration: 2500
      })
    })
  },

  privacyPolicy() {
    request.link({
      'type': 'LOGIN_SERVICE_AGREEMENT'
    }).then((res) => {
      let item = JSON.stringify({
        "title": "登录服务协议",
        "link": res.link,
      })
      wx.navigateTo({
        url: `/combination/pages/webView/index?item=${item}`,
      })
    }).catch((err) => {
      wx.showToast({
        title: '数据错误',
        icon: 'none',
        duration: 2500
      })
    })
  },

  onLoad: function () {

  }
})