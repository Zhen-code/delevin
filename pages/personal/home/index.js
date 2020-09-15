// pages/personal/home/index.js
const app = getApp()
const {
	provincCityDistrict
} = require('../../../request/provinces')
const {
	request
} = require('../../../request/request');
var QQMapWX = require('../../../utils/qqmap-wx-jssdk');
var qqmapsdk;
var key = 'XRUBZ-XN6KX-IYQ4H-7XZUT-AZWLJ-4PBIA';
const topHeight = require('../../../request/topHeight.js').topHeight
const api = require('../../../request/api').api;
const domain = require('../../../request/http.js').domain;
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		bgColor: {
			type: Object,
			value: false,
		},
		top: {
			type: Number,
			value: 0,
		}
	},

	created() {
		this.getLocation()
		this.getBanner();
		this.getIcon();
		this.getNews();
		this.getListingsList();
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		paddingTop: topHeight,
		show: false,
		showInfo: true,
		city: "",
		houseItem: [{
				"icon": "https://b.yzcdn.cn/vant/icon-demo-1126.png",
				"name": "新房/楼盘",
			},
			{
				"icon": "https://b.yzcdn.cn/vant/icon-demo-1126.png",
				"name": "二手房",
			},
			{
				"icon": "https://b.yzcdn.cn/vant/icon-demo-1126.png",
				"name": "租房",
			},
			{
				"icon": "https://b.yzcdn.cn/vant/icon-demo-1126.png",
				"name": "找小区",
			},
			{
				"icon": "https://b.yzcdn.cn/vant/icon-demo-1126.png",
				"name": "房贷计算",
			}
		],
		bannerList: [],
		newsList: [],
		areaList: provincCityDistrict,
		tabItem: ['新房', '二手房'],
		pageSize: 12,
		pageIndex: 1,
		listingsList: [],
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		getBanner() {
			request.banner().then((res) => {
				this.setData({
					bannerList: res
				})
			}).catch((err) => {
				wx.showToast({
					title: err,
					icon: 'none',
					duration: 2500
				})
			})
		},

		getIcon() {
			request.icon().then((res) => {
				this.setData({
					houseItem: res
				})
			}).catch((err) => {
				wx.showToast({
					title: err,
					icon: 'none',
					duration: 2500
				})
			})
		},

		getNews() {
			request.news().then((res) => {
				this.setData({
					newsList: res
				})
			}).catch((err) => {
				wx.showToast({
					title: err,
					icon: 'none',
					duration: 2500
				})
			})
		},

		getLocation() {
			let that = this;
			wx.getLocation({
				success: (res) => {
					var longitude = res.longitude
					var latitude = res.latitude
					wx.request({
						url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${key}`,
						success: (res) => {
							let city = res.data.result.address_component.city;
							that.setData({
								city: city
							})
						}
					})
				},
			})
		},

		changeCity() {
			this.setData({
				show: true
			});
		},

		changeSearch() {
			wx.navigateTo({
				url: '/combination/pages/searchFor/index'
			})
		},

		onClose() {
			this.setData({
				show: false
			});
		},

		cancel() {
			this.onClose()
		},

		confirm(e) {
			// for (let i = 0; i < e.detail.values.length; i++) {
			// 	name = e.detail.values[0].name + '-' + e.detail.values[1].name + '-' + e.detail.values[2].name;
			// 	code = e.detail.values[0].code + '-' + e.detail.values[1].code + '-' + e.detail.values[2].code;
			// }
			let name = '';
			if (e.detail.values[1].name.length > 4) {
				name = e.detail.values[1].name.substring(0, 4) + '...'
			} else {
				name = e.detail.values[1].name
			}
			this.setData({
				city: name || '未选择'
			})
			this.onClose();
		},

		toPrice() {
			wx.navigateTo({
				url: '/combination/pages/sellHouse/index',
			})
		},

		toNewsDetails(e) {
			console.log('带参跳新闻详情界面')
			console.log(e)
			wx.navigateTo({
				url: `/combination/pages/aspectDetail/index?id=${0}`,
			})
		},

		catchTouchMove(res) {
			return false
		},

		getListingsList() {
			request.newListingsList({
				"pageSize": 3,
				"pageIndex": 1,
			}).then((res) => {
				this.setData({
					listingsList: res.list
				})
			}).catch((err) => {
				console.log(err)
			})
		},

		getTabValue(e) {
			if (e.detail === 0) {
				request.newListingsList({
					"pageSize": 3,
					"pageIndex": 1,
				}).then((res) => {
					this.setData({
						listingsList: [],
						listingsList: res.list
					})
				}).catch((err) => {
					console.log(err)
				})
			} else {
				request.towListingsList({
					"pageSize": 3,
					"pageIndex": 1,
				}).then((res) => {
					this.setData({
						listingsList: [],
						listingsList: res.list
					})
				}).catch((err) => {
					console.log(err)
				})
			}
		},

		toDetails(e) {
			console.log(e.currentTarget.dataset.item.id)
			// wx.navigateTo({
			// 	url: '/combination/pages/listingDetails/index',
			// })
		},

		changeHouseType(e) {
			switch (e.detail) {
				case 0:
					wx.navigateTo({
						url: '/combination/pages/propertyType/index',
					})
					break;
				case 1:
					wx.navigateTo({
						url: '/combination/pages/propertyType/index',
					})
					break;
				case 2:
					wx.navigateTo({
						url: '/combination/pages/propertyType/index',
					})
					break;
				case 3:
					wx.navigateTo({
						url: '/combination/pages/propertyType/index',
					})
					break;
				case 4:
					// wx.navigateTo({
					// 	url: '/combination/pages/propertyType/index',
					// })
					break;
				default:
			}
		},

		changeShowInfo() {
			this.setData({
				showInfo: false,
			})
		}
	},
})