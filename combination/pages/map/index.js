// combination/pages/map/index.js
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
		item: '',
		latitude: '',
		longitude: '',
		itemIndex: 0,
		city: '',
		keyword: 'BANK',
		detailsAddress: '',
		list: [{
				"title": "银行",
				"type": "BANK",
				"unCheckImgUrl": "/combination/image/mapTab/icon_bank_nor@2x.png",
				"checkedImgUrl": "/combination/image/mapTab/icon_bank_pre@2x.png",
			},
			{
				"title": "公交",
				"type": "TRANSIT",
				"unCheckImgUrl": "/combination/image/mapTab/icon_bus_nor@2x.png",
				"checkedImgUrl": "/combination/image/mapTab/icon_bus_pre@2x.png",
			},
			{
				"title": "地铁",
				"type": "METRO",
				"unCheckImgUrl": "/combination/image/mapTab/icon_train_nor@2x.png",
				"checkedImgUrl": "/combination/image/mapTab/icon_train_pre@2x.png",
			},
			{
				"title": "教育",
				"type": "EDUCATION",
				"unCheckImgUrl": "/combination/image/mapTab/icon_education_nor@2x.png",
				"checkedImgUrl": "/combination/image/mapTab/icon_education_pre@2x.png",
			},
			{
				"title": "医疗",
				"type": "MEDICAL_TREATMENT",
				"unCheckImgUrl": "/combination/image/mapTab/icon_medical_nor@2x.png",
				"checkedImgUrl": "/combination/image/mapTab/icon_medical_pre@2x.png",
			},
			{
				"title": "购物",
				"type": "SHOPPING",
				"unCheckImgUrl": "/combination/image/mapTab/icon_shop_nor@2x.png",
				"checkedImgUrl": "/combination/image/mapTab/icon_shop_pre@2x.png",
			},
			{
				"title": "餐饮",
				"type": "RESTAURANT",
				"unCheckImgUrl": "/combination/image/mapTab/icon_eat_nor@2x.png",
				"checkedImgUrl": "/combination/image/mapTab/icon_eat_pre@2x.png",
			}
		],
		markers: [],
	},

	getData() {
		request.map({
			city: this.data.city,
			keyword: this.data.keyword,
			detailsAddress: this.data.detailsAddress,
		}).then((res) => {
			let markers = this.data.markers;
			markers = []
			markers = [{
				iconPath: "/combination/image/icon_location_map@2x.png",
				id: 0,
				title: this.data.item.detailsAddress,
				latitude: this.data.item.latitude,
				longitude: this.data.item.longitude,
				width: 33,
				height: 35
			}];
			res.map((item, index) => {
				markers.push({
					iconPath: "/combination/image/icon_location_20_map@2x.png",
					id: index + 1,
					title: item.title,
					latitude: item.latitude,
					longitude: item.longitude,
					width: 20,
					height: 20
				})
			})
			this.setData({
				markers: markers
			})
		}).catch((err) => {
			console.log(err)
			wx.showToast({
				title: '请求失败',
				icon: 'none',
				duration: 2500
			})
		})
	},

	tabItem(e) {
		let index = e.currentTarget.dataset.index;
		let item = e.currentTarget.dataset.item;
		this.setData({
			keyword: item.type,
			itemIndex: index,
		}, () => {
			this.getData()
		})
	},

	markertap(e) {
		console.log(e.detail.markerId)
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let item = JSON.parse(options.item)
		console.log(item)
		this.setData({
			city: item.city,
			keyword: 'BANK',
			latitude: item.latitude,
			longitude: item.longitude,
			detailsAddress: item.detailsAddress,
			item: item,
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