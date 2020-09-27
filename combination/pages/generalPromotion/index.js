// combination/pages/generalPromotion/index.js
const {
	request
} = require('../../../request/request.js');
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
		id:'',
		price:0,
		list:[],
		pageIndex:1,
		pageSize:12,
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
			list:[],
			tebIndex:'',
			index:index,
		},()=>{
			this.getData()
		})
	},

	changeItem(e){
		let item = e.currentTarget.dataset.item
		let tebIndex = e.currentTarget.dataset.index;
		this.setData({
			id:item.id,
			price:item.discountPrice,
			tebIndex:tebIndex,
		})
	},

	getData(){
		let requests = '';
		if(this.data.index === 0){
			requests = request.portLsit;
		}else{
			requests = request.snatchLsit;
		}
		requests({
			"pageIndex":this.data.pageIndex,
			"pageSize":this.data.pageSize,
		}).then((res) => {
			this.setData({
				list:res.list
			})
		}).catch((err) => {
			wx.showToast({
				title: '请求失败',
				icon: 'none',
				duration: 2500
			})
		})
	},

	submitOrder(){
		request.submitOrder({
			"id": this.data.id,
			"setMealType": this.data.index === 0?"PORT_SET_MEAL":"SNATCH_SET_MEAL",
		}).then((res)=>{
			let orderNum = res.orderNum;
			request.wxPay({
				"orderNum": orderNum,
				"payMethod": "WX"
			}).then((res)=>{
				let payInfo = JSON.parse(res.payInfo)
				let wxPayResult = JSON.parse(payInfo.wxPayResult)
				wx.requestPayment({
					'timeStamp': payInfo.timeStamp,
					'nonceStr': wxPayResult.nonceStr,
					'package': 'prepay_id=' + wxPayResult.prepayId,
					'signType': 'MD5',
					'paySign': payInfo.sign,
					'success': function (res) {
						wx.reLaunch({
							url: '/combination/pages/myPackage/index',
						})
					},
					'fail': function (res) {
						console.log('支付失败');
						wx.showToast({
							title: '支付失败',
							icon: 'none',
							duration: 2500
						})
						return;
					},
				})
			}).catch((err)=>{
				console.log(err)
				wx.showToast({
					title: '请求失败',
					icon: 'none',
					duration: 2500
				})
			})
		}).catch((err)=>{
			console.log(err)
			wx.showToast({
				title: '请求失败',
				icon: 'none',
				duration: 2500
			})
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getData();
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