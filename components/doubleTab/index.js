// components/doubleTab/index.js
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
		tabIndex: 0,
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		selectShelf(e) {
			if (e.currentTarget.dataset.index === 0) {
				this.setData({
					tabIndex: 1,
				})
			} else {
				this.setData({
					tabIndex: 0,
				})
			}
		},
	}
})
