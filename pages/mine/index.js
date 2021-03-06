// pages/tabBar/mine/index.js
const app = getApp()
const {
	request
} = require('../../request/request.js');
const topHeight = require('../../request/topHeight.js').topHeight
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		show: false,
		showInfo: false,
		userInfo: {},
		paddingTop: topHeight,
		tabTitle: "切换至经纪端",
	},

	getUserInfo(e) {
		let than = this;
		wx.getSetting({
			success(res) {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称
					wx.getUserInfo({
						success: function (res) {
							let loginInfo = app.globalData.loginInfo;
							let data = {
								"encryptedData": loginInfo.encryptedData,
								"headImgUri": res.userInfo.avatarUrl,
								"iv": loginInfo.iv,
								"nickName": res.userInfo.nickName,
								"openId": loginInfo.openId,
								"sessionKey": loginInfo.sessionKey,
							}
							request.login(data).then((res) => {
								let token = res.token;
								wx.removeStorageSync('token')
								wx.setStorageSync('token', token)
								than.setData({
									showInfo: false,
								}, () => {
									than.getData()
								})
							}).catch((err) => {
								wx.showToast({
									title: '获取失败，请重新登录',
									icon: 'none',
									duration: 2500
								})
							})
						}
					})
				}
			}
		})
	},

	changeShowInfo() {
		this.setData({
			showInfo: false,
		})
	},

	toShareItCode() {
		wx.navigateTo({
			url: `/combination/pages/shareItCode/index`,
		})
	},

	getTab() {
		// 1.用户端为true 2.经纪端为flase
		let {
			show
		} = this.data;
		if (show) {
			this.setData({
				show: false,
				tabTitle: '切换至经纪端',
			}, () => {
				app.globalData.state = show;
				wx.setTabBarItem({
					index: 1,
					text: '看点',
					iconPath: '/assets/tabbar/icon_tab2_24_nor@2x.png',
					selectedIconPath: '/assets/tabbar/icon_tab2_24_pre@2x.png',
					"success": function (res) {
						console.log("成功换图片", res)
					},
					"fail": function (err) {
						console.log("换图片失败", err)
					}
				})
			})
		} else {
			this.setData({
				show: true,
				tabTitle: '切换至用户端',
			}, () => {
				app.globalData.state = show;
				wx.setTabBarItem({
					index: 1,
					text: '房源',
					iconPath: '/assets/tabbar/icon_tab9_24_nor@2x.png',
					selectedIconPath: '/assets/tabbar/icon_tab9_24_pre@2x.png',
					"success": function (res) {
						console.log("成功换图片", res)
					},
					"fail": function (err) {
						console.log("换图片失败", err)
					}
				})
			})
		}
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
					wx.showToast({
						title: '数据清除成功',
						icon: 'success',
						duration: 2500
					})
					// wx.removeStorageSync('token');
					wx.clearStorage();
					setTimeout(() => {
						wx.reLaunch({
							url: "/pages/login/index"
						})
					}, 1500)
				}
			},
		})
	},

	tabBroker(e) {
		if (e.currentTarget.dataset.item.identity === "AGENT") {
			this.getTab()
		} else {
			wx.navigateTo({
				url: `/combination/pages/broker/index`,
			})
		}
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

	privacyPolicy(e) {
		let obj = {}
		if (!this.data.show) {
			obj.type = 'USER_PRIVACY_POLICY';
			obj.title = '用户隐私政策'
		} else {
			obj.type = 'BROKER_PRIVACY_POLICY';
			obj.title = '经纪人隐私政策'
		}
		request.link({
			'type': obj.type
		}).then((res) => {
			obj.type = res.type;
			obj.link = res.link;
			let item = JSON.stringify(obj)
			wx.navigateTo({
				url: `/combination/pages/webView/index?item=${item}`,
			})
		}).catch((err) => {
			wx.showToast({
				title: '数据错误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	customerService() {
		request.phone().then((res) => {
			wx.makePhoneCall({
				phoneNumber: res.serviceHotLine
			})
		}).catch((err) => {
			wx.showToast({
				title: '数据错误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	toModify(e) {
		let item = JSON.stringify(this.data.userInfo)
		if (e.currentTarget.dataset.item) {
			wx.navigateTo({
				url: '/combination/pages/modify/index?item=' + item,
			})
		}
	},

	myPackage() {
		wx.navigateTo({
			url: '/combination/pages/myPackage/index?backTab=true',
		})
	},

	myClientele() {
		wx.navigateTo({
			url: '/combination/pages/management/index',
		})
	},

	getData() {
		request.information().then((res) => {
			switch (res.resultStatus) {
				case 'AUDITING':
					res.resultStatusType = '审核中'
					break;
				case 'PASS':
					res.resultStatusType = '审核通过'
					break;
				case 'REFUSE':
					res.resultStatusType = '审核拒绝'
					break;
				default:
			}
			if (res.agentId) {
				wx.setStorageSync('agentId', res.agentId); //经纪人id
			}
			wx.setStorageSync('userId', res.id); //普通用户id
			wx.setStorageSync('info', res); //登录者信息
			this.setData({
				userInfo: res,
			})
		}).catch((err) => {
			console.log(err)
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let then = this;
		wx.getSetting({
			success(res) {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称
					then.setData({
						showInfo: false,
					})
				} else {
					then.setData({
						showInfo: true,
					})
				}
			}
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		wx.hideShareMenu({
			menus: ['shareAppMessage', 'shareTimeline']
		});
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.getData()
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
