// combination/pages/browsePictures/index.js
const topHeight = require('../../../request/topHeight.js').topHeight
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		title: "浏览图片",
		bgColor: {
			"color": true,
			"border": true
		},
		src: "",
		current: 0,
		paddingTop: topHeight,
		addTitle: "点击加载更多",
		list: [],
		pageIndex: 1,
		pageSize: 12,
		show: false,
	},

	getData() {
		// merchandise.warehouseList({
		// 	"pageSize": this.data.pageSize,
		// 	"pageIndex": this.data.pageIndex,
		// }).then(((res) => {
		// 	let list = this.data.list;
		// 	list.push(...res.list)
		// 	this.setData({
		// 		list: list,
		// 		pageIndex: this.data.pageIndex + 1,
		// 	})
		// })).catch((err) => {
		// 	wx.showToast({
		// 		title: '请求失败',
		// 		icon: 'none',
		// 		duration: 2500
		// 	})
		// })
	},

	getItem() {
		console.log(this.data.list.length)
	},

	getImage(e) {
		this.setData({
			current: e.currentTarget.dataset.index,
			show: true
		});
	},

	onClose() {
		this.setData({
			show: false
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let item = JSON.parse(options.item);
		this.setData({
			src:item.houseVideo,
			list:item.designSketch,
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