// components/doubleTab/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		tabItem: {
			type: Array,
			value: [],
		},
		tabIndex: {
			type: Number,
			value: '0',
			observer: function observer() {
				var newVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
				this.setData({
					tabIndex: Number(newVal),
				})
			}
		}
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
			this.setData({
				tabIndex: e.currentTarget.dataset.index,
			})
			this.triggerEvent('backTabValue', e.currentTarget.dataset.index);
		},
	}
})
