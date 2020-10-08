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
		tabItem: ['新房/楼盘', '二手房', '租房', '小区房'],
		item: [],
		checked: true,
		pageIndex: 1,
		pageSize: 12,
		scrollTop: 0,
		triggered: false,
		placeholder: '输入地名/地铁/楼盘/小区查找房源',
		keyword: '',
		city: '广州市',
		province: '广东省',
		index: 0,
		checkedIndex:0,
		list:[],
	},

	onChange(e) {
		let	item = this.data.item;
		let index = e.currentTarget.dataset.index;
		if(item[index].checked){
			item[index].checked = false
		}else{
			item[index].checked = true
		}
		let list = item.filter(item=>{
			return item.checked === true
		})
		if(list.length === 21){
			wx.showToast({
				title: '房源最多可选择20个',
				icon: 'none',
				duration: 2500
			})
		}else{
			this.setData({
				item,
				list:list,
				checkedIndex:list.length
			});
		}
	},

	getCityValue(e) {
		this.setData({
			item:[],
			pageIndex: 1,
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
			item:[],
			pageIndex: 1,
			keyword: e.detail.value,
			city: e.detail.city,
			province: e.detail.province || app.globalData.address.province,
		}, () => {
			this.getData()
		})
	},

	getBackTabValue(e) {
		this.setData({
			item: [],
			list:[],
			checkedIndex:0,
			pageIndex: 1,
			index: e.detail
		}, () => {
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
		let houseType = '';
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
				houseType = 'ESTATE';
				requests = request.newListings;
				break
			case 1:
				houseType = 'SECOND_HAND';
				requests = request.towListings;
				break
			case 2:
				houseType = 'TENANCY';
				requests = request.tenancyListings;
				break
			case 3:
				houseType = 'RESIDENTIAL_QUARTERS';
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
			let items = res.list.map((item) => {
				item.houseType = houseType;
				item.checked = false
				return item
			})
			item.push(...items)
			this.setData({
				item,
				pageIndex: this.data.pageIndex + 1,
			})
		}).catch((err) => {
			console.log(err)
			wx.showToast({
				title: '数据错误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	submit(){
		let list = this.data.list;
		app.globalData.selectPromotion = list;
		wx.navigateBack({
			delta: 1
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			city: app.globalData.address.city || '',
			province: app.globalData.address.province || '',
		}, () => {
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