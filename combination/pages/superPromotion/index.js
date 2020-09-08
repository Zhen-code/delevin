// combination/pages/superPromotion/index.js
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
		show: {
			primary: true,
			success: true,
		},
		itemValue:'',
		itemIndex:'',
	},
	
	onChange(event) {
    console.log(event.detail);
  },

	onClose(event) {
		this.setData({
			[`show.${event.target.id}`]: false,
		});
	},

	tabItem(e){
		if(e.detail.value !== undefined){
			this.setData({
				itemValue:e.detail.value,
				itemIndex:e.currentTarget.dataset.index
			})
		}else{
			this.setData({
				itemIndex:e.currentTarget.dataset.index
			})
		}
	},

	toSelectPromotion(){
		wx.navigateTo({
			url: '/combination/pages/selectPromotion/index',
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