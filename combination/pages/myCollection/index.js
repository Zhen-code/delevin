// combination/pages/myCollection/index.js
const topHeight = require('../../../request/topHeight.js').topHeight
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
		topTabIndex: 0,
		tabItem: [],
		tab1: ['新房/楼盘', '二手房', '租房', '小区房'],
		tab2: ['新闻', '地产315'],
		item: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		pageIndex: 1,
		pageSize: 12,
		scrollTop: 0,
		triggered: false,
	},

	topTap(e) {
		let data = this.data;
		if (e.currentTarget.dataset.index === 0) {
			this.setData({
				tabItem: data.tab1,
				topTabIndex: e.currentTarget.dataset.index
			})
		} else {
			this.setData({
				tabItem: data.tab2,
				topTabIndex: e.currentTarget.dataset.index
			})
		}
	},

	scrollTop() {
		wx.pageScrollTo({
			scrollTop: 0
		})
	},

	topList() {
		this.setData({
			// pageIndex: 1,
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
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let index = Number(options.tabIndex);
		let data = this.data;
		this.setData({
			tabItem: index === 0 ? data.tab1 : data.tab2,
			topTabIndex: index,
		})
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