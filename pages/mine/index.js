// pages/tabBar/mine/index.js
const app = getApp()
const {
	request
} = require('../../request/request.js');
const topHeight = require('../../request/topHeight.js').topHeight
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		show: false,
		paddingTop: topHeight,
		tabTitle: "切换至经纪端",
	},

	getTab() {
		let {
			show
		} = this.data;
		if (show) {
			this.setData({
				show: false,
				tabTitle: '切换至经纪端',
			})
			app.globalData.state = show;
			wx.setTabBarItem({
				index: 1,
				text: '看点',
				iconPath: '/image/tabbar/icon_tab2_24_nor@2x.png',
				selectedIconPath: '/image/tabbar/icon_tab2_24_pre@2x.png'
			})
		} else {
			this.setData({
				show: true,
				tabTitle: '切换至用户端',
			})
			app.globalData.state = show;
			wx.setTabBarItem({
				index: 1,
				text: '房源',
				iconPath: '/image/tabbar/icon_tab9_24_nor@2x.png',
				selectedIconPath: '/image/tabbar/icon_tab9_24_pre@2x.png'
			})
		}
	},

	outLogin() {
		wx.showModal({
			title: '退出登录',
			content: '是否清除数据，退出登录？',
			showCancel: true,
			cancelText: "取消",
			confirmText: "确定",
			success: function (res) {
				if (res.cancel) {
					//点击取消,默认隐藏弹框
					console.log('取消')
				} else {
					//点击确定
					console.log('确定')
					wx.reLaunch({
						url: "/pages/login/index"
					})
				}
			},
		})
	},

	tabBroker() {
		wx.navigateTo({
			url: `/combination/pages/broker/index`,
		})
	},

	myCollection() {
		let tabIndex = 0;
		wx.navigateTo({
			url: `/combination/pages/myCollection/index?tabIndex=${tabIndex}`,
		})
	},

	browseRecords() {
		let tabIndex = 1;
		wx.navigateTo({
			url: `/combination/pages/myCollection/index?tabIndex=${tabIndex}`,
		})
	},

	privacyPolicy() {
		let link = 'www.baidu.com';
		wx.navigateTo({
			url: `/combination/pages/webView/index?link=${link}`,
		})
	},

	customerService() {
		wx.makePhoneCall({
			phoneNumber: '17620835317'
		})
		// request.getPhome().then((res) => {

		// }).catch((err) => {
		// 	wx.showToast({
		// 		title: err,
		// 		icon: 'none',
		// 		duration: 2500
		// 	})
		// })
	},

	toModify(e) {
		if (e.currentTarget.dataset.item) {
			wx.navigateTo({
				url: '/combination/pages/modify/index',
			})
		}
	},

	myPackage() {
		wx.navigateTo({
			url: '/combination/pages/myPackage/index',
		})
	},

	myClientele() {
		wx.navigateTo({
			url: '/combination/pages/management/index',
		})
	},

	getData() {
		let than = this;
		request.information().then((res) => {
			this.setData({
				userInfo: res,
			})
		}).catch((err) => {
			console.log(err)
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getData()
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