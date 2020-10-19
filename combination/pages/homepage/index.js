// combination/pages/homepage/index.js
const {
	request
} = require('../../../request/request.js');
const topHeight = require('../../../request/topHeight.js').topHeight;
const {
	http
} = require('../../../request/http');
const {
	api
} = require('../../../request/api');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		top: 0,
		paddingTop: topHeight,
		bgColor: {
			"color": false,
			"border": false,
		},
		agentId: "",
		userInfo: {},
		list: [],
		backHome:true,
		pageHome:false,
	},

	onPageScroll(e) {
		this.setData({
			top: Number(e.scrollTop)
		})
	},

	getData() {
		request.brokerHome({
			"agentId": this.data.agentId
		}).then((res) => {
			this.setData({
				userInfo: res
			})
		}).catch((err) => {
			wx.showToast({
				title: '请求失败',
				icon: 'none',
				duration: 2500
			})
		})
	},

	getLsit() {
		request.brokerList({
			"agentId": this.data.agentId
		}).then((res) => {
			this.setData({
				list: res
			})
		}).catch((err) => {
			wx.showToast({
				title: '请求失败',
				icon: 'none',
				duration: 2500
			})
		})
	},

	toPhone(e) {
		let phone = e.currentTarget.dataset.item;
		wx.makePhoneCall({
			phoneNumber: phone
		})
	},

	getBrokerHouse() {
		http({
			url: api.broker.houseAroundList(this.data.agentId),
			method: 'GET',
		}).then(res => {
			this.setData({
				list: res
			});
		}).catch(err => {
			console.log(err.data.code)
			if (err.data.code === 500) {
				wx.navigateTo({
					url: "/pages/login/index"
				})
			}
		})
	},

	goHouseDetail(e) {
		let type = '';
		let {
			houseId,
			status,
			houseMold
		} = e.currentTarget.dataset.item;
		if (status === 'LOWER') {
			wx.showToast({
				title: '该房源已下架！',
				icon: 'none',
				duration: 2000
			})
		} else {
			switch (houseMold) {
				case 'ESTATE':
					type = "新房房源";
					break;
				case 'SECOND_HAND':
					type = "二手房房源";
					break;
				case 'TENANCY':
					type = "租房房源";
					break;
				case 'RESIDENTIAL_QUARTERS':
					type = "小区房源";
					break;
				default:
					break;
			}
			let item = JSON.stringify({
				'title': type,
				"id": houseId
			});
			wx.navigateTo({
				url: `/combination/pages/listingDetails/index?item=${item}`,
			});
		}
	},

	addRecordHome() {
		let id = wx.getStorageSync('userId') || '';
		http({
			url: '/api/access/v1/user/member/visitors/add',
			method: 'POST',
			params: {
				"intervieweeId": id,
				"type": "PERSONAL_HOMEPAGE"
			}
		}).then(res => {
			// console.log(res)
		}).catch(err => {
			console.log(err)
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (options.q) {
			let qrUrl = decodeURIComponent(options.q)
			let value = qrUrl.split("/")[3].split("?")[0];
			let agentId = qrUrl.split("=")[1];
			let item = JSON.stringify({
				'name': value,
				'agentId': agentId,
			})
			wx.setStorageSync('homePage', item)
		} else {
			this.setData({
				agentId: options.agentId,
			}, () => {
				this.getData();
				this.getLsit();
				wx.removeStorageSync('homePage')
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
		this.getBrokerHouse();
		this.addRecordHome()
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
