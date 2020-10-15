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
		toBottom: true,
		req: ''
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
		if(this.data.req === "house"){
			this.getHouseRecord(this.data.houseid, this.data.type);
		}else if(this.data.req === "allRecord"){
			this.getData();
		}
	},

	//滚动加载
	scrollList() {
		let {pageIndex} = this.data;
		if(pageIndex>this.pageTotal){
			this.setData({
				toBottom: true
			})
		}else if(this.data.req === "house"){
			this.getHouseRecord(this.data.houseid, this.data.type);
		}else if(this.data.req === "allRecord"){
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
			let list = res.list.map(v=>{
				v.createDate = v.createDate.replace(/T/g," ");
				return v
			});
			console.log(list)
			this.pageTotal = res.pageTotal;
				this.setData({
					item: [...item,...list],
					pageIndex: pageIndex+1
				});
		}).catch(err=>{
			console.log(err);
		})

	},
	getHouseRecord(houseId,houseType) {
		let {item,pageIndex} = this.data;
		http({
			url: api.operation.visitorList,
			method: 'GET',
			params:{
				pageIndex: this.data.pageIndex,
				pageSize: this.data.pageSize,
				houseId: houseId,
				houseType: houseType,
				type: 'HOUSE'
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
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options)
		let {houseid, type, req} = options;
		this.setData({
			req,
			houseid,
			type
		});
		if(req === "house"){
			this.getHouseRecord(houseid,type);
		}else if(req === "allRecord"){
			this.getData();
		}
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
