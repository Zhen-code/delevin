const app = getApp()
const {
	request
} = require('../../../request/request');
const {
	provincCityDistrict
} = require('../../../request/provinces');
const topHeight = require('../../../request/topHeight.js').topHeight
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
		phone: "",
		number: "",
		city: "",
		realEstate: "",
		realEstateItem: {},
		time: "",
		demand: "",
		demandItem: [],
		demandList: [],
		remarks: '',
		cityType: false,
		timeType: false,
		demandType: false,
		actionIndex: 1,
		tabIndex: '',
		currentDate: new Date().getTime(),
		formatter(type, value) {
			if (type === 'year') {
				return `${value}年`;
			} else if (type === 'month') {
				return `${value}月`;
			} else if (type === 'day') {
				return `${value}日`;
			} else if (type === 'hour') {
				return `${value}时`;
			} else if (type === 'minute') {
				return `${value}分`;
			}
			return value;
		},
		areaList: provincCityDistrict,
	},

	cityTypeShow() {
		this.setData({
			cityType: true,
		})
	},

	cityTypeHide() {
		this.setData({
			cityType: false,
		})
	},

	cancel() {
		this.cityTypeHide()
	},

	confirm(e) {
		this.setData({
			city: e.detail.values[0].name + e.detail.values[1].name
		}, () => {
			this.cityTypeHide()
		})
	},

	timeShow() {
		this.setData({
			timeType: true,
		})
	},

	timeHide() {
		this.setData({
			timeType: false,
		})
	},

	ClickTimeViewOkBtn(event) {
		let time = this.getTime(event.detail, '{y}-{m}-{d} {h}:{i}');
		console.log("点击确定 选择的时间 - " + time);
		this.setData({
			currentDate: event.detail,
			time: time
		}, () => {
			this.timeHide()
		});
	},

	getTime(time, cFormat) {
		if (arguments.length === 0) {
			return null
		}
		const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
		let date
		if (typeof time === 'object') {} else {
			if (('' + time).length === 10) time = parseInt(time) * 1000
			date = new Date(time)
		}
		const formatObj = {
			y: date.getFullYear(),
			m: date.getMonth() + 1,
			d: date.getDate(),
			h: date.getHours(),
			i: date.getMinutes(),
			s: date.getSeconds(),
			w: date.getDay()
		}
		const time_str = format.replace(/{(y|m|d|h|i|s|w)+}/g, (result, key) => {
			let value = formatObj[key]
			if (key === 'w') {
				return ['日', '一', '二', '三', '四', '五', '六'][value]
			}
			if (result.length > 0 && value < 10) {
				value = '0' + value
			}
			return value || 0;
		})
		return time_str;
	},

	demandShow() {
		this.setData({
			demandType: true,
		})
	},

	demandHide() {
		this.setData({
			demandType: false,
		})
	},

	getDemand() {
		request.demand({}).then((res) => {
			let item = res.map((item) => {
				item.action = false;
				return item;
			})
			this.setData({
				demandItem: item
			})
		}).catch((err) => {
			console.log(err)
			wx.showToast({
				title: '请求失败',
				icon: 'none',
				duration: 2500
			})
		})
	},

	tabTextIndex(e) {
		let demandItem = this.data.demandItem;
		let index = e.currentTarget.dataset.index;
		if (demandItem[index].action) {
			demandItem[index].action = false
		} else {
			demandItem[index].action = true
		}
		this.setData({
			demandItem: demandItem
		})
	},

	bindAction(e) {
		let demandItem = this.data.demandItem;
		let index = e.currentTarget.dataset.index;
		if (index === 0) {
			this.setData({
				actionIndex: index,
				demandList: [],
				demandItem: [],
			}, () => {
				this.getDemand()
				this.demandHide()
			})
		} else {
			this.setData({
				demandList: [],
				demandList: demandItem.filter(item => {
					return item.action === true
				}),
				actionIndex: index
			}, () => {
				this.demandHide()
			})
		}
	},

	onCloseIndex(e) {
		let demandItem = this.data.demandItem;
		let demandList = this.data.demandList;
		let index = e.currentTarget.dataset.index;
		demandList[index].action = false;
		demandItem[index].action = false;
		this.setData({
			demandList: demandList.filter(item => {
				return item.action === true
			}),
			demandItem: demandItem,
		});
	},

	toListings() {
		let item = JSON.stringify({
			"type": true,
			"key": "推荐客源"
		})
		wx.navigateTo({
			url: `/combination/pages/listings/index?item=${item}`,
		})
	},

	getInputValue(e) {
		if (e.detail.value) {
			this.setData({
				[`${e.currentTarget.dataset.model}`]: e.detail.value,
			});
		} else {
			this.setData({
				[`${e.currentTarget.dataset.model}`]: e.detail.value,
			});
		}
	},

	getState(){
		this.setData({
			phone: "",
			number: "",
			city: "",
			realEstate: "",
			realEstateItem: {},
			time: "",
			demand: "",
			demandItem: [],
			demandList: [],
			remarks: '',
			cityType: false,
			timeType: false,
			demandType: false,
			actionIndex: 1,
			tabIndex: '',
		},()=>{
			app.globalData.realEstateItem = {}
		})
	},

	submit() {
		let {
			phone,
			number,
			city,
			realEstateItem,
			time,
			demandList,
			remarks
		} = this.data
		if (phone && number !== '') {
			let data = {
				"cityName": city || "",
				"demandName": demandList.map((item) => {
					return item.demandName
				}).join(",") || [],
				"houseId": realEstateItem.id || "",
				"houseType": realEstateItem.sourceType || realEstateItem.houseType || "",
				"identityCard": number ,
				"openHomeDate": time?time+':00':"",
				"phone": phone,
				"remarks": remarks || ""
			}
			console.log(data)
			request.customers(data).then((res) => {
				this.getState()
				wx.reLaunch({
					url: `/combination/pages/backHome/index?title=${'推荐客源'}`,
				})
			}).catch((err) => {
				console.log(err.data.msg)
				wx.showToast({
					title: err.data.msg,
					icon: 'none',
					duration: 2500
				})
			})
		} else {
			wx.showToast({
				title: '请完善资料',
				icon: 'none',
				duration: 2500
			})
		}
	},

	privacyPolicy() {
    request.link({
      'type': 'RECOMMENDED_CUSTOMERS'
    }).then((res) => {
      let item = JSON.stringify({
        "title": "推荐客源温馨提示",
        "link": res.link,
      })
      wx.navigateTo({
        url: `/combination/pages/webView/index?item=${item}`,
      })
    }).catch((err) => {
      wx.showToast({
        title: '数据错误',
        icon: 'none',
        duration: 2500
      })
    })
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getDemand()
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
		let data = app.globalData.realEstateItem;
		if (data.title != undefined) {
			this.setData({
				realEstateItem: data,
				realEstate: data.title,
			})
		} else {
			data = {}
		}
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