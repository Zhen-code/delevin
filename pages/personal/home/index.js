// pages/personal/home/index.js
const {
	provincCityDistrict
} = require('../../../request/provinces')
var QQMapWX = require('../../../utils/qqmap-wx-jssdk');
var qqmapsdk;
var key = 'XRUBZ-XN6KX-IYQ4H-7XZUT-AZWLJ-4PBIA'
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
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		show: false,
		city: "",
		houseType: [{
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
		bannerList: [1, 2, 3, 4],
		tabIndex: 0,
		areaList: provincCityDistrict
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
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
		changeHouseType(e) {
			let name = e.currentTarget.dataset.item.name;
			switch (name) {
				case "新房/楼盘":
					console.log("新房/楼盘")
					break;
				case "二手房":
					console.log("二手房")
					break;
				case "租房":
					console.log("租房")
					break;
				case "找小区":
					console.log("找小区")
					break;
				case "房贷计算":
					console.log("房贷计算")
					break;
				default:
			}
		},
		toPrice() {
			console.log('跳卖楼界面')
		},
		toNewsDetails(e) {
			console.log('带参跳新闻详情界面')
		},
		catchTouchMove:function(res){
			return false
		},
		selectShelf() {
			if (this.data.tabIndex === 0) {
				this.setData({
					tabIndex: 1,
				})
			} else {
				this.setData({
					tabIndex: 0,
				})
			}
		},
	},
})