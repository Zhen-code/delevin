// combination/pages/homepage/index.js
const {
	request
} = require('../../../request/request.js');
const topHeight = require('../../../request/topHeight.js').topHeight
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		top:0,
		paddingTop: topHeight,
		bgColor: {
			"color": false,
			"border": false,
		},
		agentId:"",
		userInfo: {},
	},

  onPageScroll(e) {
    this.setData({
      top: Number(e.scrollTop)
    })
	},
	
	getData(){
		request.brokerHome({
			"agentId":this.data.agentId
		}).then((res)=>{
			this.setData({
				userInfo:res
			})
		}).catch((err)=>{
			wx.showToast({
				title: '请求失败',
				icon: 'none',
				duration: 2500
			})
		})
	},

	toPhone(e){
		let phone = e.currentTarget.dataset.item;
		wx.makePhoneCall({
			phoneNumber: phone
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options,111)
		this.setData({
			agentId:options.agentId,
		},()=>{
			this.getData()
		})
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