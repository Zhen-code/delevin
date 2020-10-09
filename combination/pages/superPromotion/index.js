// combination/pages/superPromotion/index.js
const app = getApp()
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
		title: '',
		advertising: '',
		specs: '',
		itemValue: '',
		itemIndex: '',
		list: [],
		pageSize: 12,
		pageIndex: 1,
		num: 1,
		item: [],
		info: {},
		price: 0,
	},

	getInputValue(e) {
		let model = e.currentTarget.dataset.model
		this.setData({
			[`${model}`]: e.detail.value
		})
	},

	onChange(event) {
		this.setData({
			num: event.detail
		}, () => {
			this.getSuperCalculation();
		})
	},

	onClose(e) {
		let item = this.data.item;
		let index = e.currentTarget.dataset.index;
		item[index].checked = false;
		let list = item.filter(item => {
			return item.checked === true
		})
		this.setData({
			item: list,
		});
	},

	itemType(e) {
		console.log(e.detail.value)
		let value = Math.floor(Number(e.detail.value));
		// console.log(value % 100)
		console.log(value)
		this.setData({
			itemIndex: -1,
			itemValue: value,
			specs: value,
		}, () => {
			this.getSuperCalculation();
		})
	},

	tabItem(e) {
		if (e.currentTarget.dataset.item !== undefined) {
			this.setData({
				itemValue: '',
				specs: Number(e.currentTarget.dataset.item.specs),
				itemIndex: e.currentTarget.dataset.index
			})
		} else {
			this.setData({
				itemValue: '',
				specs: '',
				itemIndex: e.currentTarget.dataset.index
			})
		}
		if (this.data.specs !== '') {
			this.getSuperCalculation();
		}
	},

	getSuperCalculation() {
		request.superCalculation({
			"buyQuantity": this.data.num,
			"specs": this.data.specs,
		}).then((res) => {
			this.setData({
				price: res.totalPrice
			})
		}).catch((err) => {
			console.log(err)
			wx.showToast({
				title: '数据错误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	toSelectPromotion() {
		if(this.data.item.length >= 20){
			wx.showToast({
				title: '房源最多可选择20个',
				icon: 'none',
				duration: 2500
			})
		}else{
			app.globalData.selectPromotion = [];
			wx.navigateTo({
				url: '/combination/pages/selectPromotion/index',
			})
		}
	},

	getData() {
		request.superPromotion({
			"pageSize": this.data.pageSize,
			"pageIndex": this.data.pageIndex,
		}).then((res) => {
			this.setData({
				item:[],
				list: res.list,
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

	submit() {
		let {
			info,
			title,
			item,
			advertising,
			specs,
			num,
		} = this.data;
		let _this = this;
		let data = {
			"advertLanguage": advertising,
			"buyQuantity": num,
			"houseId": info.houseId,
			"houseType": info.houseMold,
			"launchExtension": item.map((item) => {
				return {
					"houseId": item.id,
					"houseType": item.houseType,
				};
			}),
			"specs": specs,
		}
		request.superSubmitOrder(data).then((res) => {
			let orderNum = res.orderNum;
			request.wxPay({
				"orderNum": orderNum,
				"payMethod": "WX"
			}).then((res) => {
				let payInfo = JSON.parse(res.payInfo)
				let wxPayResult = JSON.parse(payInfo.wxPayResult)
				wx.requestPayment({
					'timeStamp': payInfo.timeStamp,
					'nonceStr': wxPayResult.nonceStr,
					'package': 'prepay_id=' + wxPayResult.prepayId,
					'signType': 'MD5',
					'paySign': payInfo.sign,
					'success': function (res) {
						console.log('支付成功');
						let index = 2;
						_this.setData({
							title: '',
							advertising: '',
							specs: '',
							itemValue: '',
							itemIndex: '',
							list: [],
							pageSize: 12,
							pageIndex: 1,
							num: 1,
							item: [],
							info: {},
							price: 0,
						}, () => {
							wx.reLaunch({
								url: '/combination/pages/myPackage/index?index=' + index,
							})
						})
					},
					'fail': function (res) {
						console.log('支付失败');
						wx.showToast({
							title: '支付失败',
							icon: 'none',
							duration: 2500
						})
						return;
					},
				})
			}).catch((err) => {
				console.log(err)
				wx.showToast({
					title: '请求失败',
					icon: 'none',
					duration: 2500
				})
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

	privacyPolicy() {
    request.link({
      'type': 'SUPER_PROMOTION_PACKAGE_DESCRIPTION'
    }).then((res) => {
      let item = JSON.stringify({
        "title": "超级推广套餐说明",
        "link": res.link,
      })
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

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let item = JSON.parse(options.item)
		if (item) {
			this.setData({
				info: item,
				item:[],
			}, () => {
				this.getData();
			})
		}
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
		let item = this.data.item;
		let selectPromotion = app.globalData.selectPromotion;
		// 这里需要做个数组过滤的功能
		if (selectPromotion !== 0) {
			item.push(...selectPromotion)
			this.setData({
				item: item.slice(0,20),
			})
		}
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