// combination/pages/map/index.js
const topHeight = require('../../../request/topHeight.js').topHeight
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		paddingTop:topHeight,
		bgColor: {
      "color": true,
      "border": true,
		},
		itemIndex:0,
		list:[
			{
				"title":"银行",
				"unCheckImgUrl": "/combination/image/mapTab/icon_bank_nor@2x.png",
				"checkedImgUrl": "/combination/image/mapTab/icon_bank_pre@2x.png",
			},
			{
				"title":"公交",
				"unCheckImgUrl": "/combination/image/mapTab/icon_bus_nor@2x.png",
				"checkedImgUrl": "/combination/image/mapTab/icon_bus_pre@2x.png",
			},
			{
				"title":"地铁",
				"unCheckImgUrl": "/combination/image/mapTab/icon_train_nor@2x.png",
				"checkedImgUrl": "/combination/image/mapTab/icon_train_pre@2x.png",
			},
			{
				"title":"教育",
				"unCheckImgUrl": "/combination/image/mapTab/icon_education_nor@2x.png",
				"checkedImgUrl": "/combination/image/mapTab/icon_education_pre@2x.png",
			},
			{
				"title":"医疗",
				"unCheckImgUrl": "/combination/image/mapTab/icon_medical_nor@2x.png",
				"checkedImgUrl": "/combination/image/mapTab/icon_medical_pre@2x.png",
			},
			{
				"title":"购物",
				"unCheckImgUrl": "/combination/image/mapTab/icon_shop_nor@2x.png",
				"checkedImgUrl": "/combination/image/mapTab/icon_shop_pre@2x.png",
			},
			{
				"title":"餐饮",
				"unCheckImgUrl": "/combination/image/mapTab/icon_eat_nor@2x.png",
				"checkedImgUrl": "/combination/image/mapTab/icon_eat_pre@2x.png",
			}
		]
	},
	tabItem(e){
		this.setData({
			itemIndex:e.currentTarget.dataset.index
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