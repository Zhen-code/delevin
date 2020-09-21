// components/uploader/index.js
const api = require('../../request/api').api;
const domain = require('../../request/http.js').domain;
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		count: {
			type: Number,
			value: 1
		},
		fileList:{
			type:Array,
			value:[]
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		fileList: [],
		disable: true
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		afterRead(event) {
			var that = this;
			const {
				file
			} = event.detail;
			let pathArray = file.map(item => {
				return item.path;
			});
			console.log(file)
			for (let i = 0; i < pathArray.length; i++) {
				wx.uploadFile({
					url: domain + api.upload.imgVideoUpload, // 仅为示例，非真实的接口地址
					filePath: pathArray[i],
					name: 'file',
					success: (response) => {
						let res = JSON.parse(response.data);
						if (res.code === 200) {
							let {
								fileUri
							} = res.data;
							let {
								fileList
							} = this.data;
							this.setData({
								fileList: [...fileList, {
									url: fileUri
								}]
							});
						}
					},
					fail(err) {
						wx.showToast({
							title: '上传失败！',
							icon: 'none',
							duration: 1000
						})
					},
					complete() {
						that.triggerEvent('getImgs', {
							e: that.data.fileList
						});
					}
				});
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				// wx.uploadFile({
				// 	url: 'http://my.zol.com.cn/index.php?c=Ajax_User&a=uploadImg', // 仅为示例，非真实的接口地址
				// 	filePath: pathArray[i],
				// 	name: 'myPhoto',
				// 	formData: {
				// 		user: 'user'
				// 	},
				// 	success: (response) => {
				// 		let res = JSON.parse(response.data);
				// 		let {
				// 			url
				// 		} = res;
				// 		if (url !== null && url !== '') {
				// 			url = url.replace("\\", '');
				// 		}
				// 		let {
				// 			fileList
				// 		} = this.data;
				// 		fileList.push({
				// 			url
				// 		});
				// 		this.setData({
				// 			fileList
				// 		});
				// 		wx.showToast({
				// 			title: '上传成功！',
				// 			icon: 'success',
				// 			duration: 2500
				// 		})
				// 	},
				// 	fail(err) {
				// 		wx.showToast({
				// 			title: err,
				// 			icon: 'none',
				// 			duration: 2500
				// 		})
				// 	},
				// });
			}
		},
		deleteImg(e) {
			console.log(e)
			let {
				index
			} = e.detail;
			let {
				fileList
			} = this.data;
			fileList.splice(index, 1);
			this.setData({
				fileList
			})
		},
	}
})