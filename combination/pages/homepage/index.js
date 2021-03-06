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
const app = getApp();
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
		userId: "",
		userInfo: {},
		list: [],
		backHome:false,
		pageHome:true,
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

	toPhone(e) {
		let phone = e.currentTarget.dataset.item;
		this.getPhone(phone)
	},

	getPhone(phone) {
		request.bindPhone({
			bindPhone: phone
		}).then((res) => {
			console.log(res)
			wx.makePhoneCall({
				phoneNumber: res.phone
			})
		}).catch((err) => {
			wx.showToast({
				title: err.data.msg || '请求失败',
				icon: 'none',
				duration: 2500
			})
		})
	},

	getBrokerHouse() {
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
		http({
			url: '/api/access/v1/user/member/visitors/add',
			method: 'POST',
			params: {
				"intervieweeId": this.data.userId,
				"type": "PERSONAL_HOMEPAGE"
			}
		}).then(res => {
			console.log(res)
		}).catch(err => {
			console.log(err)
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (options.q) {
			let qrUrl = decodeURIComponent(options.q);
			let splitArray = qrUrl.split('?');
			let paramsArray = splitArray[1].split('&');
			let agentId = (paramsArray[0].split('='))[1];
			let userId = (paramsArray[1].split('='))[1];
			this.setData({
				agentId: agentId,
				userId: userId
			});
		} else {
			console.log(options.agentId)
			console.log('经纪人id');
			this.setData({
				agentId: options.agentId,
				userId: options.userId
			});
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
		// this.getBrokerHouse();
		this.addRecordHome();
		this.getData();
		this.getBrokerHouse();
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
