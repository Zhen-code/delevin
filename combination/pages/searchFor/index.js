// pages/searchFor/searchFor.js
const Notify = require('../../miniprogram_npm/@vant/weapp/notify/notify');
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		val: '',
		data: [],
		list: [],
		popular:[],
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
			// url: `../searchClass/searchClass?title=${e.detail.val}`,
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
			// wx.navigateTo({
			// 	url: `../searchClass/searchClass?title=${e.detail.val}`,
			// })
			wx.setStorageSync('list', this.data.list)
		} else {
			Notify.default({
				type: 'warning',
				message: '请输入内容！'
			});
		}
	},

	changeTap(e) {
		this.setData({
			val: e.target.dataset.text,
		})
		// wx.navigateTo({
		// 	url: `../searchClass/searchClass?title=${e.target.dataset.text}`,
		// })
	},

	changePopular(e) {
		this.setData({
			val: e.target.dataset.text,
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

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.setNavigationBarTitle({
			title: '搜索商品'
		});
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