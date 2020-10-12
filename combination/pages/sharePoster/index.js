// combination/pages/sharePoster/index.js
const {request} = require('../../../request/request');
const {getImageInfo} = require('../../../utils/util');
import drawQrcode from '../../../miniprogram_npm/weapp-qrcode/index';
const { to2Px} = require('../../../utils/util');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgPath1: '',
		imgPath2: '',
		imgPath3: '',
		imgPath4: '',
		img1Height: 0,
		posterList: [],
		dataInfo: '',
		userInfo: '',
		clientWidth: '',
		qrCodePath: '',
		index: 1,
		phoneImgPath: ''
	},

	onChange(current,source){
		console.log(current)
		this.setData({
			index: Number(1+current.detail['current'])
		});
	},
	renderText(ctx,str,left,initTop,canvasWidth){
	let lineWidth = 0;
	let lastSubStrIndex = 0;
	for(let i = 0;i<str.length;i++){
		lineWidth = lineWidth+ctx.measureText(str[i]).width;
		if(lineWidth>canvasWidth){
			ctx.setFillStyle('Dark gray');
			ctx.font = '13px PingFangSC-Regular,PingFang SC';
			ctx.fillText(str.substring(lastSubStrIndex,i),left,initTop);
			lastSubStrIndex = i;
			lineWidth = 0;
			initTop+=18;
		}
		if(i === str.length-1){
			ctx.fillText(str.substring(lastSubStrIndex,i+1),left,initTop);
		}
	}
	},
	go(){
		const query = wx.createSelectorQuery();
		let allHeight = 0;
		let allWidth = 0;
		const dpr = wx.getSystemInfoSync().pixelRatio;
		query.select('#share')
			.fields({ node: true, size: true })
			.exec((res) => {
				allWidth  = res[0].width;
				allHeight =  res[0].height;
				const ctx1 = wx.createCanvasContext('share');
				ctx1.setFontSize(18);
				ctx1.setFillStyle('black');
				let titleLeft = to2Px(allWidth,48);
				console.log(this.data.dataInfo['title'])
				ctx1.fillText('好烦',80,80);
				ctx1.drawImage(this.data.imgPath1,0,0,allWidth,375);
				ctx1.rect(0,375,allWidth,allHeight-375);
				ctx1.setFillStyle('white');
				ctx1.fill();
				ctx1.setFontSize(15);
				ctx1.setFillStyle('black');
				let nameLeft = to2Px(allWidth,40);
				ctx1.fillText(this.data.userInfo['realName'],nameLeft,412);
				ctx1.drawImage(this.data.phoneImgPath,nameLeft,422,to2Px(allWidth,36),to2Px(allWidth,36));
				let phoneLeft = to2Px(allWidth,88);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('black');
				ctx1.font = '13px PingFangSC-Regular,PingFang SC';
				ctx1.fillText(this.data.userInfo['phone'],phoneLeft,435);
				let str = this.data.userInfo['synopsis']===""?'暂无简介':this.data.userInfo['synopsis'];
				let mulitipleWidth = to2Px(allWidth,360);
				this.renderText(ctx1,str,nameLeft,466,mulitipleWidth);
				let qrImgLeft = to2Px(allWidth,460);
				console.log(this.data.qrCodePath)
				ctx1.drawImage(this.data.qrCodePath,qrImgLeft,400,100,100);
				ctx1.draw(false,()=>{
					wx.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: allWidth,
						height: allHeight,
						destWidth: allWidth*dpr,
						destHeight: allHeight*dpr,
						fileType: 'png',
						canvasId: 'share',
						quality: 0,
						success:(res)=>{
							console.log(res)
							this.setData({
								saveTempCanvas: res.tempFilePath,
								isDisable: false
							})
						},
						fail:(err)=>{
							console.log(err)
						}
					})
				});
			});
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let resultInfo = wx.getSystemInfoSync();
		let parseObj = JSON.parse(options.data);
		this.setData({
			dataInfo: parseObj.item
		});
		request.posterTemplate({}).then(res=>{
			this.setData({
				posterList: res
			});
			let imgPath1 = res[0].backgroundUri.replace(/[\'|\"]/g,"");
			let imgPath2 = res[0].backgroundUri.replace(/[\'|\"]/g,"");
			let imgPath3 = res[0].backgroundUri.replace(/[\'|\"]/g,"");
			let imgPath4 = res[0].backgroundUri.replace(/[\'|\"]/g,"");
			getImageInfo(imgPath1).then(res=>{
				console.log(res)
				console.log('图片高度')
				console.log(Number(resultInfo.screenWidth*720/750))
				this.setData({
					imgPath1: res.path,
					img1Height: Number(resultInfo.screenWidth*720/750)
				});
				this.go();
			}).catch(err=>{
				console.log(err)
			});
			getImageInfo(imgPath2).then(res=>{
				console.log(res)
				this.setData({
					imgPath2: res.path
				});
			}).catch(err=>{
				console.log(err)
			});
			getImageInfo(imgPath3).then(res=>{
				console.log(res)
				this.setData({
					imgPath3: res.path
				});
			}).catch(err=>{
				console.log(err)
			});
			getImageInfo(imgPath4).then(res=>{
				console.log(res)
				this.setData({
					imgPath4: res.path
				});
			}).catch(err=>{
				console.log(err)
			});
		}).catch(err=>{
			console.log(err)
		});
		getImageInfo('../../image/icon_phonecall_30@2x.png').then(res=>{
			console.log(res)
			this.setData({
				phoneImgPath: '../../../'+res.path
			})
		}).catch(err=>{
			console.log(err)
		});
	},

	drawQR(){
		let that = this;
		let res = wx.getSystemInfoSync();
		this.setData({
			clientWidth:  res.screenWidth
		});
		let qrCodeCtx =  wx.createCanvasContext('myQrcode');
		let width = to2Px(res.screenWidth,100);
		let height = to2Px(res.screenWidth,100);
		drawQrcode({
			width: width,
			height: height,
			canvasId: 'myQrcode',
			ctx: qrCodeCtx,
			text: 'https://baidu.com',
			callback: (e)=>{
				console.log(e)
				if(e['errMsg'].includes('ok')){
					console.log('二维码绘制完成');
					wx.canvasToTempFilePath({
						canvasId: 'myQrcode',
						quality: 0,
						success:(res)=>{
							console.log(res)
							this.setData({
								qrCodePath: res.tempFilePath
							})
						},
						fail:(err)=>{
							console.log(err)
						},
						complete: ()=>{
							that.go()
						}
					})
				}else{
					wx.showToast({
						title: '二维码生成失败，请重新再试!'
					})
				}
			}
		})
	},
	drawQR1(){
		let qrCodeCtx =  wx.createCanvasContext('myQrcode1');
		let width = to2Px(this.data.clientWidth,100);
		let height = to2Px(this.data.clientWidth,100);
		drawQrcode({
			width: width,
			height: height,
			canvasId: 'myQrcode1',
			ctx: qrCodeCtx,
			text: 'https://baidu.com',
			callback: (e)=>{
				console.log(e)
				if(e['errMsg'].includes('ok')){
					console.log('二维码绘制完成');
				}else{
					wx.showToast({
						title: '二维码生成失败，请重新再试!'
					})
				}
			}
		})
	},
	drawQR2(){
		let qrCodeCtx =  wx.createCanvasContext('myQrcode2');
		let width = to2Px(this.data.clientWidth,100);
		let height = to2Px(this.data.clientWidth,100);
		drawQrcode({
			width: width,
			height: height,
			canvasId: 'myQrcode2',
			ctx: qrCodeCtx,
			text: 'https://baidu.com',
			callback: (e)=>{
				console.log(e)
				if(e['errMsg'].includes('ok')){
					console.log('二维码绘制完成');
				}else{
					wx.showToast({
						title: '二维码生成失败，请重新再试!'
					})
				}
			}
		})
	},
	drawQR3(){
		let qrCodeCtx =  wx.createCanvasContext('myQrcode3');
		let width = to2Px(this.data.clientWidth,100);
		let height = to2Px(this.data.clientWidth,100);
		drawQrcode({
			width: width,
			height: height,
			canvasId: 'myQrcode3',
			ctx: qrCodeCtx,
			text: 'https://baidu.com',
			callback: (e)=>{
				console.log(e)
				if(e['errMsg'].includes('ok')){
					console.log('二维码绘制完成');
				}else{
					wx.showToast({
						title: '二维码生成失败，请重新再试!'
					})
				}
			}
		})
	},
	save(){
		wx.saveImageToPhotosAlbum({
			filePath: this.data.saveTempCanvas,
			success: (res)=>{
				wx.showToast({
					title: '图片保存成功',
					icon: "none",
					duration: 1000
				})
			},
			fail:(err)=>{
				wx.showToast({
					title: '图片保存失败，请重新再试',
					icon: "none",
					duration: 1000
				})
			}
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		this.drawQR();
		this.drawQR1();
		this.drawQR2();
		this.drawQR3();
		},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		request.information().then(res=>{
			console.log(res)
			let synopsis = res.synopsis===""?'暂无简介':res.synopsis;
			this.setData({
				userInfo: {...res,synopsis:synopsis}
			})
		}).catch(err=>{
			console.log(err)
		})
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
