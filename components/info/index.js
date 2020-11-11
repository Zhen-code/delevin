// components/info/index.js
const {
	request
} = require('../../request/request');
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		info: {
			type: Object,
			value: {}
		},
		state: {
			type: Boolean,
			value: false
		}
	},

	observers: {
    info(val, newVal) {
			console.log(val)
      this.setData({
        item: val
      })
		},
		state(val, newVal) {
			console.log(val)
      this.setData({
        type: val
      })
		},
  },

	/**
	 * 组件的初始数据
	 */
	data: {
		item: null,
		type:false
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		close() {
			this.setData({
				type: false
			})
		},

		linkAgent() {
			this.getPhone(this.data.item.phone)
		},
	
		getPhone(phone) {
			request.bindPhone({
				bindPhone: phone
			}).then((res) => {
				console.log(res)
				wx.makePhoneCall({
					phoneNumber: res.phone
				})
			}).catch((err) => {
				wx.showToast({
					title: err.data.msg || '请求失败',
					icon: 'none',
					duration: 2500
				})
			})
		},
	}
})