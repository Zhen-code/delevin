// combination/pages/broker/index.js
const topHeight = require('../../../request/topHeight.js').topHeight
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		paddingTop: topHeight,
		bgColor: {
			"color": true,
			"border": true
		},
		show: false,
		mechanism: "",
		name: "",
		jobNumber: "",
		phone: "",
		code: "",
		counting: true,
		code_msg: "获取验证码",
		icon:"close",
	},

	showPopup() {
		this.setData({
			show: true
		});
	},

	onClose() {
		this.setData({
			show: false
		});
	},

	getInputValue(e) {
		this.setData({
			[`${e.currentTarget.dataset.model}`]: e.detail.value,
		});
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
				this.countDown(this, 60)
				wx.showToast({
					title: '验证码已发送',
					icon: 'success',
					duration: 2500
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