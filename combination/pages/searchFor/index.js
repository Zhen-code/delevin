// pages/searchFor/searchFor.js
const {
  request
} = require('../../../request/request');
const Notify = require('../../miniprogram_npm/@vant/weapp/notify/notify');
const topHeight = require('../../../request/topHeight.js').topHeight
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		val: '',
		data: [],
		list: [],
		popular: [],
		paddingTop: topHeight,
		bgColor: {
			"color": true,
			"border": false
		},
	},

	firm(e) {
		if (e.detail.val == '') {
			Toast('内容不能为空');
			return
		}
		wx.navigateTo({
			url: `/combination/pages/listings/index?title=${e.detail.val}`,
		})
	},

	search(e) {
		if (e.detail.val) {
			this.data.data.unshift(e.detail.val);
			let data = this.data.data;
			let resultArr;
			resultArr = data.filter(function (item, index, self) {
				return self.indexOf(item) == index;
			});
			this.setData({
				val: '',
				list: resultArr
			})
			wx.setStorageSync('list', this.data.list)
			wx.navigateTo({
				url: `/combination/pages/listings/index?title=${e.detail.val}`,
			})
		} else {
			Notify.default({
				type: 'warning',
				message: '请输入内容！'
			});
		}
	},

	changeTap(e) {
		let text = e.target.dataset.text.keyword || e.target.dataset.text;
		this.data.data.unshift(text);
		let data = this.data.data;
		let resultArr;
		resultArr = data.filter(function (item, index, self) {
			return self.indexOf(item) == index;
		});
		this.setData({
			val: text,
			list: resultArr
		})
		wx.setStorageSync('list', this.data.list)
		wx.navigateTo({
			url: `/combination/pages/listings/index?title=${text}`,
		})
	},

	delete(e) {
		wx.removeStorageSync('list')
		this.setData({
			val: '',
			list: [],
			data: [],
		})
	},

	getData(){
		request.search().then((res)=>{
			this.setData({
				popular: [],
				popular:res
			})
		}).catch((err)=>{
			console.log(err)
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getData();
		var list = wx.getStorageSync('list');
		if (list) {
			this.setData({
				list: list,
				data: list
			})
		} else {
			this.setData({
				list: [],
				data: [],
				val: '',
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