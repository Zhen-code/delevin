// combination/pages/recording/index.js
const {
	request
} = require('../../../request/request.js');
const topHeight = require('../../../request/topHeight.js').topHeight;
const {
	http
} = require('../../../request/http');
const {
	api
} = require('../../../request/api');
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
		tabItem: ['房源访客', '推送客源', '待抢客源', '已抢客源'],
		item: [],
		pageIndex: 1,
		pageSize: 12,
		scrollTop: 0,
		triggered: false,
		tabIndex: 0,
		snatchList: [],
		watiCustomerList: [],
		pushCustomer: [],
		selectType:[],
	},

	scrollTop() {
		wx.pageScrollTo({
			scrollTop: 0
		})
	},

	topList() {
		this.setData({
			triggered: false,
		},()=>{
			this.selectType(this.data.tabIndex)
		})
	},

	scrollList() {
		this.selectType(this.data.tabIndex)
	},

	dialNumber() {
		wx.makePhoneCall({
			phoneNumber: '17620835317'
		})
	},

	getTabValue(e) {
		this.setData({
			pageIndex:1,
		},()=>{
			this.selectType(e.detail)
		})
	},

	selectType(index){
		this.setData({
			item:[],
			snatchList: [],
			watiCustomerList: [],
			pushCustomer: [],
			selectType:[],
			tabIndex: index,
		})
		switch (index) {
			case 0:
				this.getVisitorList()
				break;
			case 1:
				this.getPushCustomer();
				break;
			case 2:
				this.getWaitCustom();
				break;
			case 3:
				this.getSnatchList();
				break;
			default:
				break;
		}
	},

	buy() {
		wx.showModal({
			title: '客源管理',
			content: '本功能需要购买抢客套餐，是否前往购买？',
			showCancel: true,
			cancelText: "取消",
			confirmText: "去付费",
			success(res) {
				if (res.confirm) {
					console.log(res, 111)
				} else {
					console.log(res, 222)
				}
			}
		})
	},

	confirm() {
		wx.showModal({
			title: '客源管理',
			content: '本操作需要消耗1次抢客次数，是否确认抢客？',
			showCancel: true,
			cancelText: "取消",
			confirmText: "确定抢客",
			success(res) {
				if (res.confirm) {
					console.log(res, 111)
				} else {
					console.log(res, 222)
				}
			}
		})
	},

	getSnatchList() {
		http({
			url: api.broker.snatchCustomerList,
			method: 'GET',
			params: {
				pageIndex: 1,
				pageSize: 1000
			}
		}).then(res => {
			console.log(res)
			this.setData({
				snatchList: res.list || [],
				selectType:res.list,
			})
		}).catch(err => {
			console.log(err);
		})
	},

	getWaitCustom() {
		http({
			url: api.broker.watiCustomerList,
			method: 'GET',
			params: {
				pageIndex: 1,
				pageSize: 1000
			}
		}).then(res => {
			console.log(res);
			this.setData({
				watiCustomerList: res.list,
				selectType:res.list,
			})
		}).catch(err => {
			console.log(err)
		})
	},

	getPushCustomer() {
		http({
			url: api.broker.pushCustomerList,
			method: 'GET',
			params: {
				pageIndex: 1,
				pageSize: 1000
			}
		}).then(res => {
			console.log(res)
			this.setData({
				pushCustomer: res.list,
				selectType:res.list,
			})
		}).catch(err => {
			console.log(err);
		})
	},

	getVisitorList() {
		request.visitorsList({
			"pageIndex": this.data.pageIndex,
			"pageSize": this.data.pageSize
		}).then((res) => {
			console.log(res)
			let data = this.data.item
			data.push(...res)
			this.setData({
				item: data,
				selectType:data,
				pageIndex: this.data.pageIndex + 1,
			})
		}).catch((err) => {
			console.log(err)
			wx.showToast({
				title: '请求错误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	goHouseDetail(e) {
		let {
			id,
			housetype
		} = e.currentTarget.dataset;
		console.log(e)
		let type = '';
		switch (housetype) {
			case 'ESTATE':
				type = "新房房源";
				break;
			case 'SECOND_HAND':
				type = "二手房房源";
				break;
			case 'TENANCY':
				type = "租房房源";
				break;
			case 'RESIDENTIAL_QUARTERS':
				type = "小区房源";
				break;
			default:
				break;
		}
		let item = JSON.stringify({
			'title': type,
			"id": id
		});
		wx.navigateTo({
			url: `/combination/pages/listingDetails/index?item=${item}`,
		});
	},

	getCustomer(e) {
		console.log(e);
		let id = e.currentTarget.dataset.memberid;
		http({
			url: api.broker.snatchCustomer,
			method: 'POST',
			params: {
				id: id
			}
		}).then(res => {
			console.log(res);
			wx.showToast({
				title: '抢客成功!',
				icon: "none",
				duration: 1000
			});
			this.getWaitCustom();
		}).catch(err => {
			console.log(err)
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getVisitorList();
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