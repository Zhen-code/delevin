const app = getApp()
const {
	request
} = require('../../../request/request.js');
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
		show: false,
		store: "",
		name: "",
		jobNumber: "",
		phone: "",
		src: "",
		code: "",
		storeId: "",
		counting: true,
		code_msg: "获取验证码",
		icon: "close",
		userInfo: {},
		type: false,
		resultStatus: '',
		resultStatusType: '',
		resultInfo: '',
		onShow: true,
		text: '提交审核',
		image: [],
	},

	hide() {
		this.setData({
			onShow: false
		})
	},

	toChooseAnInstitution(e) {
		if (!e.currentTarget.dataset.item) {
			wx.navigateTo({
				url: `/combination/pages/chooseAnInstitution/index`,
			})
		}
	},

	onClose() {
		this.setData({
			show: false
		});
	},

	getFileUri(e) {
		this.setData({
			show: true,
			src: e.detail.e[0].url
		})
	},

	getInputValue(e) {
		this.setData({
			show: true,
			[`${e.currentTarget.dataset.model}`]: e.detail.value,
		});
	},

	countDown(that, count) {
		if (count == 0) {
			that.setData({
				code_msg: '获取验证码',
				counting: true
			})
			return;
		}
		that.setData({
			counting: false,
			code_msg: count + '秒后重发',
		})
		setTimeout(function () {
			count--;
			that.countDown(that, count);
		}, 1000);
	},

	getCode() {
		if (this.data.phone) {
			if (this.data.counting) {
				request.code({
					"phone": this.data.phone
				}).then((res) => {
					this.countDown(this, 60)
					this.setData({
						show: true,
					})
					wx.showToast({
						title: '验证码已发送',
						icon: 'success',
						duration: 2500
					})
				}).catch((err) => {
					wx.showToast({
						title: '发送失败',
						icon: 'none',
						duration: 2500
					})
				})
			} else {
				wx.showToast({
					title: '请勿重复操作',
					icon: 'none',
					duration: 2500
				})
			}
		} else {
			wx.showToast({
				title: '请输入手机号码！',
				icon: 'none',
				duration: 2500
			})
		}
	},

	submit() {
		let {
			store,
			name,
			jobNumber,
			phone,
			src,
			storeId,
			code,
		} = this.data;
		if (
			store && name && jobNumber && phone && src && code !== '') {
			request.application({
				"code": code,
				"jobNumber": jobNumber,
				"phone": phone,
				"realName": name,
				"storeId": storeId,
				"workingPhotos": src
			}).then((res) => {
				wx.showToast({
					title: '提交成功',
					icon: 'success',
					duration: 2500
				})
				this.getInfo()
			}).catch((err) => {
				wx.showToast({
					title: '请求失败',
					icon: 'none',
					duration: 2500
				})
			})
		} else {
			wx.showToast({
				title: '请完善个人资料',
				icon: 'none',
				duration: 2500
			})
		}
	},

	getInfo() {
		request.information().then((res) => {
			if (!res.resultStatus) {
				if (res.identity === "AGENT") {
					this.setData({
						type: true,
					}, () => {
						this.getData()
					})
				} else {
					this.setData({
						type: false,
						text: '提交申请',
					})
				}
			} else {
				this.setData({
					text: '去提交',
				}, () => {
					this.getData()
				})
			}
		}).catch((err) => {
			console.log(err)
		})
	},

	getData() {
		request.result().then((res) => {
			switch (res.resultStatus) {
				case 'AUDITING':
					res.resultStatusType = '审核中';
					break;
				case 'PASS':
					res.resultStatusType = '审核通过';
					break;
				case 'REFUSE':
					res.resultStatusType = '审核拒绝';
					break;
				default:
			}
			let image = [{
				"url": res.workingPhotos
			}]
			this.setData({
				store: res.storeName,
				name: res.realName,
				jobNumber: res.jobNumber,
				phone: res.phone,
				src: res.workingPhotos,
				storeId: res.storeId,
				resultInfo: res.resultInfo,
				type: res.resultStatus === 'REFUSE' ? false : true,
				show: res.resultStatus === 'REFUSE' ? true : false,
				resultStatus: res.resultStatus,
				resultStatusType: res.resultStatusType,
				image: image,
			})
			console.log(res)
		}).catch((err) => {
			console.log(err)
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getInfo()
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
		if (app.globalData.storeInfo.item) {
			this.setData({
				show: true,
				storeId: app.globalData.storeInfo.item.id,
				store: app.globalData.storeInfo.item.name
			})
		}
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