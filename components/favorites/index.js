// components/favorites/index.js
const {
	request
} = require('../../request/request');
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		data: {
			type: Object,
			value: {},
		}
	},

	observers: {
		data(val, newVal) {
			if (val.collection !== null) {
				if (val.collection === 'NO') {
					this.setData({
						favoritesState: false,
						favoritesIcon: 'star-o',
						favoritesColor: '#cccccc',
						favoritesName: '收藏',
					})
				} else {
					console.log('有')
					this.setData({
						favoritesState: true,
						favoritesIcon: 'star',
						favoritesColor: '#FFD854',
						favoritesName: '已收藏',
					})
				}
			}
		},
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
				console.log(this.data.data)
				// request.cancelFavorites({
				// 	"targetId": 1,
				// 	"type": "POST"
				// }).then((res) => {
				// 	this.setData({
				// 		favoritesState: false,
				// 		favoritesIcon: 'star-o',
				// 		favoritesColor: '#cccccc',
				// 		favoritesName: '收藏',
				// 	})
				// 	wx.showToast({
				// 		title: '取消成功',
				// 		icon: 'success',
				// 		duration: 2000
				// 	})
				// }).catch((err) => {
				// 	wx.showToast({
				// 		title: '数据错误',
				// 		icon: 'none',
				// 		duration: 2000
				// 	})
				// })
			} else {
				console.log(this.data.data)
				// request.addFavorites({
				// 	"targetId": 1,
				// 	"type": "POST"
				// }).then((res) => {
				// 	this.setData({
				// 		favoritesState: true,
				// 		favoritesIcon: 'star',
				// 		favoritesColor: '#FFD854',
				// 		favoritesName: '已收藏',
				// 	})
				// 	wx.showToast({
				// 		title: '收藏成功',
				// 		icon: 'success',
				// 		duration: 2000
				// 	})
				// }).catch((err) => {
				// 	wx.showToast({
				// 		title: '数据错误',
				// 		icon: 'none',
				// 		duration: 2000
				// 	})
				// })
			}
		},
	}
})