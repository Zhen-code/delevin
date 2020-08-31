// components/favorites/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		data:{
			type:Object,
			value:{},
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		favoritesState: false,
		favoritesIcon: 'star-o',
		favoritesColor: '#cccccc',
		favoritesName: '收藏',
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		changeFavorites() {
			let state = this.data.favoritesState;
			if (state) {
				this.setData({
					favoritesState: false,
					favoritesIcon: 'star-o',
					favoritesColor: '#cccccc',
					favoritesName: '收藏',
				})
			} else {
				this.setData({
					favoritesState: true,
					favoritesIcon: 'star',
					favoritesColor: '#FFD854',
					favoritesName: '已收藏',
				})
			}
		},
	}
})