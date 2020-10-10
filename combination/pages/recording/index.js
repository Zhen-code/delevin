// combination/pages/recording/index.js
const topHeight = require('../../../request/topHeight.js').topHeight;
const {http} = require('../../../request/http');
const {api} = require('../../../request/api');
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
		item: [],
		pageIndex: 1,
		pageSize: 12,
		scrollTop: 0,
		triggered: false,
		toBottom: true
	},
	pageTotal: 1,
	scrollTop() {
		wx.pageScrollTo({
			scrollTop: 0
		})
	},

	topList() {
		this.setData({
			pageIndex: 1,
			triggered: false,
			item: []
		});
		this.getData()
	},

	//滚动加载
	scrollList() {
		let {pageIndex} = this.data;
		if(pageIndex>this.pageTotal){
			this.setData({
				toBottom: true
			})
		}else{
			this.getData();
		}
	},

	getData() {
		let {item,pageIndex} = this.data;
		http({
			url: api.operation.visitorList,
			method: 'GET',
			params:{
				pageIndex: this.data.pageIndex,
				pageSize: this.data.pageSize,
			}
		}).then(res=>{
			console.log(res)
			this.pageTotal = res.pageTotal;
				this.setData({
					item: [...item,...res.list],
					pageIndex: pageIndex+1
				});
		}).catch(err=>{
			console.log(err);
		})

	},

	dialNumber(e) {
		console.log(e)
		let {phone,dialing} = e.currentTarget.dataset;
		if(dialing==="YES"){
			wx.makePhoneCall({
				phoneNumber: phone
			})
		}else{
			wx.showModal({
				title: '套餐购买',
				content: '当前需要购买相应套餐，是否前往?',
				cancelText: '取消',
				showCancel: true,
				confirmText: '确定',
				success(res){
					if(res.confirm){
						wx.navigateTo({
							url: '/combination/pages/generalPromotion/index'
						})
					}else{
						wx.showToast({
							title: '请先购买套餐'
						})
					}
				}
			})
		}
		// request.getPhome().then((res) => {

		// }).catch((err) => {
		// 	wx.showToast({
		// 		title: err,
		// 		icon: 'none',
		// 		duration: 2500
		// 	})
		// })
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
		this.getData();
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
