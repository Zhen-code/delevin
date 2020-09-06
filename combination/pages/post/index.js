// combination/pages/post/index.js
const {
  topHeight
} = require('../../../request/topHeight');
import Toast from "../../../miniprogram_npm/vant-weapp/toast/toast";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paddingTop: topHeight,
    bgColor: {
      "color": true,
      "border": true
    },
    title: '',
    content: '',
    label: '',
    count:9
  },
  titleInput(e) {
    console.log(e)
    clearTimeout(this.timeFlag);
    setTimeout(() => {
      let {
        value
      } = e.detail;
      if (value === "" || this.data.content === "") {
        this.setData({
          title: value,
          disable: true
        });
        return;
      } else {
        this.setData({
          title: value,
          disable: false
        })
      }
    }, 2000);
  },
  contentInput(e) {
    console.log(e);
    clearTimeout(this.timeFlag);
    setTimeout(() => {
      let {
        value
      } = e.detail;
      if (value === "" || this.data.title === "") {
        this.setData({
          content: value,
          disable: true
        });
        return;
      } else {
        this.setData({
          content: value,
          disable: false
        })
      }
    }, 2000);
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
    console.log(666)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})