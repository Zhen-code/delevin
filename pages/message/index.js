const {
	request
} = require('../../request/request')
const topHeight = require('../../request/topHeight.js').topHeight
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		paddingTop: topHeight,
		bgColor: {
			"color": true,
			"border": false
		},
		list: [],
		pageIndex: 1,
		pageSize: 12,
		scrollTop: 0,
		triggered: false,
	},
	pageTotal: 0,

	scrollTop() {
		wx.pageScrollTo({
			scrollTop: 0
		})
	},

	topList() {
		this.setData({
			triggered: false,
			pageIndex: 1,
			list: []
		});
		this.getData()
	},

	//滚动加载
	scrollList() {
		if(this.data.pageIndex<=this.pageTotal){
			this.getData();
		}else{
			wx.showToast({
				title: '暂无更多消息!',
				icon: "none",
				duration: 1000
			})
		}
	},
	getData() {
		request.messageList({
			"pageSize": this.data.pageSize,
			"pageIndex": this.data.pageIndex,
		}).then((res) => {
			this.pageTotal = res.pageTotal;
			let list = this.data.list;
			let newList = res.list.map(v=>{
				v.details = v.details.replace(/(\n)/g, "");
				v.details = v.details.replace(/(\t)/g, "");
				v.details = v.details.replace(/(\r)/g, "");
				v.details = v.details.replace(/<\/?[^>]*>/g, "");
				v.details = v.details.replace(/\s*/g, "");
				return v;
			});
			list.push(...newList);
			console.log(list)
			this.setData({
				list: list,
				pageIndex: this.data.pageIndex + 1,
			})
		}).catch((err) => {
			wx.showToast({
				title: '请求失败',
				icon: 'none',
				duration: 2500
			})
		})
	},

	toMessageDetails(e) {
		let id = e.currentTarget.dataset.item.id;
		wx.navigateTo({
			url: `/combination/pages/message/index?id=${id}`,
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getData()
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