// combination/pages/addHouseOrigin/index.js
const topHeight = require('../../../request/topHeight.js').topHeight;

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
    title: "房源类别",
    show: false,
    actions: [
      {
        name: '小区',
      },
      {
        name: '新房/楼盘',
      },
      {
        name: '租房',
      },
      {
        name: '二手房'
      }
    ],
    type: '',
    houseTypeName: '小区'
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onClose(e){
    this.setData({
      show: false
    });
    console.log(e)
    if(e.detail.detail===''||e.detail.detail===null||!e.detail.detail){
      this.setData({
        show:false
      });
      return;
    }
    switch (e.detail.type) {
      case 'houseType':
        this.setData({
          houseTypeName: e.detail.detail
        });
        break;
      default:
        break;
    }
  },
  goSheet(e){
    let {type} =  e.currentTarget.dataset;
    console.log(type)
    this.setData({
      type: type,
      show:true
    })
  }
});
