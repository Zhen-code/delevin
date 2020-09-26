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
	pageTotal: 0,
	scrollTop() {
		wx.pageScrollTo({
			scrollTop: 0
		})
	},

	topList() {
		this.setData({
			pageIndex: 1,
			triggered: false,
		});
		this.getData()
	},

	//滚动加载
	scrollList() {
		let {pageIndex} = this.data;
		pageIndex++;
		if(pageIndex>this.pageTotal){
			this.setData({
				toBottom: true
			})
		}else{
			this.setData({
				pageIndex
			});
			this.getData();
		}
	},

	getData() {
		http({
			url: api.operation.visitorList,
			method: 'GET',
			params:{
				pageIndex: this.data.pageIndex,
				pageSize: this.data.pageSize
			}
		}).then(res=>{
			console.log(res)
			let {item} = this.data;
			if(res.total>12){
				this.setData({
					item: [...item,...res.list],
					toBottom: false
				});
			}else{
				this.setData({
					item: [...item,...res.list]
				});
			}
			this.pageTotal = res.pageTotal;
		}).catch(err=>{
			console.log(err);
		})

	},

	dialNumber(e) {
		console.log(e)
		wx.makePhoneCall({
			phoneNumber: '17620835317'
		})
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