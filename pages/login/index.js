//获取应用实例
const app = getApp()
Page({
  data: {

  },
  //事件处理函数
  getPhoneNumber: function (e) {
    console.log(e)
    var that = this;
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.getUserInfo({
        success: res => {
          console.log(res.userInfo)
          app.globalData.userInfo = res.userInfo;
          wx.navigateTo({
            url:"/pages/index/index"
          })
        },
      })
    } else {
      console.log('拒绝授权')
    }
  },

  onLoad: function () {

  }
})