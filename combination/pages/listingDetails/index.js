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
		tabItem: ['新房', '二手房']
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
					res.decorationsStatus = '毛坯'
					break;
				case 'PAPERBACK':
					res.decorationsStatus = '简装'
					break;
				case 'CHINESE_DRESS':
					res.decorationsStatus = '中装'
					break;
				case 'HARDCOVER':
					res.decorationsStatus = '精装'
					break;
				case 'HAUTE_COUTURE':
					res.decorationsStatus = '豪装'
					break;
				default:
			};
			res.type = this.data.type;
			console.log(res)
			this.setData({
				item: res,
			})
			let item = {
				houseId: res.id,
				houseMold: this.data.type
			}
			let column = {
				categories: ["09.24", "09.25",],
				series: [{
					name: "房价走势图",
					data: [2800,2900],
					color: "#FFD200",
					show: true,
					area: [0, 90],
				}]
			};
			this.showColumn(column);
			this.getLikeListings(item);
		}).catch((err) => {
			console.log(err)
			wx.showToast({
				title: '数据有误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	getLikeListings(item) {
		request.likeListings({
			"houseId": item.houseId,
			"houseMold": item.houseMold,
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

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let type = "";
		let item = JSON.parse(options.item)
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