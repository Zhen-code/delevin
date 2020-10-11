// components/shopItem/index1.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		classType:{
			type:String,
			value:'',
		},
		item:{
			type:Object,
			value:{},
		},
	},
	observers: {
    classType(val) {
			if(val){
				this.setData({
					typeClass:val
				})
			}
		},
  },

	/**
	 * 组件的初始数据
	 */
	data: {
		typeClass:"",
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		toListingDetails() {
			wx.navigateTo({
				url: '/combination/pages/listingDetails/index?type='+this.data.typeClass,
			})
		},
		getAddListings(e){
			let item = e.currentTarget.dataset.item;
			this.triggerEvent('backItem', item)
		}
	}
})
