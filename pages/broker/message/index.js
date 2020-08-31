// pages/broker/message/index.js
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
		paddingTop:paddingTop,
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
