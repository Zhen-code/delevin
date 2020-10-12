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
	pageTotal: 1,
	scrollTop() {
		wx.pageScrollTo({
			scrollTop: 0
		})
	},

	topList() {
		this.pageTotal = 1;
		this.setData({
			triggered: false,
			item:[],
			snatchList: [],
			watiCustomerList: [],
			pushCustomer: [],
			selectType:[],
			pageIndex: 1
		},()=>{
			this.selectType(this.data.tabIndex)
		})
	},

	scrollList() {
		let pageIndex = this.data.pageIndex+1;
		this.setData({
			pageIndex
		});
		this.selectType(this.data.tabIndex);
	},

	dialNumber(e) {
		let {phone,dialing} = e.currentTarget.dataset;
		console.log(dialing)
		if(dialing==="NO"){
			wx.showModal({
				title: '请先购买客源套餐',
				content: '是否前往购买?',
				showCancel: true,
				cancelText: '取消',
				confirmText: '购买',
				success(res){
					if(res.confirm){
						wx.navigateTo({
							url: '/combination/pages/generalPromotion/index'
						});
					}else if(res.cancel){

					}
				}
			});
		}else{
			wx.makePhoneCall({
				phoneNumber: phone
			})
		}
	},

	getTabValue(e) {
		this.pageTotal = 1;
		this.setData({
			pageIndex:1,
			item:[],
			snatchList: [],
			watiCustomerList: [],
			pushCustomer: [],
			selectType:[]
		},()=>{
			this.selectType(e.detail)
		})
	},

	selectType(index){
		this.setData({
			tabIndex: index
		});
		switch (index) {
			case 0:
				this.getVisitorList();
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

	// buy() {
	// 	wx.showModal({
	// 		title: '客源管理',
	// 		content: '本功能需要购买抢客套餐，是否前往购买？',
	// 		showCancel: true,
	// 		cancelText: "取消",
	// 		confirmText: "去付费",
	// 		success(res) {
	// 			if (res.confirm) {
	// 				console.log(res, 111)
	// 			} else {
	// 				console.log(res, 222)
	// 			}
	// 		}
	// 	})
	// },

	confirm(e) {
		let that = this;
		let id = e.currentTarget.dataset.memberid;
		let snatch = e.currentTarget.dataset.snatch;
		if(snatch === "NO"){
			wx.showModal({
				title: '本功能需要购买套餐',
				content: '是否前往购买?',
				cancelText: '取消',
				confirmText: '去付费',
				showCancel: true,
				success(res){
					if(res.confirm){
						wx.navigateTo({
							url: '/combination/pages/generalPromotion/index'
						})
					}else{
						wx.showToast({
							title: '请先购买套餐',
							icon: "none",
							duration: 1000
						})
					}
				}
			})
		}else{
			wx.showModal({
				title: '客源管理',
				content: '本操作需要消耗1次抢客次数，是否确认抢客？',
				showCancel: true,
				cancelText: "取消",
				confirmText: "确定抢客",
				success(res) {
					if (res.confirm) {
						that.getCustomer(id);
					} else {
						console.log(res, 222)
					}
				}
			})
		}

	},
	getCustomer(id) {
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
			wx.showModal({
				title: '套餐购买',
				content: '抢客余量不足,是否前往购买?',
				showCancel: true,
				cancelText: '取消',
				confirmText: '购买',
				success(res){
					if(res.confirm){
						wx.navigateTo({
							url: '/combination/pages/generalPromotion/index'
						})
					}else{
						wx.showToast({
							title:'请先购买套餐',
							icon: "none",
							duration: 1000
						})
					}
				}
			})
			console.log(err)
		})
	},

	getSnatchList() {
		let {pageIndex,pageSize,snatchList} = this.data;
		http({
			url: api.broker.snatchCustomerList,
			method: 'GET',
			params: {
				pageIndex: pageIndex,
				pageSize: pageSize
			}
		}).then(res => {
			console.log(res)
			this.pageTotal = res.pageTotal;
			this.setData({
				snatchList: [...res.list,...snatchList],
				selectType: [...res.list,...snatchList],
			})
		}).catch(err => {
			console.log(err);
		})
	},

	getWaitCustom() {
		let {pageIndex,pageSize,watiCustomerList} = this.data;
		http({
			url: api.broker.watiCustomerList,
			method: 'GET',
			params: {
				pageIndex: pageIndex,
				pageSize: pageSize
			}
		}).then(res => {
			console.log(res);
			this.pageTotal = res.pageTotal;
			let {pageIndex,pageSize,pushCustomer} = this.data;
			if(pageIndex>this.pageTotal){
				wx.showToast({
					title:'暂无更多数据',
					icon:"none",
					duration:1000
				});
				return
			}
			this.setData({
				watiCustomerList: [...res.list,...watiCustomerList],
				selectType:[...res.list,...watiCustomerList],
			})
		}).catch(err => {
			console.log(err)
		})
	},

	getPushCustomer() {
		let {pageIndex,pageSize,pushCustomer} = this.data;
		if(pageIndex>this.pageTotal){
			wx.showToast({
				title:'暂无更多数据',
				icon:"none",
				duration:1000
			});
			return
		}
		http({
			url: api.broker.pushCustomerList,
			method: 'GET',
			params: {
				pageIndex: pageIndex,
				pageSize: pageSize
			}
		}).then(res => {
			console.log(res)
			this.pageTotal = res.pageTotal;
			this.setData({
				pushCustomer: [...res.list,...pushCustomer],
				selectType:[res.list,...pushCustomer],
			})
		}).catch(err => {
			console.log(err);
		})
	},

	getVisitorList() {
		let {pageIndex,pageSize,item} = this.data;
		if(pageIndex>this.pageTotal){
			wx.showToast({
				title:'暂无更多数据',
				icon:"none",
				duration:1000
			});
			return
		}
		request.visitorsList({
			pageIndex: pageIndex,
			pageSize: pageSize
		}).then((res) => {
			console.log(res);
			this.pageTotal = res.pageTotal;
			item.push(...res['list']);
			let newData = item.map(v=>{
				return{
					coverUri: v.designSketch,
					sourceType: v.houseMold,
					houseLabel: v.houseLabel,
					salesStatus: v.houseMold==="ESTATE"? v.salesStatus:'',
					unitPrice: v.houseMold==="ESTATE"? v.unitPrice: '',
					averagePrice: v.houseMold==="RESIDENTIAL_QUARTERS"? v.averagePrice: '',
					monthRent: v.houseMold === "TENANCY"? v.monthRent:'',
					houseHall: v.houseHall,
					houseKitchen: v.houseKitchen,
					houseToilet: v.houseToilet,
					title: v.title,
					street: v.street,
					floorage: v.floorage,
					showRegion: true,
					district: v.region,
					region: null,
					houseType: v.houseType,
					houseCount: v.saleCount,
					houseId: v.houseId,
					houseMold: v.houseMold
				}
			});
			this.setData({
				item: newData,
				selectType:newData,
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

	toRecording(e){
		console.log(e)
		let {id,type} = e.currentTarget.dataset;
		wx.navigateTo({
			url: '/combination/pages/recording/index?houseid='+id+'&type='+type+'&req=house'
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
