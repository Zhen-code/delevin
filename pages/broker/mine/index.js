const topHeight = require('../../../request/topHeight.js').topHeight
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		top: {
			type: Number,
			value: 0
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		paddingTop: topHeight
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		tabPortal() {
			let item = false
			this.triggerEvent('item', item)
		},
		toModify(){
			wx.navigateTo({
				url: '/combination/pages/modify/index',
			})
		},
		myPackage() {
			console.log('我的套餐')
		},
		myClientele() {
			wx.navigateTo({
				url: '/combination/pages/management/index',
			})
		},
		privacyPolicy() {
			console.log('隐私政策')
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