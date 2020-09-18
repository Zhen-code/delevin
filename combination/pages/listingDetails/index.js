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
		wx.navigateTo({
			url: "/combination/pages/browsePictures/index"
		})
	},

	toMap() {
		wx.navigateTo({
			url: "/combination/pages/map/index"
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
			let list = res.map((item, index) => {
				switch (item.decorationStatus) {
					case 'ROUGHCAST':
						item.decorationsStatus = '毛坯'
						break;
					case 'PAPERBACK':
						item.decorationsStatus = '简装'
						break;
					case 'CHINESE_DRESS':
						item.decorationsStatus = '中装'
						break;
					case 'HARDCOVER':
						item.decorationsStatus = '精装'
						break;
					case 'HAUTE_COUTURE':
						item.decorationsStatus = '豪装'
						break;
					default:
				};
				item.type = this.data.type;
				return item;
			})
			this.setData({
				item: list,
			})
			let item = {
				houseId: res.id,
				houseMold: this.data.type
			}
			this.getLikeListings(item);
		}).catch((err) => {
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
			url: `/combination/pages/homepage/index?link=${e.currentTarget.dataset.item.agentId}`,
		})
	},

	callPheon(e) {
		console.log(e.currentTarget.dataset.item)
		wx.makePhoneCall({
			phoneNumber: e.currentTarget.dataset.item.phone
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
		_self = this;
		this.cWidth = wx.getSystemInfoSync().windowWidth;
		this.cHeight = 500 / 750 * wx.getSystemInfoSync().windowWidth;
		this.getServerData()
	},
	//   这里 先暂时 应用 ucharts 里面提供的数据 调取他们的接口 
	getServerData: function () {
		wx.request({
			url: 'https://www.ucharts.cn/data.json',
			success: function (res) {
				let Column = {
					categories: [],
					series: []
				};
				Column.categories = res.data.data.ColumnB.categories;
				Column.series = res.data.data.ColumnB.series;
				//自定义标签颜色和字体大小
				// Column.series[0].textColor = 'yellow';
				// Column.series[0].textSize = 11;
				_self.showColumn("canvasColumn", Column);
			},
			fail: () => {
				console.log("请点击右上角【详情】，启用不校验合法域名");
			},
		})
	},
	showColumn(canvasId, chartData) {
		canvaColumn = new uCharts({
			$this: _self,
			canvasId: canvasId,
			type: 'line',
			legend: true,
			fontSize: 11,
			background: '#FFFFFF',
			pixelRatio: 1,
			animation: true,
			categories: chartData.categories,
			series: chartData.series,
			xAxis: {
				disableGrid: true,
			},
			yAxis: {
				// disabled:true
			},
			dataLabel: true,
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