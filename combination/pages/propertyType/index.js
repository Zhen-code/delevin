const app = getApp()
const {
	request
} = require('../../../request/request.js');
const topHeight = require('../../../request/topHeight.js').topHeight
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		checked: false,
		entireRentIndex: '',
		shareIndex: 0,
		conditionIndex: 1,
		leftAction: 0,
		paddingTop: topHeight,
		title: "",
		bgColor: {
			"color": true,
			"border": true
		},
		item: [],
		pageIndex: 1,
		pageSize: 12,
		minPrice: '',
		maxPrice: '',
		city: '',
		province: '',
		keyword: '',
		region: '',
		value: '',
		houseType: '',
		salesStatus: '',
		upperLimit: '',
		lowerLimit: '',
		lineName: '',
		routeStop: '',
		routeStops: '',
		street: '',
		monthRentMax: '',
		monthRentMin: '',
		rentType: '',
		buildingAgeOptions: '',
		averagePriceMax: '',
		averagePriceMin: '',
		selectList: [],
		scrollTop: 0,
		triggered: false,
		show: false,
		towState: '',
		fourState: '',
		subwayList: [],
		routeStop: [],
		routeStopIndex: '',
		unitPrice: [],
		totalPrice: [],
		rent: [],
		type: [],
		typeList: [],
		tabTitle: [],
		city:false,
	},

	getState() {
		this.setData({
			pageIndex: 1,
			pageSize: 12,
			minPrice: '',
			maxPrice: '',
			keyword: '',
			region: '',
			houseType: '',
			salesStatus: '',
			upperLimit: '',
			lowerLimit: '',
			lineName: '',
			routeStop: '',
			routeStops: '',
			street: '',
			monthRentMax: '',
			monthRentMin: '',
			rentType: '',
			salesStatus: '',
			averagePriceMax: '',
			averagePriceMin: '',
			show: false,
			towState: '',
			fourState: '',
			subwayList: [],
			routeStop: [],
			routeStopIndex: '',
			rent: [],
			typeList: [],
			areaFirstList: []
		})
	},

	// 开启选择城市
	getShowCity(e){
		this.setData({
			city:e.detail
		})
	},

	// 城市选择
	getCityValue(e) {
		this.setData({
			pageIndex: 1,
			region: '',
			street: '',
			item: [],
			leftAction: 0,
			province: e.detail[0].name,
			city: e.detail[1].name,
		}, () => {
			// this.getStreet()
			this.getData()
		})
	},

	// 输入值
	getInputValue(e) {
		this.setData({
			keyword: e.detail
		})
	},

	// 搜索
	getSearchValue(e) {
		if (e.detail.value) {
			this.setData({
				pageIndex: 1,
				item: [],
				keyword: e.detail.value,
				city: e.detail.city,
				province: e.detail.province || app.globalData.address.province,
			}, () => {
				this.getData()
			})
		} else {
			this.setData({
				pageIndex: 1,
				item: [],
			}, () => {
				this.getStreet();
				this.getData()
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
			triggered: false,
		})
		this.getData()
	},

	//滚动加载
	scrollList() {
		this.getData()
	},

	getEvent(e) {
		let obj = {
			totalPrice: [],
			houseType: [],
			salesType: [],
			totalPriceSelft: [],
			roomageType: [],
		}
		if (JSON.stringify(e.detail) !== '{}') {
			e.detail.map((item) => {
				for (let key in obj) {
					if (item.type == key) {
						obj[key].push(item)
					}
				}
			})
			let buildingAgeOptions = obj.roomageType.length !== 0 ? obj.roomageType[0].buildingAgeOptions : '';
			let upperLimit = obj.totalPrice.length !== 0 ? obj.totalPrice[0].upperLimit : obj.totalPriceSelft.length !== 0 ? (Number(obj.totalPriceSelft[0].topAcreage)) : '';
			let lowerLimit = obj.totalPrice.length !== 0 ? obj.totalPrice[0].lowerLimit : obj.totalPriceSelft.length !== 0 ? (Number(obj.totalPriceSelft[0].bottomAcreage)) : '';
			this.setData({
				item: [],
				pageIndex: 1,
				upperLimit: upperLimit || '',
				lowerLimit: lowerLimit || '',
				houseType: obj.houseType || [],
				salesStatus: obj.salesType[0] || '',
				buildingAgeOptions: buildingAgeOptions,
			}, () => {
				this.getData()
			})
		} else {
			this.getState();
			this.getData();
			obj = {}
		}
		console.log(obj, 112212)
	},

	getParams() {
		let {
			pageIndex,
			pageSize,
			city,
			province,
			keyword,
			region,
			houseType,
			salesStatus,
			upperLimit,
			lowerLimit,
			lineName,
			routeStops,
			street,
			rentType,
			buildingAgeOptions,
		} = this.data;
		let obj = {
			pageIndex: pageIndex,
			pageSize: pageSize,
		};
		if (keyword !== '') {
			obj.keyword = keyword
		}
		if (city !== '') {
			obj.city = city;
		}
		if (province !== '') {
			obj.province = province
		}
		if (region !== '') {
			obj.region = region;
		}
		if (houseType.length !== 0) {
			obj.houseType = houseType.map((item) => {
				return item.id + 1
			}).join(",")
		}
		if (salesStatus.value !== '') {
			obj.salesStatus = salesStatus.value ? (salesStatus.value === "待售" ? 'FOR_SALE' : 'ON_SALE') : ''
		}
		if (street !== '') {
			obj.street = street
		}
		if (rentType !== '') {
			obj.rentType = rentType;
		}
		if (upperLimit !== '') {
			obj.upperLimit = upperLimit;
		}
		if (lowerLimit !== '') {
			obj.lowerLimit = lowerLimit;
		}
		if (routeStops !== '') {
			obj.routeStop = routeStops
		}
		if (lineName !== '') {
			obj.lineName = lineName
		}
		if (buildingAgeOptions !== '') {
			obj.buildingAgeOptions = buildingAgeOptions
		}
		return obj;
	},

	getData() {
		let requests = '';
		switch (this.data.title) {
			case '新房房源':
				requests = request.newListings
				break;
			case '二手房房源':
				requests = request.towListings
				break;
			case '租房房源':
				requests = request.tenancyListings
				break;
			case '小区房源':
				requests = request.quartersListings
				break;
			default:
		}
		let {
			item,
			pageIndex
		} = this.data;
		let params = this.getParams();
		requests(params).then((res) => {
			item.push(...res.list)
			this.setData({
				item: item,
				pageIndex: pageIndex + 1,
			})
		}).catch((err) => {
			console.log(err)
			wx.showToast({
				title: '数据有误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	changeArea(e) {
		let index = e.currentTarget.dataset.index;
		let subwayList = this.data.subwayList;
		if (subwayList[index].checked) {
			subwayList[index].checked = false;
			this.setData({
				subwayList,
				routeStop: [],
			})
		} else {
			subwayList.map((item) => {
				item.checked = false;
				if (item.routeStopItem) {
					for (let i = 0; i < item.routeStopItem.length; i++) {
						item.routeStopItem[i].checked = false;
					}
				}
				return item;
			})
			subwayList[index].checked = true;
			this.setData({
				subwayList,
				routeStop: subwayList[index].routeStopItem || [],
			})
		}
	},

	changeAreaChildren(e) {
		let index = e.currentTarget.dataset.index;
		let routeStop = this.data.routeStop;
		if (routeStop[index].checked) {
			routeStop[index].checked = false
		} else {
			routeStop[index].checked = true
		}
		this.setData({
			routeStop
		})
	},

	toListingDetails(e) {
		let item = JSON.stringify({
			'title': this.data.title,
			"id": e.currentTarget.dataset.item.id,
		})
		wx.navigateTo({
			url: `/combination/pages/listingDetails/index?item=${item}`,
		})
	},

	// 区域
	getStreet() {
		let {
			region,
			city,
			province
		} = this.data;
		request.street({
			"city": city,
			"province": province,
			"region": region,
		}).then((res) => {
			console.log(res, 123)
			let list = res.map((item) => {
				item.type = "streetType"
				item.selected = false
				item.value = item.cityName
				return item;
			})
			this.setData({
				subwayList: list,
			})
		}).catch((err) => {
			console.log(err)
			wx.showToast({
				title: '数据有误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	// 地铁
	getSubway() {
		request.subway({}).then((res) => {
			console.log(res,123)
			let item = res.map((item) => {
				item.routeStopItem = item.routeStop.map((key, index) => {
					return {
						"id": index,
						"name": key,
						"checked": false,
					}
				})
				item.checked = false;
				return item
			})
			this.setData({
				subwayList: item
			})
		}).catch((err) => {
			console.log(err)
			wx.showToast({
				title: '数据有误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	//单价
	getUnitPrice() {
		request.unitPrice().then((res) => {
			console.log(res, '单价')
			let list = res.map((item, index) => {
				item.ids = item.id
				item.id = index
				item.type = "totalPrice"
				item.selected = false
				item.value = item.priceOption
				return item;
			})
			this.setData({
				pricePrice: list
			})
		}).catch((err) => {
			console.log(err)
			wx.showToast({
				title: '数据有误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	// 总价
	getTotalPrice() {
		request.totalPrice().then((res) => {
			// console.log(res, '总价')
			let list = res.map((item, index) => {
				item.ids = item.id
				item.id = index
				item.type = "totalPrice"
				item.selected = false
				item.value = item.priceOption
				return item;
			})
			this.setData({
				pricePrice: list
			})
		}).catch((err) => {
			console.log(err)
			wx.showToast({
				title: '数据有误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	// 租金
	getRent() {
		request.rent().then((res) => {
			console.log(res, '租金')
			let list = res.map((item, index) => {
				item.ids = item.id
				item.id = index
				item.type = "totalPrice"
				item.selected = false
				item.value = item.priceOption
				return item;
			})
			this.setData({
				pricePrice: list
			})
		}).catch((err) => {
			console.log(err)
			wx.showToast({
				title: '数据有误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	// 户型
	getType() {
		request.type().then((res) => {
			// console.log(res, '户型')
			let item = res.map((item) => {
				item.type = "houseType";
				item.value = item.title;
				item.selected = false;
				return item;
			})
			this.setData({
				type: item
			})
		}).catch((err) => {
			console.log(err)
			wx.showToast({
				title: '数据有误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let tabTitle = [];
		switch (options.type) {
			case '新房房源':
				tabTitle = ['区域', '单价', '户型', '销售状态', ]
				this.getUnitPrice();
				break
			case '二手房房源':
				tabTitle = ['区域', '总价', '户型', '楼龄', ]
				this.getTotalPrice();
				break
			case '租房房源':
				tabTitle = ['区域', '租金', '户型', '出租方式', ]
				this.getRent();
				break
			case '小区房源':
				tabTitle = ['区域', '单月均价', '户型', '楼龄', ]
				this.getUnitPrice();
				break
		}
		this.setData({
			tabTitle: tabTitle,
			city: app.globalData.address.city || '',
			province: app.globalData.address.province || '',
			title: options.type,
		}, () => {
			this.getData();
			this.getStreet()
			this.getType();
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