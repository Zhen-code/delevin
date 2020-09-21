// pages/home/index.js
const app = getApp()
const api = require('../../request/api').api;
const domain = require('../../request/http.js').domain;
const topHeight = require('../../request/topHeight.js').topHeight;
const {
	provincCityDistrict
} = require('../../request/provinces')
// var QQMapWX = require('../../../utils/qqmap-wx-jssdk');
// var qqmapsdk;
var key = 'XRUBZ-XN6KX-IYQ4H-7XZUT-AZWLJ-4PBIA';
const {
	request
} = require('../../request/request.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		top: 0,
		userInfo: {},
		paddingTop: topHeight,
		show: false,
		share: false,
		showInfo: true,
		city: "",
		houseItem1: [],
		houseItem2: [{
				"iconUri": "https://b.yzcdn.cn/vant/icon-demo-1126.png",
				"iconType": "客源管理",
			},
			{
				"iconUri": "https://b.yzcdn.cn/vant/icon-demo-1126.png",
				"iconType": "获客文章",
			},
			{
				"iconUri": "https://b.yzcdn.cn/vant/icon-demo-1126.png",
				"iconType": "获客海报",
			},
			{
				"iconUri": "https://b.yzcdn.cn/vant/icon-demo-1126.png",
				"iconType": "房贷计算",
			}
		],
		bannerList: [],
		brokerList:[],
		newsList: [],
		areaList: provincCityDistrict,
		tabItem: ['新房', '二手房'],
		pageSize: 12,
		pageIndex: 1,
		listingsList: [],
		type: false,
		title: '新房房源',
		showInfo: false,
	},

	onPageScroll(e) {
		this.setData({
			top: Number(e.scrollTop)
		})
	},

	getData() {
		request.information().then((res) => {
			this.setData({
				userInfo: res,
			},()=>{
				this.getBrokerList()
			})
		}).catch((err) => {
			wx.showToast({
				title: '数据错误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	getBrokerList() {
		request.brokerList({
			agentId:this.data.userInfo.agentId
		}).then((res) => {
			this.setData({
				brokerList: res,
			})
		}).catch((err) => {
			wx.showToast({
				title: '数据错误',
				icon: 'none',
				duration: 2500
			})
		})
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
								console.log(res.token, 1111)
								wx.removeStorageSync('token')
								wx.setStorageSync('token', token)
								than.setData({
									showInfo: false,
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
				houseItem1: res
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
						app.globalData.city = city
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
					title: '新房房源',
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
					title: '二手房房源',
					listingsList: [],
					listingsList: res.list
				})
			}).catch((err) => {
				console.log(err)
			})
		}
	},

	toDetails(e) {
		let item = JSON.stringify({
			'title': this.data.title,
			"id": e.currentTarget.dataset.item.id,
		})
		wx.navigateTo({
			url: `/combination/pages/listingDetails/index?item=${item}`,
		})
	},

	changeHouseType1(e) {
		let type = '';
		let index = e.currentTarget.dataset.index;
		switch (index) {
			case 0:
				type = '新房房源';
				wx.navigateTo({
					url: `/combination/pages/propertyType/index?type=${type}`,
				})
				break;
			case 1:
				type = '二手房房源';
				wx.navigateTo({
					url: `/combination/pages/propertyType/index?type=${type}`,
				})
				break;
			case 2:
				type = '租房房源';
				wx.navigateTo({
					url: `/combination/pages/propertyType/index?type=${type}`,
				})
				break;
			case 3:
				type = '小区房源';
				wx.navigateTo({
					url: `/combination/pages/propertyType/index?type=${type}`,
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

	changeHouseType2(e) {
		let index = e.currentTarget.dataset.index;
		switch (index) {
			case 0:
				wx.navigateTo({
					url: `/combination/pages/management/index`,
				})
				break;
			case 1:
				wx.navigateTo({
					url: `/combination/pages/customerArticles/index`,
				})
				break;
			case 2:
				wx.navigateTo({
					url: `/combination/pages/customerPoster/index`,
				})
				break;
			case 3:
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
	},

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

	toHomepage() {
		let agentId = this.data.userInfo.agentId
		wx.navigateTo({
			url: `/combination/pages/homepage/index?agentId=${agentId}`,
		})
	},

	toAddHouseOrigin(){
		wx.navigateTo({
			url: '/combination/pages/addHouseOrigin/index',
		})
	},

	toRecording() {
		wx.navigateTo({
			url: '/combination/pages/recording/index',
		})
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

	toSuperPromotion() {
		wx.navigateTo({
			url: '/combination/pages/superPromotion/index',
		})
	},

	toListings() {
		wx.navigateTo({
			url: '/combination/pages/listings/index',
		})
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
                console.log(res.token, 1111)
                wx.removeStorageSync('token')
                wx.setStorageSync('token', token)
                than.setData({
                  showInfo: false,
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

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getData()
		this.getLocation()
		this.getBanner();
		this.getIcon();
		this.getNews();
		this.getListingsList();
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

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.setData({
			type: app.globalData.state
		})
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