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
		selectType: '',
		selectType1: 0,
		selectType2: 0,
		selectType3: 0,
		selectType4: 0,
		entireRentIndex: '',
		shareIndex: 0,
		conditionIndex: '',
		leftAction: 0,
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
			entireRentIndex: '',
			shareIndex: 0,
			conditionIndex: '',
			pageIndex: 1,
			shareIndex: 0,
			entireRentIndex: '',
			upperLimit: '',
			lowerLimit: '',
			routeStops: '',
			houseType: '',
			street: '',
			lineName: '',
			salesStatus: '',
			buildingAgeOptions: '',
			rentType: '',
		}, () => {
			this.getType()
		})
	},

	selectTab(e) {
		this.setData({
			selectType: e.currentTarget.dataset.index
		}, () => {
			this.getInitialization()
		})
		if (e.currentTarget.dataset.index === 0) {
			if (this.data.selectType1 === 2) {
				this.setData({
					selectType1: 1,
					selectType2: 0,
					selectType3: 0,
					selectType4: 0,
				}, () => {
					this.setHide()
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
				}, () => {
					this.setHide()
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
				}, () => {
					this.setHide()
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
				}, () => {
					this.setHide()
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

	setHide() {
		this.setData({
			selectType: '',
			selectType1: 0,
			selectType2: 0,
			selectType3: 0,
			selectType4: 0,
		})
	},

	changeReset() {
		this.getInitialization()
	},

	leftTab(e) {
		let index = e.currentTarget.dataset.index;
		switch (index) {
			case 0:
				this.setData({
					subwayList: [],
					routeStop: [],
					routeStopIndex: ''
				}, () => {
					this.getStreet()
				})
				break
			case 1:
				this.setData({
					subwayList: [],
					routeStop: [],
					routeStopIndex: ''
				}, () => {
					this.getSubway()
				})
				break
		}
		this.setData({
			leftAction: index
		})
	},

	priceTab(e) {
		let item = e.currentTarget.dataset.item;
		let index = e.currentTarget.dataset.index;
		this.setData({
			upperLimit: item.upperLimit,
			lowerLimit: item.lowerLimit,
			entireRentIndex: index
		})
	},

	buildingAgeOptionsTab(e) {
		let item = e.currentTarget.dataset.item;
		let index = e.currentTarget.dataset.index;
		this.setData({
			buildingAgeOptions: item,
			entireRentIndex: index
		})
	},

	entireRentTab(e) {
		let SALE = '';
		let type = '';
		let item = e.currentTarget.dataset.item;
		let index = e.currentTarget.dataset.index;
		if (item === "FOR_SALE") {
			SALE = "FOR_SALE"
		}
		if (item === "ON_SALE") {
			SALE = "ON_SALE"
		}
		if (item === "WHOLE_RENT") {
			type = "WHOLE_RENT"
		}
		if (item === "COTENANCY") {
			type = "COTENANCY"
		}
		this.setData({
			rentType: type || '',
			salesStatus: SALE.toString() || '',
			entireRentIndex: index,
		})
	},

	oncheckTab(e) {
		let index = e.currentTarget.dataset.index;
		let item = e.currentTarget.dataset.item;
		let type = this.data.type;
		let newArr = type.filter((item) => {
			return item.checked === true
		});
		if (newArr.length === 5) {
			if (type[index].checked) {
				type[index].checked = false
			} else {
				wx.showToast({
					title: '最多选择5种类型',
					icon: 'none',
					duration: 2500
				})
			}
		} else {
			if (type[index].checked) {
				type[index].checked = false
			} else {
				type[index].checked = true
			}
		}
		this.setData({
			type
		})
	},

	shareTab(e) {
		this.setData({
			shareIndex: e.currentTarget.dataset.index
		})
	},

	rentTab(e) {
		let type = this.data.type;
		let index = e.currentTarget.dataset.index;
		if (index === 0) {
			this.setData({
				type,
				item: [],
				type: [],
				houseType: '',
				conditionIndex: e.currentTarget.dataset.index
			})
		} else {
			let houseType = type.filter(item => {
				return item.checked === true;
			}).map((key) => {
				return key.id;
			})
			this.setData({
				item: [],
				houseType: houseType.join(","),
				conditionIndex: e.currentTarget.dataset.index
			})
		}
		this.getType()
		this.setHide();
		this.getData();
	},

	conditionTab(e) {
		let type = '';
		let index = e.currentTarget.dataset.index;
		let subwayList = this.data.subwayList.filter(item => {
			return item.checked === true;
		}).map((item) => {
			if (item.cityName) {
				type = 0;
				return item.cityName
			} else {
				type = 1;
				let list = item.routeStopItem.filter(k => {
					return k.checked === true
				}).map((l) => {
					return l.name;
				})
				return {
					"lineName": item.lineName,
					"routeStopItem": list
				}
			}
		})
		if (index === 0) {
			this.setData({
				item: [],
				salesStatus: '',
				buildingAgeOptions: '',
				conditionIndex: e.currentTarget.dataset.index
			})
		} else {
			this.setData({
				item: [],
				street: type === 0 ? subwayList.join(",") : '',
				lineName: type === 1 ? subwayList[0].lineName : '',
				routeStops: type === 1 ? subwayList[0].routeStopItem.join(",") : '',
				conditionIndex: e.currentTarget.dataset.index,
				subwayList: [],
				routeStop: [],
				leftAction: 0,
			})
			type = '';
		}
		this.getStreet();
		this.setHide();
		this.getData();
	},

	changePrice(e) {
		let value = Number(e.detail.value);
		let {
			lowerLimit,
			upperLimit
		} = this.data;
		if (e.currentTarget.dataset.index === 0) {
			if (lowerLimit !== '') {
				if (value <= upperLimit) {
					lowerLimit = value;
				} else {
					lowerLimit = ''
					// wx.showToast({
					// 	title: '不能大于最高价',
					// 	icon: 'none',
					// 	duration: 2500
					// })
				}
			} else {
				lowerLimit = value;
			}
		} else {
			if (upperLimit !== '') {
				if (value >= lowerLimit) {
					upperLimit = value;
				} else {
					upperLimit = lowerLimit
					// wx.showToast({
					// 	title: '不能低于最低价',
					// 	icon: 'none',
					// 	duration: 2500
					// })
				}
			} else {
				upperLimit = value;
			}
		}
		this.setData({
			lowerLimit: lowerLimit,
			upperLimit: upperLimit,
		})
	},

	getCityValue(e) {
		this.setData({
			pageIndex: 1,
			region: '',
			street:'',
			item:[],
			leftAction:0,
			province: e.detail[0].name,
			city: e.detail[1].name,
		}, () => {
			this.setHide();
			this.getStreet()
			this.getData()
		})
	},

	getInputValue(e) {
		this.setData({
			keyword: e.detail
		})
	},

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
				this.getInitialization();
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

	getParams() {
		let {
			pageIndex,
			pageSize,
			city,
			province,
			keyword,
			region,
			value,
			houseType,
			salesStatus,
			upperLimit,
			lowerLimit,
			lineName,
			routeStops,
			street,
			monthRentMax,
			monthRentMin,
			rentType,
			buildingAgeOptions,
			averagePriceMax,
			averagePriceMin,
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
		if (houseType !== '') {
			obj.houseType = houseType;
		}
		if (salesStatus !== '') {
			obj.salesStatus = salesStatus
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
		if (houseType !== '') {
			obj.houseType = houseType
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
			this.setData({
				subwayList: res,
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

	getSubway() {
		request.subway({}).then((res) => {
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

	getUnitPrice() {
		request.unitPrice().then((res) => {
			// console.log(res, '单价')
			this.setData({
				unitPrice: res
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

	getTotalPrice() {
		request.totalPrice().then((res) => {
			// console.log(res, '总价')
			this.setData({
				totalPrice: res
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

	getRent() {
		request.rent().then((res) => {
			// console.log(res, '租金')
			this.setData({
				rent: res
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

	getType() {
		request.type().then((res) => {
			// console.log(res, '户型')
			let item = res.map((item) => {
				item.checked = false;
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
		let towState = '';
		let fourState = '';
		switch (options.type) {
			case '新房房源':
				towState = '单价';
				fourState = '销售状态';
				break
			case '二手房房源':
				towState = '总价';
				fourState = '楼龄';
				break
			case '租房房源':
				towState = '租金';
				fourState = '出租方式';
				break
			case '小区房源':
				towState = '单月均价';
				fourState = '楼龄';
				break
		}
		this.setData({
			towState: towState,
			fourState: fourState,
			city: app.globalData.address.city || '',
			province: app.globalData.address.province || '',
			title: options.type,
		}, () => {
			this.getData();
			this.getStreet()
			this.getUnitPrice();
			this.getTotalPrice();
			this.getRent();
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