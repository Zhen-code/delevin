// components/citySearch/index.js
const {
	provincCityDistrict
} = require('../../request/provinces')
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		placeholder:{
			type:String,
			value:'输入地名/地铁/楼盘/小区查找房源',
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		show: false,
		city: "广州市",
		value:"",
		name:'',
		areaList: provincCityDistrict,
		placeholder: "输入地名/地铁/楼盘/小区查找房源",
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		changeCity() {
			this.setData({
				show: true
			});
		},

		onClose() {
			this.setData({
				show: false
			});
		},

		cancel() {
			this.onClose()
		},

		confirm(e) {
			// for (let i = 0; i < e.detail.values.length; i++) {
			// 	name = e.detail.values[0].name + '-' + e.detail.values[1].name + '-' + e.detail.values[2].name;
			// 	code = e.detail.values[0].code + '-' + e.detail.values[1].code + '-' + e.detail.values[2].code;
			// }
			let name = '';
			if (e.detail.values[1].name.length > 4) {
				name = e.detail.values[1].name.substring(0, 4) + '...'
			} else {
				name = e.detail.values[1].name
			}
			this.setData({
				city: name || '未选择'
			})
			this.triggerEvent("getCityValue", name);
			this.onClose();
		},

		search(e){
			let type = {
				"name":this.data.city,
				"value":this.data.value
			}
			this.triggerEvent("getSearchValue", type);
		},

		chanheValue(e) {
			this.setData({
				value:e.detail.value
			})
			this.triggerEvent("getInputValue", e.detail.value);
			// wx.navigateTo({
			// 	url: `/combination/pages/searchFor/index`,
			// })
		}
	}
})