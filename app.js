const app = getApp();
const api = require('./request/api').api;
const domain = require('./request/http.js').domain;
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          console.log(res.code)
          // wx.request({
          //   url: domain + api.login.authorization,
          //   data: {
          //     "code": res.code,
          //   },
          //   method: "POST",
          //   success(res) {
          //     console.log(res.data)
          //   },
          //   fail(err) {
          //     console.log(err)
          //   }
          // })
        }
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log(res)
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        }
        this.setNavBarInfo()
      }
    })
  },

  setNavBarInfo() {
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    let system = systemInfo.system.toLowerCase();
    let _height = 0;
    if (system.match("android")) {
      _height = 7.5;
    } else if (system.match("ios")) {
      _height = 4;
    }
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    // let rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null; //胶囊按钮位置信息
    // let gap = rect.top - systemInfo.statusBarHeight;
    // this.globalData.navBarHeight = 2 * gap + rect.height; //导航栏高度
    //动态计算每台手机状态栏到胶囊按钮间距
    this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    this.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    this.globalData.menuHeight = menuButtonInfo.height;
    this.globalData.maxHeight = systemInfo.statusBarHeight + _height;
    this.globalData.paddingTop = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight + _height;
  },
  globalData: {
    userInfo: null,
    loginInfo:{},
    isIphoneX: false,
    navBarHeight: 0, // 导航栏高度
    menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
    maxHeight: 0,
    paddingTop: 0,
    list: [], // tabBar
    districtTitle: '', //小区标题
    state:true,
    city:'',
    storeInfo:{},
  },
  topHeight: {
    height: 0,
  }
})