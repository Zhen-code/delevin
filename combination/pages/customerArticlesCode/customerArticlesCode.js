import drawQrcode from "../../../components/canvas/weapp.qrcode.esm.js"
const { http } = require('../../../request/http');
const { api } = require('../../../request/api');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    obj: {
      title:"",
      desc:""
    },
    id:0,
    code: ''
  },

  creatCode() {
    console.log(1)
    http({
      url: api.personalHome.customerArticleDetail(this.data.id),
      method: 'GET',
      params: {}
    }).then(res => {
      console.log(res)
      let title = res.name
      let desc = res.newsDesc
      let obj = {
        title:title,
        desc:desc
      }
      this.setData({
        obj:obj
      })
    })
    //动态生成二维码
    let that = this;
    let item = wx.getStorageSync('info');
    let articleId = this.data.id;
    let userId = wx.getStorageSync('userId');
    let agentId = wx.getStorageSync('agentId');
    let shareUrl = `https://dev.delevin.beiru168.com/customerArticleDetail?id=${articleId}&userId=${userId}&agentId=${agentId}&hideBack=true`;
    drawQrcode({
      width: 188,
      height: 188,
      canvasId: 'myQrcode',
      text: shareUrl,
      callback(e) {
        if (e.errMsg == "drawCanvas:ok") {
          setTimeout(() => {
            wx.canvasToTempFilePath({
              canvasId: 'myQrcode',
              x: 0,
              y: 0,
              width: 200,
              height: 200,
              success(e) {
                console.log('二维码')
                console.log(e)
                item.tempFilePath = e.tempFilePath
                that.setData({
                  item: item,
                })
              }
            })
          }, 100);
        } else {
          wx.showToast({
            title: '生成二维码失败',
            icon: 'none',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })
    console.log(this.data.id)
    this.creatCode();



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    console.log(options)
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
  onShareAppMessage: function (options) {
    console.log(options)
    // options.orgId = wx.getStorageSync('orgId')
    // options.imgUrl = ''
    // let shareObj = shareFunction(options)
    // return shareObj
  }
})
