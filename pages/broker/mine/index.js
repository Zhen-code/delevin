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
		top:{
			type:Number,
			value:0
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		paddingTop:paddingTop
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		tabPortal(){
			let item = false
			this.triggerEvent('item', item)
		},
		myPackage(){
			console.log('我的套餐')
		},
		myClientele(){
			console.log('我的客源')
		},
		privacyPolicy(){
			console.log('隐私政策')
		},
	}
})
