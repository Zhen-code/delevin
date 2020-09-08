// combination/pages/generalPromotion/index.js
const topHeight = require('../../../request/topHeight.js').topHeight
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		paddingTop: topHeight,
		bgColor: {
			"color": false,
			"border": false,
			"titleColor":true
		},
		index:0,
		tebIndex:'',
		actionLeftBgImage1:'/combination/image/btn_black_left@2x.png',
		actionLeftBgImage2:'/combination/image/btn_golden_left@2x.png',
		actionIconLeft1:'/combination/image/icon_fire_16_nor@2x.png',
		actionIconLeft2:'/combination/image/icon_fire_16@2x.png',

		actionRightBgImage1:'/combination/image/btn_black_right.png',
		actionRightBgImage2:'/combination/image/btn_golden_right@2x.png',
		actionIconRight1:'/combination/image/icon_customer_16_nor@2x.png',
		actionIconRight2:'/combination/image/icon_customer_16_pre@2x.png',
	},

	tabItem(e){
		let index = e.currentTarget.dataset.index;
		this.setData({
			index:index
		})
	},

	changeItem(e){
		let tebIndex = e.currentTarget.dataset.index;
		this.setData({
			tebIndex:tebIndex
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