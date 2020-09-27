// combination/pages/myPackage/index.js
const {
	request
} = require('../../../request/request.js');
const topHeight = require('../../../request/topHeight.js').topHeight
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		paddingTop:topHeight,
		bgColor: {
      "color": true,
      "border": false,
		},
		show:false,
		index:0,
		tabItem: ['端口套餐', '抢客套餐', '超级推广套餐'],
		item: [],
		pageIndex: 1,
		pageSize: 12,
		setMealType:'PORT_SET_MEAL',
		scrollTop: 0,
		triggered: false,
	},

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

	scrollTop() {
		wx.pageScrollTo({
			scrollTop: 0
		})
	},

	topList() {
		this.setData({
			triggered: false,
		})
		this.getData()
	},

	//滚动加载
	scrollList() {
		this.getData()
	},

	getbackTabIndex(e){
		let setMealType = '';
		let index = e.detail;
		if(index === 0){
			setMealType = 'PORT_SET_MEAL'
		}else if(index === 1){
			setMealType = 'SNATCH_SET_MEAL'
		}else{
			setMealType = 'EXTENSION_SET_MEAL'
		}
		this.setData({
			item:[],
			setMealType,
			pageIndex:1,
			index:e.detail
		},()=>{
			this.getData()
		})
	},
	
	getData() {
		request.myPackageList({
			"pageSize":this.data.pageSize,
			"pageIndex":this.data.pageIndex,
			"setMealType":this.data.setMealType,
		}).then((res)=>{
			let item = this.data.item;
			item.push(...res.list)
			this.setData({
				item: item,
				pageIndex: this.data.pageIndex + 1,
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
		if(Number(options.index) === 2){
			this.setData({
				index:2,
				setMealType:'EXTENSION_SET_MEAL',
			},()=>{
				this.getData();
			})
		}
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