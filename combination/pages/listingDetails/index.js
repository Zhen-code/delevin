
const systemInfo = wx.getSystemInfoSync();
let system = systemInfo.system.toLowerCase();
let _height = 0;
if(system.match("android")){
	_height = 8;
}else if(system.match("ios")){
	_height = 4;
}
// 胶囊按钮位置信息
const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
const paddingTop = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight+_height;

import uCharts from "../../../utils/u-charts.min.js"
var _self;
var canvaColumn = null;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		paddingTop:paddingTop,
		title: "",
		bgColor: {
			"color": true,
			"border": false
		},
		favorites: {
			"id": 0
		},
		stlectState: false,
		stlectData: "查看更多",
		stlectName: "arrow-down",
		cWidth: '',
		cHeight: '',
		tabIndex: 0,
	},
	tovideoImage(){
		wx.navigateTo({
			url:"/combination/pages/browsePictures/index"
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
	selectShelf(e) {
		if (e.currentTarget.dataset.index === 0) {
			this.setData({
				tabIndex: 1,
			})
		} else {
			this.setData({
				tabIndex: 0,
			})
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let type = "";
		switch (options.type) {
			case "NEW":
				type = "新房房源";
				break;
			case "TOW":
				type = "二手房房源";
				break;
			case "ZUFANG":
				type = "租房房源";
				break;
			case "XIAOQU":
				type = "小区房源";
				break;
			default:
		}
		this.setData({
			title: type,
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