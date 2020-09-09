// pages/broker/home/index.js
const topHeight = require('../../../request/topHeight.js').topHeight

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		top: {
			type: Number,
			value: 0,
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		paddingTop: topHeight,
		bgColor: {
			"color": true,
			"border": true,
		},
		houseItem: [{
				"icon": "https://b.yzcdn.cn/vant/icon-demo-1126.png",
				"name": "客源管理",
			},
			{
				"icon": "https://b.yzcdn.cn/vant/icon-demo-1126.png",
				"name": "获客文章",
			},
			{
				"icon": "https://b.yzcdn.cn/vant/icon-demo-1126.png",
				"name": "获客海报",
			},
			{
				"icon": "https://b.yzcdn.cn/vant/icon-demo-1126.png",
				"name": "房贷计算",
			}
		],
		share: false,
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		getShareIt() {
			this.setData({
				share: true,
			})
		},

		setShareIt() {
			this.setData({
				share: false,
			})
		},

		toHomepage(){
			wx.navigateTo({
				url: '/combination/pages/homepage/index',
			})
		},

		toRecording() {
			wx.navigateTo({
				url: '/combination/pages/recording/index',
			})
		},

		changeHouseType(e) {
			switch (e.detail) {
				case 0:
					wx.navigateTo({
						url: '/combination/pages/management/index',
					})
					break;
				case 1:
					wx.navigateTo({
						url: '/combination/pages/customerArticles/index',
					})
					break;
				case 2:
					wx.navigateTo({
						url: '/combination/pages/customerPoster/index',
					})
					break;
				case 3:
					// wx.navigateTo({
					// 	url: '/combination/pages/listings/index',
					// })
					break;
				default:
			}
		},

		getDelete() {
			wx.showModal({
				title: '删除信息',
				content: '是否确认删除此楼盘？',
				showCancel: true,
				cancelText: "取消",
				confirmText: "确定",
				success(res) {
					if (res.confirm) {
						console.log(res, 111)
					} else {
						console.log(res, 222)
					}
				}
			})
		},

		getOrdinaryPurchase() {
			wx.showModal({
				title: '楼盘推广',
				content: '购买端口套餐即可获得推广房源资格，是否立即前往购买？',
				showCancel: true,
				cancelText: "取消",
				confirmText: "立即购买",
				success(res) {
					if (res.confirm) {
						wx.navigateTo({
							url: '/combination/pages/generalPromotion/index',
						})
					} else {
						console.log(res, 222)
					}
				}
			})
		},

		toSuperPromotion(){
			wx.navigateTo({
				url: '/combination/pages/superPromotion/index',
			})
		},

		toListings() {
			wx.navigateTo({
				url: '/combination/pages/listings/index',
			})
		},
	}
})