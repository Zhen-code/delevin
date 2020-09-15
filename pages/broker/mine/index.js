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
			wx.navigateTo({
				url: '/combination/pages/myPackage/index',
			})
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

		toShareItCode(){
			wx.navigateTo({
				url: '/combination/pages/shareItCode/index',
			})
		},

		outLogin(){
			wx.showModal({
				title: '退出登录',
				content: '是否退出登录，清除数据？',
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
						 wx.redirectTo({
							url:"/pages/login/index"
						})
					}
			 },
			})
		},
	}
})