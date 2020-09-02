
const topHeight = require('../../../request/topHeight.js').topHeight

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		checked: false,
		selectType: '',
		selectType1: 0,
		selectType2: 0,
		selectType3: 0,
		selectType4: 0,
		minPrice: 0,
		maxPrice: 0,
		entireRentIndex: 0,
		shareIndex: 0,
		conditionIndex: 0,
		paddingTop: topHeight,
		title: "",
		bgColor: {
			"color": true,
			"border": true
		},
		show: {
			primary: true,
			success: true,
		},
		list: [],
		pageIndex: 1,
		pageSize: 12,
		scrollTop: 0,
		triggered: false,
		classType:"",
		show: false,
	},

	onClose(event) {
		this.setData({
			[`show.${event.target.id}`]: false,
		});
	},

	getInitialization() {
		this.setData({
			minPrice: 0,
			maxPrice: 0,
			entireRentIndex: 0,
			shareIndex: 0,
			conditionIndex: 0,
		})
	},

	selectTab(e) {
		this.setData({
			selectType: e.currentTarget.dataset.index
		})
		if (e.currentTarget.dataset.index === 0) {
			if (this.data.selectType1 === 2) {
				this.setData({
					selectType1: 1,
					selectType2: 0,
					selectType3: 0,
					selectType4: 0,
				})
			} else {
				this.setData({
					selectType1: 2,
					selectType2: 0,
					selectType3: 0,
					selectType4: 0,
				})
			}
		}
		if (e.currentTarget.dataset.index === 1) {
			if (this.data.selectType2 === 2) {
				this.setData({
					selectType1: 0,
					selectType2: 1,
					selectType3: 0,
					selectType4: 0,
				})
			} else {
				this.setData({
					selectType1: 0,
					selectType2: 2,
					selectType3: 0,
					selectType4: 0,
				})
			}
		}
		if (e.currentTarget.dataset.index === 2) {
			if (this.data.selectType3 === 2) {
				this.setData({
					selectType1: 0,
					selectType2: 0,
					selectType3: 1,
					selectType4: 0,
				})
			} else {
				this.setData({
					selectType1: 0,
					selectType2: 0,
					selectType3: 2,
					selectType4: 0,
				})
			}
		}
		if (e.currentTarget.dataset.index === 3) {
			if (this.data.selectType4 === 2) {
				this.setData({
					selectType1: 0,
					selectType2: 0,
					selectType3: 0,
					selectType4: 1,
				})
			} else {
				this.setData({
					selectType1: 0,
					selectType2: 0,
					selectType3: 0,
					selectType4: 2,
				})
			}
		}
	},

	setHide(){
		this.setData({
			selectType:''
		})
	},

	changeReset() {
		this.getInitialization()
	},

	entireRentTab(e) {
		this.setData({
			entireRentIndex: e.currentTarget.dataset.index
		})
	},

	shareTab(e) {
		this.setData({
			shareIndex: e.currentTarget.dataset.index
		})
	},

	conditionTab(e) {
		this.setData({
			conditionIndex: e.currentTarget.dataset.index
		})
	},

	changePrice(e) {
		if (e.currentTarget.dataset.index === 0) {
			this.setData({
				minPrice: e.detail.value
			})
		} else {
			this.setData({
				maxPrice: e.detail.value
			})
		}
	},

	scrollTop() {
		wx.pageScrollTo({
			scrollTop: 0
		})
	},

	topList() {
		this.setData({
			pageIndex: 1,
			triggered: false,
		})
		this.getData()
	},

	//滚动加载
	scrollList() {
		this.getData()
	},

	getData() {

	},

	changeArea(e) {
		let checked = this.data.checked
		this.setData({
			checked: !checked
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let type = '';
		let classType = '';
		switch (options.type) {
			case "新房房源":
				classType = "NEW",
				type = options.type;
				break;
			case "二手房房源":
				classType = "TOW"
				type = options.type;
				break;
			case "租房房源":
				classType = "ZUFANG"
				type = options.type;
				break;
			case "小区房源":
				classType = "XIAOQU"
				type = options.type;
				break;
			default:
		}
		this.setData({
			title: type,
			classType:classType,
		})
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