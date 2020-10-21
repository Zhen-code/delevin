// pages/home/index.js
const app = getApp()
var key = 'XRUBZ-XN6KX-IYQ4H-7XZUT-AZWLJ-4PBIA';
const topHeight = require('../../request/topHeight.js').topHeight;
const {
	request
} = require('../../request/request.js');
const {
	provincCityDistrict
} = require('../../request/provinces')
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
		city: "",
		houseItem1: [],
		houseItem2: [],
		bannerList: [],
		brokerList: [],
		newsList: [],
		areaList: provincCityDistrict,
		tabItem: ['新房', '二手房'],
		pageSize: 12,
		pageIndex: 1,
		listingsList: [],
		type: false,
		title: '新房房源',
		total: 0,
		link: '',
		detailsData: ''
	},

	onPageScroll(e) {
		this.setData({
			top: Number(e.scrollTop)
		})
	},

	getData() {
		request.information().then((res) => {
			console.log(res)
			wx.setStorageSync('userInfo',JSON.stringify(res));
			this.setData({
				userInfo: res,
			}, () => {
				if (res.agentId) {
					this.getBrokerList()
				}
			})
		}).catch((err) => {
			wx.showToast({
				title: '请求失败',
				icon: 'none',
				duration: 2500
			})
		})
	},

	getBrokerList() {
		request.brokerList({
			agentId: this.data.userInfo.agentId
		}).then((res) => {
			this.setData({
				brokerList: res,
			})
		}).catch((err) => {
			wx.showToast({
				title: '请求失败',
				icon: 'none',
				duration: 2500
			})
		})
	},

	getBanner() {
		request.banner().then((res) => {
			this.setData({
				bannerList: res
			})
		}).catch((err) => {
			wx.showToast({
				title: '请求失败',
				icon: 'none',
				duration: 2500
			})
		})
	},

	getIcon() {
		request.icon().then((res) => {
			let item = res.map((item) => {
				switch (item.iconType) {
					case "CUSTOMERS_ARTICLES":
						item.iconName = "获客文章";
						break;
					case "CUSTOMERS_MANAGE":
						item.iconName = "客源管理";
						break;
					case "MORTGAGE_CALCULATOR_MEMBER":
						item.iconName = "房贷计算";
						break;
					case "CUSTOMERS_POSTER":
						item.iconName = "获客海报";
						break;
					case "ESTATE":
						item.iconName = "新房/楼盘";
						break;
					case "SECOND_HAND":
						item.iconName = "二手房";
						break;
					case "TENANCY":
						item.iconName = "租房";
						break;
					case "RESIDENTIAL_QUARTERS":
						item.iconName = "找小区";
						break;
					case "MORTGAGE_CALCULATOR_AGENT":
						item.iconName = "房贷计算";
						break;
					default:
				}
				return item;
			})
			this.setData({
				houseItem1: item.slice(0, 5),
				houseItem2: item.slice(5, 9),
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

	getNews() {
		request.news().then((res) => {
			this.setData({
				newsList: res
			})
		}).catch((err) => {
			wx.showToast({
				title: '请求失败',
				icon: 'none',
				duration: 2500
			})
		})
	},

	getSetting() {
		let that = this;
		wx.getSetting({
			success: (res) => {
				// console.log(JSON.stringify(res))
				// res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
				// res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
				// res.authSetting['scope.userLocation'] == true    表示 地理位置授权
				if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
					wx.showModal({
						title: '请求授权当前位置',
						content: '需要获取您的地理位置，请确认授权',
						success: function (res) {
							if (res.cancel) {
								wx.showToast({
									title: '拒绝授权',
									icon: 'none',
									duration: 1000
								})
							} else if (res.confirm) {
								wx.openSetting({
									success: function (dataAu) {
										if (dataAu.authSetting["scope.userLocation"] == true) {
											wx.showToast({
												title: '授权成功',
												icon: 'success',
												duration: 1000
											})
											//再次授权，调用wx.getLocation的API
											this.getLocation()
										} else {
											wx.showToast({
												title: '授权失败',
												icon: 'none',
												duration: 1000
											})
										}
									}
								})
							}
						}
					})
				} else if (res.authSetting['scope.userLocation'] == undefined) {
					//调用wx.getLocation的API
					this.getLocation()
				} else {
					//调用wx.getLocation的API
					this.getLocation()
				}
			}
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
						app.globalData.address.province = res.data.result.address_component.province;
						app.globalData.address.city = res.data.result.address_component.city;
						app.globalData.address.district = res.data.result.address_component.district;
						that.setData({
							city: res.data.result.address_component.city,
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
		let name = '';
		if (e.detail.values[1].name.length > 4) {
			name = e.detail.values[1].name.substring(0, 4) + '...'
		} else {
			name = e.detail.values[1].name
		}
		app.globalData.address.province = e.detail.values[0].name;
		app.globalData.address.city = e.detail.values[1].name;
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
		let id = e.currentTarget.dataset.item.id;
		wx.navigateTo({
			url: `/combination/pages/aspectDetail/index?id=${id}`,
		})
	},

	catchTouchMove(res) {
		return false
	},

	getNewListingsList() {
		request.newListingsList({
			"pageSize": 5,
			"pageIndex": 1,
		}).then((res) => {
			let data = res.list.map((item) => {
				item.sourceType = 'ESTATE';
				return item;
			})
			this.setData({
				title: '新房房源',
				listingsList: [],
				listingsList: data || []
			})
		}).catch((err) => {
			console.log(err)
		})
	},

	getTowListingsList() {
		request.towListingsList({
			"pageSize": 5,
			"pageIndex": 1,
		}).then((res) => {
			let data = res.list.map((item) => {
				item.sourceType = 'SECOND_HAND';
				return item;
			})
			this.setData({
				title: '二手房房源',
				listingsList: [],
				listingsList: data || []
			})
		}).catch((err) => {
			console.log(err)
		})
	},

	getTabValue(e) {
		if (e.detail === 0) {
			this.getNewListingsList()
		} else {
			this.getTowListingsList()
		}
	},

	changeHouseType1(e) {
		let type = '';
		let iconName = e.currentTarget.dataset.item.iconName;
		switch (iconName) {
			case '新房/楼盘':
				type = '新房房源';
				wx.navigateTo({
					url: `/combination/pages/propertyType/index?type=${type}`,
				})
				break;
			case '二手房':
				type = '二手房房源';
				wx.navigateTo({
					url: `/combination/pages/propertyType/index?type=${type}`,
				})
				break;
			case '租房':
				type = '租房房源';
				wx.navigateTo({
					url: `/combination/pages/propertyType/index?type=${type}`,
				})
				break;
			case '找小区':
				type = '小区房源';
				wx.navigateTo({
					url: `/combination/pages/propertyType/index?type=${type}`,
				})
				break;
			case '房贷计算':
				let obj = {
					"title": "房贷计算器",
					"link": "https://dev.delevin.beiru168.com/index.html",
				}
				let item = JSON.stringify(obj)
				wx.navigateTo({
					url: `/combination/pages/webView/index?item=${item}`,
				})
				break;
			default:
		}
	},

	changeHouseType2(e) {
		let index = e.currentTarget.dataset.index;
		let iconName = e.currentTarget.dataset.item.iconName;
		switch (iconName) {
			case '获客文章':
				wx.navigateTo({
					url: `/combination/pages/customerArticles/index`,
				});
				break;
			case '客源管理':
				wx.navigateTo({
					url: `/combination/pages/management/index`,
				});
				break;
			case '房贷计算':
				let obj = {
					"title": "房贷计算器",
					"link": "https://dev.delevin.beiru168.com/index.html",
				}
				let item = JSON.stringify(obj)
				wx.navigateTo({
					url: `/combination/pages/webView/index?item=${item}`,
				})
				break;
			case '获客海报':
				wx.navigateTo({
					url: `/combination/pages/customerPoster/index`,
				});
				break;
			default:
		}
	},

	getShareIt(e) {
		let itemData = e.currentTarget.dataset;
		this.setData({
			share: true,
			detailsData: itemData
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

	toAddHouseOrigin() {
		wx.navigateTo({
			url: '/combination/pages/addHouseOrigin/index',
		})
	},

	toRecording() {
		wx.navigateTo({
			url: '/combination/pages/recording/index?req=allRecord',
		})
	},

	getDelete(e) {
		let _this = this;
		let id = e.currentTarget.dataset.item;
		console.log(id)
		wx.showModal({
			title: '删除信息',
			content: '是否确认删除此楼盘？',
			showCancel: true,
			cancelText: "取消",
			confirmText: "确定",
			success(res) {
				if (res.confirm) {
					request.brokerDatele({
						id: id,
					}).then((res) => {
						_this.setData({
							brokerList: [],
						}, () => {
							_this.getData();
							wx.showToast({
								title: '删除成功',
								icon: 'success',
								duration: 2500
							})
						})
					}).catch((err) => {
						wx.showToast({
							title: '请求失败',
							icon: 'none',
							duration: 2500
						})
					})
				}
			}
		})
	},

	getOrdinaryPurchase(e) {
		let _this = this;
		let data = e.currentTarget.dataset.item;
		if (data.portMealStatus === 'NO') {
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
					}
				}
			})
		} else {
			wx.showModal({
				title: '楼盘推广',
				content: '是否确认推广此楼盘？',
				showCancel: true,
				cancelText: "取消",
				confirmText: "确定",
				success(res) {
					if (res.confirm) {
						request.promote({
							"houseId": data.houseId,
							"houseMold": data.houseMold
						}).then((res) => {
							_this.setData({
								brokerList: [],
							}, () => {
								_this.getData()
								wx.showToast({
									title: '推广成功',
									icon: 'success',
									duration: 2500
								})
							})
							setTimeout(() => {
								_this.getPromote()
							}, 2500)
						}).catch((err) => {
							wx.showToast({
								title: '请求失败',
								icon: 'none',
								duration: 2500
							})
						})
					}
				}
			})
		}
	},

	getPromote() {
		wx.showModal({
			title: '楼盘推广',
			content: '该房源由平台进行随机推广，当您删除房源或购买的端口套餐到期时，将停止推广',
			showCancel: true,
			cancelText: "取消",
			confirmText: "确定",
		})
	},

	toSuperPromotion(e) {
		let item = JSON.stringify(e.currentTarget.dataset.item)
		wx.navigateTo({
			url: `/combination/pages/superPromotion/index?item=${item}`,
		})
	},

	toListings() {
		let type = 'add';
		wx.navigateTo({
			url: '/combination/pages/listings/index?type=' + type,
		})
	},

	toWebView(e) {
		let link = e.currentTarget.dataset.item.link;
		let item = JSON.stringify({
			"title": "轮播图资讯",
			"link": link,
		})
		wx.navigateTo({
			url: `/combination/pages/webView/index?item=${item}`,
		})
	},

	sharePoster() {
		wx.navigateTo({
			url: '/combination/pages/sharePoster/index?data=' + JSON.stringify(this.data.detailsData)
		})
	},

	toState(){
		wx.showToast({
			title: '该楼盘已下架',
			icon: 'none',
			duration: 2500
		})
	},

	toRecommendedSource(){
		wx.navigateTo({
			url: '/combination/pages/recommendedSource/index'
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getSetting();
		this.getBanner();
		this.getIcon();
		this.getNews();
		this.getNewListingsList();
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
		this.setData({
			type: app.globalData.state
		}, () => {
			this.getData()
		});
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

	toDetails(e) {
		let {item} = e.currentTarget.dataset;
		console.log(item)
		let id = '';
		let data = '';
		let type = '';
		let title = '';
		data = item;
		if (data.status === 'LOWER') {
			wx.showToast({
				title: '该房源已下架！',
				icon: 'none',
				duration: 2000
			})
		} else {
			switch (data.houseMold) {
				case 'ESTATE':
					type = '新房房源';
					break;
				case 'SECOND_HAND':
					type = '二手房房源';
					break;
				case 'TENANCY':
					type = '租房房源';
					break;
				case 'RESIDENTIAL_QUARTERS':
					type = '小区房源';
					break;
				default:
			}
			if (data.houseId) {
				id = data.houseId;
				title = type;
			} else {
				id = data.id;
				title = this.data.title;
			}
			let item = JSON.stringify({
				'title': title,
				"id": id,
			});
			let agentId = wx.getStorageSync('agentId');
			wx.navigateTo({
				url: `/combination/pages/listingDetails/index?item=${item}&agentId=${agentId}&showInfo=true`,
			});
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function (res) {
		let item = {};
		let title = '';
		let agentId = wx.getStorageSync('agentId');
		let houseMold = this.data.detailsData['item'].houseMold;
		switch (houseMold) {
			case 'RESIDENTIAL_QUARTERS':
				title = '小区房源';
				break;
			case 'ESTATE':
				title = '新房房源';
				break;
			case 'SECOND_HAND':
				title = '二手房房源';
				break;
			case 'TENANCY':
				title = '租房房源';
				break;
			default:
				break;
		}
		item.title = title;
		item.id = this.data.detailsData.item['houseId'];
		console.log(item)
		console.log(this.data.detailsData.item);
		if(res.from === 'button'){
			return{
				title: this.data.detailsData.item['title'],
				path: '/combination/pages/listingDetails/index?item='+JSON.stringify(item)+'&showInfo=true&'+'agentId='+agentId+'&hideBack=true',
				imageUrl: this.data.detailsData.item['coverPicture']
			}
		}

	}
})
