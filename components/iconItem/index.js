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
		changeHouseType(e) {
			let type = e.currentTarget.dataset.model;
			if (type === "房贷计算") {
				console.log(type)
				// wx.navigateTo({
				// 	url: '/combination/pages/listingDetails/index',
				// })
			} else {
				console.log(type)
				wx.navigateTo({
					url: '/combination/pages/propertyType/index?type='+type,
				})
			}
		},
		// this.setData({
		// 	[`${e.currentTarget.dataset.model}`]: e.detail.value,
		// });
	}
})
