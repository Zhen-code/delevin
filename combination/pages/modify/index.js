// combination/pages/modify/index.js
const topHeight = require('../../../request/topHeight.js').topHeight
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		paddingTop:topHeight,
		bgColor: {
      "color": true,
      "border": true
		},
		src:"/combination/image/icon_add_120@2x.png",
		index:0,
		show: false,
	},

	getText(e){
		this.setData({
			index:e.detail.value.length
		})
	},

	showPopup(){
		this.setData({ show: true });
	},

	onClose(){
		this.setData({ show: false });
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
						url: domain + api.index.infoIcon,
						filePath: tempFilePaths[0],
						name: 'file',
						success(res) {
							let item = JSON.parse(res.data);
							request.getInfoUpdate({
								"headImgUri": item.data.fileUri,
							}).then((res) => {
								wx.showToast({
									title: '更新成功！',
									duration: 2000
								})
								then.iconHide();
								then.getData();
							}).catch((err)=>{
								wx.showToast({
									title: err,
									icon: 'none',
									duration: 2500
								})
							})
						}
					})
				} else {
					then.onClose();
				}
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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