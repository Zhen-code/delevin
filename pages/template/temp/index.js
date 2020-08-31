// pages/message/message.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		top:0,
		val: '',
		placeholder: '搜索附近菜市场',
		active: 1,
	},

	scrollTop() {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

	onPageScroll(e) {
    this.setData({
      'top': Number(e.scrollTop)
    })
    if (e.scrollTop > 200) {

    }
  },

	handleContact(e) {
		console.log(e.detail.path)
		console.log(e.detail.query)
	},

	onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
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

	}
})