// pages/broker/message/index.js
const {
	request
} = require('../../../request/request')
const topHeight = require('../../../request/topHeight.js').topHeight
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {

	},
	created() {
		this.getData()
	},
	/**
	 * 组件的初始数据
	 */
	data: {
		paddingTop: topHeight,
		bgColor: {
			"color": true,
			"border": false
		},
		list: [],
		pageIndex: 1,
		pageSize: 12,
		scrollTop: 0,
		triggered: false,
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
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
			request.messageList({
				"pageSize": this.data.pageSize,
				"pageIndex": this.data.pageIndex,
			}).then((res) => {
				let list = this.data.list;
				list.push(...res.list)
				this.setData({
					list: list,
					pageIndex: this.data.pageIndex + 1,
				})
			}).catch((err) => {
				wx.showToast({
					title: '请求失败',
					icon: 'none',
					duration: 2500
				})
			})
		},

		toMessageDetails(e) {
			let id = e.currentTarget.dataset.item.id;
			wx.navigateTo({
				url: `/combination/pages/message/index?id=${id}`,
			})
		},
	}
})