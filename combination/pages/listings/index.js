// combination/pages/listings/index.js
const app = getApp()
const {
	request
} = require('../../../request/request.js');
const topHeight = require('../../../request/topHeight.js').topHeight
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		paddingTop: topHeight,
		bgColor: {
			"color": true,
			"border": true,
		},
		tabItem: ['新房/楼盘', '二手房', '租房', '小区'],
		item: [],
		pageIndex: 1,
		pageSize: 12,
		scrollTop: 0,
		triggered: false,
		placeholder: '输入地名/地铁/楼盘/小区查找房源',
		value: '',
		keyword: '',
		city: '',
		province: '',
		index: 0,
	},

	getCityValue(e) {
		this.setData({
			province: e.detail[0].name,
			city: e.detail[1].name,
		}, () => {
			this.getData()
		})
	},

	getInputValue(e) {
		this.setData({
			keyword: e.detail
		})
	},

	getSearchValue(e) {
		this.setData({
			keyword: e.detail.value,
			city: e.detail.city,
			province: e.detail.province || app.globalData.address.province,
		},()=>{
			this.getData()
		})
	},

	getBackTabValue(e) {
		this.setData({
			item:[],
			pageIndex:1,
			index: e.detail
		},()=>{
			this.getData()
		})
	},

	scrollTop() {
		wx.pageScrollTo({
			scrollTop: 0
		})
	},

	topList() {
		this.setData({
			triggered: false,
		})
		this.getData()
	},

	//滚动加载
	scrollList() {
		this.getData()
	},

	getData() {
		let requests = '';
		let {
			index,
			city,
			item,
			keyword,
			province,
			pageIndex,
			pageSize,
		} = this.data;
		switch (index) {
			case 0:
				requests = request.newListings;
				break
			case 1:
				requests = request.towListings;
				break
			case 2:
				requests = request.tenancyListings;
				break
			case 3:
				requests = request.quartersListings;
				break
		}
		requests({
			"city": city,
			"keyword": keyword,
			"pageIndex": pageIndex,
			"pageSize": pageSize,
			"province": province,
		}).then((res) => {
			let data = item;
			item.push(...res.list)
			this.setData({
				item: item,
				pageIndex: pageIndex + 1,
			})
		}).catch((err) => {
			wx.showToast({
				title: '数据错误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	toDetails(e){
		console.log(e.currentTarget.dataset.item)
		let type = '';
		switch (this.data.index) {
			case 0:
				type = "新房房源";
				break;
			case 1:
				type = "二手房房源";
				break;
			case 2:
				type = "租房房源";
				break;
			case 3:
				type = "小区房源";
				break;
			default:
		}
		let item = JSON.stringify({
			'title': type,
			"id": e.currentTarget.dataset.item.id,
		})
		wx.navigateTo({
			url: `/combination/pages/listingDetails/index?item=${item}`,
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			city: app.globalData.address.city,
			province: app.globalData.address.province,
			value: options.title,
			keyword:options.title,
		},()=>{
			this.getData()
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