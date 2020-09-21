// combination/pages/modify/index.js
const {request} = require('../../../request/request');
const api = require('../../../request/api').api;
const domain = require('../../../request/http').domain
const topHeight = require('../../../request/topHeight.js').topHeight
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		paddingTop: topHeight,
		bgColor: {
			"color": true,
			"border": true
		},
		src: "/combination/image/icon_add_120@2x.png",
		textarea:"",
		index: 0,
		show: false,
	},

	getText(e) {
		this.setData({
			textarea:e.detail.value,
			index: e.detail.value.length,
		})
	},

	showPopup() {
		this.setData({
			show: true
		});
	},

	onClose() {
		this.setData({
			show: false
		});
	},

	selectIcon(e) {
		let then = this;
		let sourceType = [];
		let state = e.currentTarget.dataset['index'];
		if (state === "1") {
			sourceType.push('camera')
		} else {
			sourceType.push('album')
		}
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: sourceType,
			success(res) {
				let tempFilePaths = res.tempFilePaths;
				if (tempFilePaths) {
					var PicNums = res.tempFiles.length;
					for (var inta = 0; inta < PicNums; inta++) {
						var size = res.tempFiles[inta].size;
						var path = res.tempFiles[inta].path;
						var formatImage = path.split(".")[(path.split(".")).length - 1];
						console.log("图片格式" + formatImage)
						if (formatImage != "png" && formatImage != "PNG" && formatImage != "jpg" && formatImage != "JPG" && formatImage != "svg" && formatImage != "SVG" && formatImage != "gif" && formatImage != "GIF") {
							return wx.showToast({
								title: '只能上传.png、.jpg、.svg、.gif 格式',
								icon: 'none',
								image: '',
								duration: 2000,
								mask: true,
							})
						}
						if (size > 6144000) {
							return wx.showToast({
								title: '图片大小限制:' + 6 + "MB",
								icon: 'none',
								image: '',
								duration: 1500,
								mask: true,
							})
						}
					}
					wx.uploadFile({
						url: domain + api.upload.imgVideoUpload,
						filePath: tempFilePaths[0],
						name: 'file',
						success(res) {
							let item = JSON.parse(res.data);
							then.setData({
								src:item.data.fileUri
							})
							then.onClose()
						}
					})
				} else {
					then.onClose();
				}
			}
		})
	},

	submit(){
		let {src,textarea} = this.data;
		request.infoUpData({
			"headImgUri": src,
			"synopsis": textarea,
		}).then((res) => {
			wx.showToast({
				title: '更新成功！',
				duration: 2000
			})
			// wx.switchTab({
			// 	url: '/pages/mine/index',
			// })
			wx.navigateBack({
        delta: -1
      })
		}).catch((err) => {
			wx.showToast({
				title: err,
				icon: 'none',
				duration: 2500
			})
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (options) {
			let item = JSON.parse(options.item)
			this.setData({
				src:item.headImgUri,
				textarea:item.synopsis, 
			})
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})