// components/citySearch/index.js
const app = getApp()
const {
	provincCityDistrict
} = require('../../request/provinces')
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		placeholder: {
			type: String,
			value: '输入地名/地铁/楼盘/小区查找房源',
		},
		value: {
			type: String,
			value: '',
		}
	},

	lifetimes: {
		attached: function () {
			// 在组件实例进入页面节点树时执行
			console.log('在组件实例进入页面节点树时执行')
			let name = '';
			if (app.globalData.address.city) {
				if (app.globalData.address.city.length > 4) {
					name = app.globalData.address.city.substring(0, 4) + '...'
				} else {
					name = app.globalData.address.city
				}
				this.setData({
					city: name,
				})
			}
		},
		detached: function () {
			// 在组件实例被从页面节点树移除时执行
			console.log('在组件实例被从页面节点树移除时执行')
		},
	},
	// 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
	attached: function () {
		// 在组件实例进入页面节点树时执行
		console.log('在组件实例进入页面节点树时执行')
	},
	detached: function () {
		// 在组件实例被从页面节点树移除时执行
		console.log('在组件实例被从页面节点树移除时执行')
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		codes:'',
		show: false,
		city: '',
		province: '',
		value: "",
		name: '',
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
			},()=>{
				this.triggerEvent("showCity", this.data.show);
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
			let name = '';
			if (e.detail.values[1].name.length > 4) {
				name = e.detail.values[1].name.substring(0, 4) + '...'
			} else {
				name = e.detail.values[1].name
			}
			this.setData({
				province: e.detail.values[0].name,
				city: name || '未选择'
			})
			this.triggerEvent("getCityValue", e.detail.values);
			this.onClose();
		},

		search(e) {
			let type = {
				"province": this.data.province,
				"city": this.data.city,
				"value": this.data.value
			}
			this.triggerEvent("getSearchValue", type);
		},

		chanheValue(e) {
			this.setData({
				value: e.detail.value
			})
			this.triggerEvent("getInputValue", e.detail.value);
			// wx.navigateTo({
			// 	url: `/combination/pages/searchFor/index`,
			// })
		},

		firm(e) {
      let that = this;
      let val = e.detail.value == undefined ? that.data.codes : e.detail.value; //通过这个传递数据
      let myEventDetail = {
        value: val
      }
      this.triggerEvent('firmInput', myEventDetail) //myevent自定义名称事件，父组件中使/
    },

    search(){
      // let that = this;
      let value = this.data.value
      let myEventDetail = {
        value: value
      }
      this.triggerEvent('search', myEventDetail) //myevent自定义名称事件，父组件中使/
    },
	}
})