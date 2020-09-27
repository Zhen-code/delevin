// combination/pages/recording/index.js
const topHeight = require('../../../request/topHeight.js').topHeight;
const {http} = require('../../../request/http');
const {api} = require('../../../request/api');
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
		tabItem: ['房源访客', '推送客源', '待抢客源', '已抢客源'],
		item: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		pageIndex: 1,
		pageSize: 12,
		scrollTop: 0,
		triggered: false,
		tabIndex:0,
		snatchList:[],
		watiCustomerList: [],
		pushCustomer: []
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

	dialNumber() {
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

	getTabValue(e){
		this.setData({
			tabIndex:e.detail
		})
	},

	buy(){
		wx.showModal({
			title: '客源管理',
			content: '本功能需要购买抢客套餐，是否前往购买？',
			showCancel: true,
			cancelText: "取消",
			confirmText: "去付费",
			success(res) {
				if (res.confirm) {
					console.log(res, 111)
				} else {
					console.log(res, 222)
				}
			}
		})
	},

	confirm(){
		wx.showModal({
			title: '客源管理',
			content: '本操作需要消耗1次抢客次数，是否确认抢客？',
			showCancel: true,
			cancelText: "取消",
			confirmText: "确定抢客",
			success(res) {
				if (res.confirm) {
					console.log(res, 111)
				} else {
					console.log(res, 222)
				}
			}
		})
	},
	getSnatchList(){
			http({
				url: api.broker.snatchCustomerList,
				method: 'GET',
				params:{
					pageIndex: 1,
					pageSize: 1000
				}
			}).then(res=>{
				console.log(res)
				this.setData({
					snatchList: res.list||[]
				})
			}).catch(err=>{
				console.log(err);
			})
	},
	getWaitCustom(){
		http({
			url: api.broker.watiCustomerList,
			method: 'GET',
			params:{
				pageIndex: 1,
				pageSize: 1000
			}
		}).then(res=>{
			console.log(res);
			this.setData({
				watiCustomerList: res.list
			})
		}).catch(err=>{
			console.log(err)
		})
	},
	getPushCustomer(){
		http({
			url: api.broker.pushCustomerList,
			method: 'GET',
			params:{
				pageIndex: 1,
				pageSize: 1000
			}
		}).then(res=>{
			console.log(res)
			this.setData({
				pushCustomer: res.list
			})
		}).catch(err=>{
			console.log(err);
		})
	},
	getVisitorList(){
		http({
			url: api.operation.visitorList,
			method: 'GET',
			params:{
				pageIndex: 1,
				pageSize: 1000,
				type: 'HOUSE'
			}
		}).then(res=>{
			console.log(res)
		}).catch(err=>{
			console.log(err)
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
			this.getSnatchList();
			this.getWaitCustom();
			this.getPushCustomer();
			this.getVisitorList();
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