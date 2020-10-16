// combination/pages/sellHouse/index.js
const {
	request
} = require('../../../request/request');
const topHeight = require('../../../request/topHeight.js').topHeight
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		paddingTop: topHeight,
		bgColor: {
			"color": true,
			"border": false
		},
		backHome:true,
		city: "",
		community: "",
		adddress: "",
		building: "",
		unitType: "",
		area: "",
		floor: "",
		towards: "",
		price: "",
		name: "",
		phone: "",
		code: "",
		counting: true,
		code_msg: "获取验证码",
	},

	getInputValue(e) {
		if (e.detail.value) {
			this.setData({
				[`${e.currentTarget.dataset.model}`]: e.detail.value,
			});
		} else {
			this.setData({
				[`${e.currentTarget.dataset.model}`]: e.detail.value,
			});
		}
	},

	countDown(that, count) {
		if (count == 0) {
			that.setData({
				code_msg: '获取验证码',
				counting: true
			})
			return;
		}
		that.setData({
			counting: false,
			code_msg: count + '秒后重发',
		})
		setTimeout(function () {
			count--;
			that.countDown(that, count);
		}, 1000);
	},

	getCode() {
		if (this.data.phone) {
			if (this.data.counting) {
				request.code({
					'phone': this.data.phone,
				}).then((res) => {
					this.countDown(this, 60)
					wx.showToast({
						title: '验证码已发送',
						icon: 'success',
						duration: 2500
					})
				}).catch((err) => {
					wx.showToast({
						title: '发送失败',
						icon: 'success',
						duration: 2500
					})
				})
			} else {
				wx.showToast({
					title: '请勿重复操作',
					icon: 'none',
					duration: 2500
				})
			}
		} else {
			wx.showToast({
				title: '请输入手机号码！',
				icon: 'none',
				duration: 2500
			})
		}
	},

	submit() {
		let _this = this;
		let then = this.data;
		if (then.city && then.community && then.adddress && then.building && then.unitType && then.area && then.floor && then.towards && then.price && then.name && then.phone && then.code !== '') {
			request.sellHouse({
				"buildingUnit": then.building,
				"city": then.city,
				"code": then.code,
				"detailsAddress": then.adddress,
				"floor": then.floor,
				"floorage": then.area,
				"houseType": then.unitType,
				"nickName": then.name,
				"orientation": then.towards,
				"phone": then.phone,
				"region": then.community,
				"sellingPrice": then.price
			}).then((res) => {
				_this.setData({
					backHome:false,
				},()=>{
					wx.showToast({
						title: '提交成功',
						icon: 'success',
						duration: 2500
					})
				})
			}).catch((err) => {
				console.log(err.data.msg)
				wx.showToast({
					title: err.data.msg,
					icon: 'none',
					duration: 2500
				})
			})
		} else {
			wx.showToast({
				title: '请完善资料',
				icon: 'none',
				duration: 2500
			})
		}
	},

	backHome(){
		wx.switchTab({
			url: '/pages/home/index'
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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