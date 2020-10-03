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
			wx.showLoading({
				title: '上传中'
			});
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
						});
					},
					complete(){
						console.log(that.data);
						that.triggerEvent('getImgs',{e:that.data.fileList});
					}
				});
			}
			wx.hideLoading();
			if(this.data['fileList'].length!==0){
				wx.showToast({
					title: '上传成功!',
					icon: "none",
					duration: 1000
				})
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