const topHeight = require('../../../request/topHeight.js').topHeight
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
		paddingTop:topHeight
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
