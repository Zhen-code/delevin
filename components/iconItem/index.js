// components/iconItem/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		houseItem:{
			type:Array,
			value:[],
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		tabItem(e){
			let index = e.currentTarget.dataset.index;
			this.triggerEvent('getTabIndex', index)
		}
	}
})
