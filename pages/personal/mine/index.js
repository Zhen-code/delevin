// pages/personal/mine/index.js
const app = getApp()
var menus = require('../../../datas/js/menus');
const {
  request
} = require('../../../request/request.js');
const topHeight = require('../../../request/topHeight.js').topHeight
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		top: {
			type: Number,
			value: 0
		},
		userInfo: {
			type: Object,
			value: ''
		}
	},

	created() {
		this.getData()
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		paddingTop: topHeight,
		userInfo: {},
	},
	observers: {
		// console.log(menus.agentMenuData.activeUrl)
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		tabPortal() {
			let item = true
			this.triggerEvent('item', item)
		},
		getData() {
			request.information().then((res) => {
				this.setData({
					userInfo:res,
				})
			}).catch((err) => {
				console.log(err)
			})
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
						menus.agentMenuData.activeUrl = 'home'
						wx.reLaunch({
							url: "/pages/login/index"
						})
					}
				},
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
	}
})