const {
	request
} = require('../../../request/request');
const topHeight = require('../../../request/topHeight.js').topHeight
import uCharts from "../../../utils/u-charts.min.js"
var _self;
var canvaColumn = null;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		paddingTop: topHeight,
		id: '',
		type: '',
		title: "",
		item: '',
		bgColor: {
			"color": true,
			"border": false
		},
		stlectState: false,
		stlectData: "查看更多",
		stlectName: "arrow-down",
		cWidth: '',
		cHeight: '',
		tabItem: ['新房', '二手房'],
		favoritesState: false,
		favoritesIcon: 'star-o',
		favoritesColor: '#cccccc',
		favoritesName: '收藏',
	},

	tovideoImage() {
		let item = JSON.stringify({
			"houseVideo": this.data.item.houseVideo,
			"designSketch": this.data.item.designSketch,
		})
		wx.navigateTo({
			url: `/combination/pages/browsePictures/index?item=${item}`
		})
	},

	toMap() {
		let item = JSON.stringify({
			"latitude": this.data.item.latitude,
			"longitude": this.data.item.longitude,
			"city": this.data.item.city,
			"detailsAddress": this.data.item.detailsAddress,
		})
		wx.navigateTo({
			url: `/combination/pages/map/index?item=${item}`
		})
	},

	changeArrow() {
		let state = this.data.stlectState;
		if (state) {
			this.setData({
				stlectState: false,
				stlectData: "查看更多",
				stlectName: "arrow-down",
			})
		} else {
			this.setData({
				stlectState: true,
				stlectData: "收起",
				stlectName: "arrow-up",
			})
		}
	},

	getTabValue(e) {
		console.log(e.detail)
	},

	getData() {
		let requests = '';
		switch (this.data.title) {
			case '新房房源':
				requests = request.newListingsDetails
				break;
			case '二手房房源':
				requests = request.towListingsDetails
				break;
			case '租房房源':
				requests = request.tenancyListingsDetails
				break;
			case '小区房源':
				requests = request.quartersListingsDetails
				break;
			default:
		}
		requests({
			"houseId": this.data.id,
		}).then((res) => {
			switch (res.decorationStatus) {
				case 'ROUGHCAST':
					res.decorationsStatusType = '毛坯'
					break;
				case 'PAPERBACK':
					res.decorationsStatusType = '简装'
					break;
				case 'CHINESE_DRESS':
					res.decorationsStatusType = '中装'
					break;
				case 'HARDCOVER':
					res.decorationsStatusType = '精装'
					break;
				case 'HAUTE_COUTURE':
					res.decorationsStatusType = '豪装'
					break;
				default:
			};
			switch (res.orientation) {
				case 'NORTH':
					res.orientationType = '北'
					break;
				case 'SOUTH':
					res.orientationType = '南'
					break;
				case 'WEST':
					res.orientationType = '西'
					break;
				case 'EAST':
					res.orientationType = '东'
					break;
				case 'NORTHWEST':
					res.orientationType = '西北'
					break;
					case 'NORTHEAST':
					res.orientationType = '东北'
					break;
				case 'SOUTHWEST':
					res.orientationType = '西南'
					break;
				case 'SOUTHEAST':
					res.orientationType = '东南'
					break;
				case 'EAST_WEST_SOUTH':
					res.orientationType = '东西南'
					break;
				case 'SOUTHEAST_NORTH':
					res.orientationType = '东南北'
					break;
					case 'SOUTHWEST_NORTH':
					res.orientationType = '西南北'
					break;
				case 'EAST_WEST_NORTH':
					res.orientationType = '东西北'
					break;
				case 'SOUTHEAST_NORTHWEST':
					res.orientationType = '东南西北'
					break;
				default:
			};
			res.type = this.data.type;
			let categories = [];
			let seriesData = [];
			if(res.houseHistory){
				res.houseHistory.map((items)=>{
					categories.push(items.dateFor)
					seriesData.push(items.price)
					return items
				})
			}
			if(res.rentHistory){
				res.rentHistory.map((items)=>{
					categories.push(items.dateFor)
					seriesData.push(items.price)
					return items
				})
			}
			if(res.secondHandHistory){
				res.secondHandHistory.map((items)=>{
					categories.push(items.dateFor)
					seriesData.push(items.price)
					return items
				})
			}
			console.log(seriesData,categories)
			this.setData({
				item: res,
				favoritesState: res.collection === 'NO'?false:true,
				favoritesIcon: res.collection === 'NO'?'star-o':'star',
				favoritesColor: res.collection === 'NO'?'#cccccc':'#FFD854',
				favoritesName: res.collection === 'NO'?'收藏':'已收藏',
			})
			let item = {
				houseId: res.id,
				houseMold: this.data.type
			}
			let column = {
				categories: categories,
				series: [{
					name: "房价走势图",
					data: seriesData,
					color: "#FFD200",
					show: true,
					area: [0, 50],
				}]
			};
			this.showColumn(column);
			this.getLikeListings(item);
			this.ahistoryAdd(item);
		}).catch((err) => {
			console.log(err)
			wx.showToast({
				title: '请求失败',
				icon: 'none',
				duration: 2500
			})
		})
	},


	getLikeListings(item) {
		request.likeListings({
			"houseId": item.houseId,
			"houseMold": item.houseMold,
			"pageIndex":1,
			"pageSize":5,
		}).then((res) => {
			this.setData({
				list: res.list
			})
		}).catch((err) => {
			wx.showToast({
				title: '数据有误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	ahistoryAdd(item){
		request.ahistoryAdd({
			"targetId": item.houseId,
			"type": item.houseMold
		}).then((res)=>{	
		}).catch((err)=>{
			console.log(err)
			wx.showToast({
				title: '请求失败',
				icon: 'none',
				duration: 2500
			})
		})
	},

	toHomepage(e) {
		wx.navigateTo({
			url: `/combination/pages/homepage/index?agentId=${e.currentTarget.dataset.item.agentId}`,
		})
	},

	callPheon(e) {
		wx.makePhoneCall({
			phoneNumber: e.currentTarget.dataset.item.phone
		})
	},

	collPhone() {
		let phone = this.data.item.telephone
		wx.makePhoneCall({
			phoneNumber: phone
		})
	},

	changeFavorites() {
		let state = this.data.favoritesState;
		if (state) {
			request.cancelFavorites({
				"targetId": this.data.item.id,
				"type": this.data.item.type,
			}).then((res) => {
				this.setData({
					favoritesState: false,
					favoritesIcon: 'star-o',
					favoritesColor: '#cccccc',
					favoritesName: '收藏',
				},()=>{
					wx.showToast({
						title: '取消成功',
						icon: 'success',
						duration: 2000
					})
				})
			}).catch((err) => {
				wx.showToast({
					title: '数据错误',
					icon: 'none',
					duration: 2000
				})
			})
		} else {
			request.addFavorites({
				"targetId": this.data.item.id,
				"type": this.data.item.type,
			}).then((res) => {
				this.setData({
					favoritesState: true,
					favoritesIcon: 'star',
					favoritesColor: '#FFD854',
					favoritesName: '已收藏',
				},()=>{
					wx.showToast({
						title: '收藏成功',
						icon: 'success',
						duration: 2000
					})
				})
			}).catch((err) => {
				wx.showToast({
					title: '数据错误',
					icon: 'none',
					duration: 2000
				})
			})
		}
	},

	toDetails(e){
		let type = '';
		let data = e.currentTarget.dataset.item;
		console.log(data,112212)
		switch (data.houseMold) {
			case 'ESTATE':
				type = "新房房源";
				break;
			case "SECOND_HAND":
				type = "二手房房源";
				break;
			case "TENANCY":
				type = "租房房源";
				break;
			case "RESIDENTIAL_QUARTERS":
				type = "小区房源";
				break;
			default:
		}
		let item = JSON.stringify({
			'title': type,
			"id": data.houseId,
		})
		wx.navigateTo({
			url: `/combination/pages/listingDetails/index?item=${item}`,
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let type = "";
		let item = JSON.parse(options.item)
		console.log(item)
		switch (item.title) {
			case "新房房源":
				type = "ESTATE";
				break;
			case "二手房房源":
				type = "SECOND_HAND";
				break;
			case "租房房源":
				type = "TENANCY";
				break;
			case "小区房源":
				type = "RESIDENTIAL_QUARTERS";
				break;
			default:
		}
		console.log(type)
		this.setData({
			type: type,
			id: item.id,
			title: item.title,
		}, () => {
			this.getData();
		})
		this.cWidth = wx.getSystemInfoSync().windowWidth;
		this.cHeight = 500 / 750 * wx.getSystemInfoSync().windowWidth;
	},
	showColumn(chartData) {
		let _self = this;
		canvaColumn = new uCharts({
			$this: _self,
			canvasId: "canvasColumn",
			type: 'line',
			legend: true,
			fontSize: 11,
			background: '#FFFFFF',
			pixelRatio: 1,
			animation: false,
			categories: chartData.categories,
			series: chartData.series,
			xAxis: {
				disableGrid: true,
			},
			yAxis: {
				// disabled:true
			},
			dataLabel: false,
			width: 343,
			height: 200,
			extra: {
				column: {
					type: 'group',
					width: _self.cWidth * 0.45 / chartData.categories.length
				}
			}
		});
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