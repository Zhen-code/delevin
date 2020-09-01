// pages/broker/message/index.js
const topHeight = require('../../../request/topHeight.js').topHeight
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {

	},

	/**
	 * 组件的初始数据
	 */
	data: {
		paddingTop:topHeight,
		bgColor: {
      "color": true,
      "border": false
		},
		data: [],
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
	
		toMessageDetails(){
			wx.navigateTo({
				url: '/combination/pages/message/index',
			})
		},
	}
})
