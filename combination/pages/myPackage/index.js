// combination/pages/myPackage/index.js
const topHeight = require('../../../request/topHeight.js').topHeight
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		paddingTop:topHeight,
		bgColor: {
      "color": true,
      "border": false,
		},
		index:0,
		tabItem: ['端口套餐', '抢客套餐', '超级推广套餐'],
		item: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		pageIndex: 1,
		pageSize: 12,
		scrollTop: 0,
		triggered: false,
	},

	scrollTop() {
		wx.pageScrollTo({
			scrollTop: 0
		})
	},

	topList() {
		this.setData({
			pageIndex: 1,
			triggered: false,
		})
		this.getData()
	},

	//滚动加载
	scrollList() {
		this.getData()
	},

	getData() {

	},

	getbackTabIndex(e){
		console.log(e.detail)
		this.setData({
			index:e.detail
		})
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