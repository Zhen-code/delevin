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
		type: '',
		stateType:'',
	},

	getCityValue(e) {
		this.setData({
			item: [],
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
		}, () => {
			this.getData()
		})
	},

	getBackTabValue(e) {
		this.setData({
			item: [],
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
		}, () => {
			this.getData()
		})
	},

	//滚动加载
	scrollList() {
		this.getData()
	},

	getData() {
		let requests = '';
		let {
			type,
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
			let data = '';
			if (type) {
				data = res.list.map((item) => {
					item.add = type = true
					return item;
				})
			} else {
				data = res.list;
			}
			item.push(...data)
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

	toDetails(e) {
		let type = '';
		if(this.data.stateType){
			app.globalData.realEstateItem = {};
			app.globalData.realEstateItem = e.currentTarget.dataset.item;
			wx.navigateBack({
				delta: 1
			})
		}else{
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
		}
	},

	getBackItem(e) {
		request.addAgent({
			"houseId": e.detail.id,
			"houseMold": e.detail.sourceType,
		}).then((res) => {
			this.setData({
				item: [],
				pageIndex: 1,
			}, () => {
				this.getData();
				wx.showToast({
					title: '添加成功',
					icon: 'success',
					duration: 2500
				})
			})
		}).catch((err) => {
			console.log(err.data.msg)
			wx.showToast({
				title: err.data.msg,
				icon: 'none',
				duration: 2500
			})
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let item = '';
		if (options.item !== undefined) {
			item = JSON.parse(options.item)
		}else{

		}
		this.setData({
			city: app.globalData.address.city || '',
			province: app.globalData.address.province || '',
			value: options.title || '',
			keyword: options.title || '',
			type: options.type || '',
			title: item.key || '房猿通',
			stateType:item.type || false,
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