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
		snatchList: [],
		watiCustomerList: [],
		pushCustomer: [],
		selectType:[],
		tabIndex: 0,
		type:'management',
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
		let {phone,dialing,type} = e.currentTarget.dataset;
		console.log(dialing)
		let tipText = (type==='snatch'?'端口':'端口');
		console.log(tipText)
		console.log(7788)
		if(dialing==="NO"){
			wx.showModal({
				title:'',
				content: `本功能需要买${tipText}套餐,是否前往购买?`,
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

	confirm(e) {
		let that = this;
		let id = e.currentTarget.dataset.memberid;
		let snatch = e.currentTarget.dataset.snatch;
		let snatchcustomers = e.currentTarget.dataset.snatchcustomers;
		if(snatch === "NO"){
			wx.showModal({
				title: '',
				content: '本功能需要购买抢客套餐,是否前往购买?',
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
			if(snatchcustomers === 'YES'){
				wx.showModal({
					title: 'TA已经是您的客源',
					content: '本次不消耗抢客次数',
					showCancel: false,
					confirmText: '确定',
					success(res){
						if(res.confirm){
							that.getCustomer(id);
						}
					}
				})
			}else{
				wx.showModal({
					title: '本操作需要消耗1次抢客次数',
					content: '是否确认抢客？',
					showCancel: true,
					cancelText: "取消",
					confirmText: "确认抢客",
					success(res) {
						if (res.confirm) {
							that.getCustomer(id);

						} else {
							console.log(res, 222)
						}
					}
				})
			}
		}

	},
	getCustomer(id) {
		let that = this;
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
				duration: 2000
			});
			that.setData({
				pageIndex: 1,
				watiCustomerList: [],
				selectType:[]
			},()=>{
				that.getWaitCustom();
			});
		}).catch(err => {
			console.log(err);
			wx.showToast({
				title: '抢客失败，请重新再试!',
				icon: "none",
				duration: 1000
			})
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
				snatchList: [...snatchList,...res.list],
				selectType: [...snatchList,...res.list],
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
				watiCustomerList: [...watiCustomerList,...res.list],
				selectType:[...watiCustomerList,...res.list],
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
				pushCustomer: [...pushCustomer,...res.list],
				selectType:[...pushCustomer,...res.list]
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
					houseMold: v.houseMold,
					openingDate:v.openingDate,
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
			housetype,
			dialing
		} = e.currentTarget.dataset;
		console.log(dialing)
		if(dialing === 'NO'){
			wx.showModal({
				content: '本功能需要购买端口套餐,是否前往购买?',
				showCancel: true,
				cancelText: '取消',
				confirmText: '去付费',
				success:(res)=>{
					if(res.confirm){
						wx.navigateTo({
							url: '/combination/pages/generalPromotion/index'
						})
					}
				}
			});
		}else{
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
		}
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
