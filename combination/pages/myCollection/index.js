// combination/pages/myCollection/index.js
const {
	request
} = require('../../../request/request');
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
		tabIndex: 0,
		topTabIndex: 0,
		navTabIndex: 0,
		tabItem: [],
		tab1: ['新房/楼盘', '二手房', '租房', '小区房'],
		tab2: ['新闻', '地产315'],
		item: [],
		type: 'ESTATE',
		pageIndex: 1,
		pageSize: 12,
		scrollTop: 0,
		triggered: false,
		favorites: "取消收藏",
		title: '',
		doubleTabIndex: 0,
	},

	onClose(event) {
		let than = this;
		let items = event.currentTarget.dataset.item;
		wx.showModal({
			title: '我的收藏',
			content: '是否确认取消收藏？',
			showCancel: true,
			cancelText: "取消",
			confirmText: "确定",
			success(res) {
				if (res.confirm) {
					request.cancelFavorites({
						"targetId": items.targetId,
						"type": items.type
					}).then((res) => {
						wx.showToast({
							title: '取消成功',
							icon: 'success',
							duration: 2500
						})
						than.setData({
							item: [],
							pageIndex:1,
						}, () => {
							than.getData();
						})
					}).catch((err) => {
						wx.showToast({
							title: '数据错误',
							icon: 'none',
							duration: 2500
						})
					})
				}
			}
		})
	},

	topTap(e) {
		let data = this.data;
		if (e.currentTarget.dataset.index === 0) {
			this.setData({
				item: [],
				type: 'ESTATE',
				tabIndex: 0,
				pageIndex: 1,
				tabItem: data.tab1,
				topTabIndex: e.currentTarget.dataset.index
			})
		} else {
			this.setData({
				item: [],
				type: 'NEWS',
				tabIndex: 0,
				pageIndex: 1,
				tabItem: data.tab2,
				topTabIndex: e.currentTarget.dataset.index
			})
		}
		this.getData();
	},

	getTabIndex(e) {
		if (this.data.topTabIndex === 0) {
			switch (e.detail) {
				case 0: {
					this.setData({
						type: 'ESTATE',
						item: [],
						navTabIndex: e.detail,
						pageIndex: 1,
					})
					break
				};
			case 1: {
				this.setData({
					type: 'SECOND_HAND',
					item: [],
					navTabIndex: e.detail,
					pageIndex: 1,
				})
				break
			};
			case 2: {
				this.setData({
					type: 'TENANCY',
					item: [],
					navTabIndex: e.detail,
					pageIndex: 1,
				})
				break
			};
			case 3: {
				this.setData({
					type: 'RESIDENTIAL_QUARTERS',
					item: [],
					navTabIndex: e.detail,
					pageIndex: 1,
				})
				break
			};
			}
		} else {
			this.setData({
				item: [],
				tabIndex: 0,
				pageIndex: 1,
			})
		}
		this.getData()
	},

	tabItemIndex(e) {
		let index = e.currentTarget.dataset.index;
		if (index === 0) {
			this.setData({
				type: 'NEWS',
				item: [],
				pageIndex: 1,
				tabIndex: e.currentTarget.dataset.index
			})
		} else {
			this.setData({
				type: 'POST',
				item: [],
				pageIndex: 1,
				tabIndex: e.currentTarget.dataset.index
			})
		}
		this.getData()
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

	getData() {
		let requests = '';
		if (this.data.title === '我的收藏') {
			if (this.data.topTabIndex === 0) {
				requests = request.myFavoritesHouse
			} else {
				requests = request.myFavoritesOther
			}
		} else {
			if (this.data.topTabIndex === 0) {
				requests = request.browseListingsList
			} else {
				requests = request.browseOtherList
			}
		}
		requests({
			"pageSize": this.data.pageSize,
			"pageIndex": this.data.pageIndex,
			"type": this.data.type,
		}).then((res) => {
			let list = this.data.item
			let data = res.list.map((item)=>{
				item.sourceType = this.data.type
				item.houseMold = this.data.type
				return item;
			});
			console.log(data,12121)
			list.push(...data)
			this.setData({
				item: list,
				pageIndex: this.data.pageIndex + 1,
			})
		}).catch((err) => {
			wx.showToast({
				title: '数据错误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	toDateils(e) {
		let type = '';
		let data = e.currentTarget.dataset.item
		if(data.status === 'LOWER'){
			wx.showToast({
				title: '该房源已经下架！',
				icon: 'none',
				duration: 2500
			})
		}else{
			switch (this.data.navTabIndex) {
				case 0:
					type = "新房房源";
					break;
				case 1:
					type = "二手房房源";
					break;
				case 2:
					type = "租房房源";
					break;
				case 3:
					type = "小区房源";
					break;
				default:
			}
			let item = JSON.stringify({
				'title': type,
				"id": data.targetId,
			})
			wx.navigateTo({
				url: `/combination/pages/listingDetails/index?item=${item}`,
			})
		}
	},

	toAspectItem(e){
		let targetId = e.currentTarget.dataset.item.targetId
    wx.navigateTo({
      url: `/combination/pages/aspectDetail/index?id=${targetId}`,
    })
	},

	toEstateItem(e){
		let targetId = e.currentTarget.dataset.item.targetId
    wx.navigateTo({
      url: `/combination/pages/postDetail/index?id=${targetId}`,
    })
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let index = Number(options.tabIndex);
		let data = this.data;
		this.setData({
			type:index === 0 ? 'ESTATE' : 'NEWS',
			tabItem: index === 0 ? data.tab1 : data.tab2,
			topTabIndex: index,
			title: index === 0 ? '我的收藏' : '浏览记录'
		}, () => {
			this.getData()
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