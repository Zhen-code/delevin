// combination/pages/sharePoster/index.js
const {request} = require('../../../request/request');
const {getImageInfo} = require('../../../utils/util');
import drawQrcode from '../../../miniprogram_npm/weapp-qrcode/index';
const { to2Px} = require('../../../utils/util');
const {topHeight} = require('../../../request/topHeight');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgPath1: '',
		imgPath2: '',
		imgPath3: '',
		imgPath4: '',
		imgPath5: '',
		imgPath6: '',
		imgPath7: '',
		img1Height: 0,
		posterList: [],
		dataInfo: '',
		userInfo: '',
		clientWidth: '',
		qrCodePath: '',
		index: 1,
		phoneImgPath: '',
		saveTempCanvas: '',
		saveTempCanvas1: '',
		saveTempCanvas2: '',
		saveTempCanvas3: '',
		pic_resources: '',
		disable: true,
		paddingTop:topHeight,
		bgColor: {
			"color": true,
			"border": true
		},
		title: '获客海报分享',
		show: true,
		agentId: '',
		userId: '',
		unitPrice: '',
		unitTitle: '',
		unit:''
	},
	getUnit(){
		let unitPrice = 0;
		let unitTitle = '';
		let unit = '';
		if(this.data.dataInfo['houseMold'] === 'ESTATE'){
			unitPrice = this.data.dataInfo['unitPrice'];
			unitTitle = '单价:';
			unit = '元/m²';
		}else if(this.data.dataInfo['houseMold'] === 'SECOND_HAND'){
			unitPrice =  this.data.dataInfo['totalPrice'];
			unitTitle = '总价:';
			unit = '万';
		}else if(this.data.dataInfo['houseMold'] === 'TENANCY'){
			unitPrice = this.data.dataInfo['monthRent'];
			unitTitle = '总价:';
			unit = '月/元'
		}else if(this.data.dataInfo['houseMold'] === 'RESIDENTIAL_QUARTERS'){
			unitPrice = this.data.dataInfo['averagePrice'];
			unitTitle = '当月均价:';
			unit = '元/m²';
		}
		this.setData({
			unitPrice,
			unitTitle,
			unit
		});
	},
	onChange(current,source){
		console.log(current)
		this.setData({
			index: Number(1+current.detail['current'])
		});
	},
	renderTitle(ctx,str,left,initTop,canvasWidth){
		let lineWidth = 0;
		let lastSubStrIndex = 0;
		for(let i = 0;i<str.length;i++){
			lineWidth = lineWidth+ctx.measureText(str[i]).width;
			if(lineWidth>canvasWidth){
				ctx.setFillStyle('#FFFFFF');
				ctx.font = '18px PingFangSC-Medium,PingFang SC';
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
	renderTitle1(ctx,str,left,initTop,canvasWidth){
		let lineWidth = 0;
		let lastSubStrIndex = 0;
		for(let i = 0;i<str.length;i++){
			lineWidth = lineWidth+ctx.measureText(str[i]).width;
			if(lineWidth>canvasWidth){
				ctx.setFillStyle('#333333');
				ctx.font = '18px PingFangSC-Medium,PingFang SC';
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
	renderTitle2(ctx,str,left,initTop,canvasWidth){
		let lineWidth = 0;
		let lastSubStrIndex = 0;
		for(let i = 0;i<str.length;i++){
			lineWidth = lineWidth+ctx.measureText(str[i]).width;
			if(lineWidth>canvasWidth){
				ctx.setFillStyle('#333333');
				ctx.font = '16px PingFangSC-Medium,PingFang SC';
				ctx.fillText(str.substring(lastSubStrIndex,i),left,initTop);
				lastSubStrIndex = i;
				lineWidth = 0;
				initTop+=18;
			}
			if(i === str.length-1){
				ctx.setFillStyle('#333333');
				ctx.font = '16px PingFangSC-Medium,PingFang SC';
				ctx.fillText(str.substring(lastSubStrIndex,i+1),left,initTop);
			}
		}
	},
	renderText(ctx,str,left,initTop,canvasWidth){
	let lineWidth = 0;
	let lastSubStrIndex = 0;
	for(let i = 0;i<str.length;i++){
		lineWidth = lineWidth+ctx.measureText(str[i]).width;
		if(lineWidth>canvasWidth){
			ctx.setFillStyle('#999999');
			ctx.font = '13px PingFangSC-Regular,PingFang SC';
			ctx.fillText(str.substring(lastSubStrIndex,i),left,initTop);
			lastSubStrIndex = i;
			lineWidth = 0;
			initTop+=18;
		}
		if(i === str.length-1){
			ctx.setFillStyle('#999999');
			ctx.font = '13px PingFangSC-Regular,PingFang SC';
			ctx.fillText(str.substring(lastSubStrIndex,i+1),left,initTop);
		}
	}
	},
	go(){
		const query = wx.createSelectorQuery();
		let allHeight = 0;
		let allWidth = 0;
		let that = this;
		const dpr = wx.getSystemInfoSync().pixelRatio;
		query.select('#share')
			.fields({ node: true, size: true })
			.exec((res) => {
				allWidth  = res[0].width;
				allHeight =  res[0].height;
				const ctx1 = wx.createCanvasContext('share');
				ctx1.drawImage(this.data.imgPath1,0,0,allWidth,375);
				ctx1.setFontSize(18);
				ctx1.setFillStyle('white');
				let titleLeft = to2Px(allWidth,48);
				this.renderTitle(ctx1,this.data.dataInfo['title'],titleLeft,48,to2Px(allWidth,504));
				ctx1.setFontSize(13);
				ctx1.setFillStyle('white');
				ctx1.fillText(that.data.unitTitle,titleLeft,100);
				let unitPriceLeft = to2Px(allWidth,178);
				ctx1.setFontSize(18);
				ctx1.setFillStyle('#FFD793');
				ctx1.fillText(that.data.unitPrice + that.data.unit,unitPriceLeft,100);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('white');
				ctx1.fillText('开盘地址:',titleLeft,120);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('white');
				let detailsAddressLeft = to2Px(allWidth,178);
				let detailsAddress = this.data.dataInfo['detailsAddress'].substr(0,18);
				ctx1.fillText(detailsAddress+'...',detailsAddressLeft,120);
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
				let qrImgLeft = to2Px(allWidth,490);
				console.log(this.data.qrCodePath)
				ctx1.drawImage(this.data.qrCodePath,qrImgLeft,400,70,70);
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
						quality: 1,
						success:(res)=>{
							console.log(res)
							this.setData({
								saveTempCanvas: res.tempFilePath,
								isDisable: false
							})
						},
						fail:(err)=>{
							console.log(err)
						},
						complete:()=>{
							if(this.data.saveTempCanvas!=="" && this.data.saveTempCanvas1!=="" && this.data.saveTempCanvas2!=="" && this.data.saveTempCanvas3!==""){
								that.setData({
									disable: false
								})
							}

						}
					})
				});
			});
	},

	go1(){
		let that = this;
		const query = wx.createSelectorQuery();
		let allHeight = 0;
		let allWidth = 0;
		const dpr = wx.getSystemInfoSync().pixelRatio;
		query.select('#share1')
			.fields({ node: true, size: true })
			.exec((res) => {
				allWidth  = res[0].width;
				allHeight =  res[0].height;
				const ctx1 = wx.createCanvasContext('share1');
				ctx1.drawImage(this.data.imgPath2,0,0,allWidth,375);
				ctx1.setFontSize(18);
				ctx1.setFillStyle('white');
				let titleLeft = to2Px(allWidth,48);
				this.renderTitle1(ctx1,this.data.dataInfo['title'],titleLeft,93,to2Px(allWidth,498));
				ctx1.setFontSize(13);
				ctx1.setFillStyle('#999999');
				ctx1.fillText(that.data.unitTitle,titleLeft,150);
				let unitPriceLeft = to2Px(allWidth,178);
				ctx1.setFontSize(18);
				ctx1.setFillStyle('#FE6300');
				let unitPrice = 0;
				if(this.data.dataInfo['houseMold'] === 'ESTATE'){
					unitPrice = this.data.dataInfo['unitPrice'];

				}else if(this.data.dataInfo['houseMold'] === 'SECOND_HAND'){
					unitPrice =  this.data.dataInfo['averagePrice'];
				}else if(this.data.dataInfo['houseMold'] === 'TENANCY'){
					unitPrice = this.data.dataInfo['monthRent'];
				}else if(this.data.dataInfo['houseMold'] === 'RESIDENTIAL_QUARTERS'){
					unitPrice = this.data.dataInfo['rentalAveragePrice'];
				}
				ctx1.fillText(that.data.unitPrice +that.data.unit,unitPriceLeft,150);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('#999999');
				ctx1.fillText('开盘地址:',titleLeft,166);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('#999999');
				let detailsAddressLeft = to2Px(allWidth,178);
				let detailsAddress = this.data.dataInfo['detailsAddress'];
				ctx1.fillText(detailsAddress+'...',detailsAddressLeft,166);
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
				let qrImgLeft = to2Px(allWidth,490);
				console.log(this.data.qrCodePath)
				ctx1.drawImage(this.data.qrCodePath,qrImgLeft,400,70,70);
				ctx1.draw(false,()=>{
					wx.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: allWidth,
						height: allHeight,
						destWidth: allWidth*dpr,
						destHeight: allHeight*dpr,
						fileType: 'png',
						canvasId: 'share1',
						quality: 1,
						success:(res)=>{
							console.log(res)
							this.setData({
								saveTempCanvas1: res.tempFilePath,
								isDisable: false
							})
						},
						fail:(err)=>{
							console.log(err)
						},
						complete:()=>{
							if(this.data.saveTempCanvas!=="" && this.data.saveTempCanvas1!=="" && this.data.saveTempCanvas2!=="" && this.data.saveTempCanvas3!==""){
								that.setData({
									disable: false
								})
							}

						}
					})
				});
			});
	},

	go2(){
		let that = this;
		const query = wx.createSelectorQuery();
		let allHeight = 0;
		let allWidth = 0;
		const dpr = wx.getSystemInfoSync().pixelRatio;
		query.select('#share2')
			.fields({ node: true, size: true })
			.exec((res) => {
				allWidth  = res[0].width;
				allHeight =  res[0].height;
				const ctx1 = wx.createCanvasContext('share2');
				ctx1.rect(0,0,allWidth,allHeight);
				ctx1.setFillStyle('white');
				ctx1.fill();
				let titleLeft = to2Px(allWidth,116);
				this.renderTitle2(ctx1,this.data.dataInfo['title'],titleLeft,48,to2Px(allWidth,500));
				ctx1.setFontSize(13);
				ctx1.setFillStyle('#999999');
				ctx1.fillText(that.data.unitTitle,titleLeft,100);
				let unitPriceLeft = to2Px(allWidth,246);
				ctx1.setFontSize(18);
				ctx1.setFillStyle('#FE6300');
				let unitPrice = 0;
				if(this.data.dataInfo['houseMold'] === 'ESTATE'){
					unitPrice = this.data.dataInfo['unitPrice'];

				}else if(this.data.dataInfo['houseMold'] === 'SECOND_HAND'){
					unitPrice =  this.data.dataInfo['averagePrice'];
				}else if(this.data.dataInfo['houseMold'] === 'TENANCY'){
					unitPrice = this.data.dataInfo['monthRent'];
				}else if(this.data.dataInfo['houseMold'] === 'RESIDENTIAL_QUARTERS'){
					unitPrice = this.data.dataInfo['rentalAveragePrice'];
				}
				ctx1.fillText(that.data.unitPrice + that.data.unit,unitPriceLeft,100);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('#999999');
				ctx1.fillText('开盘地址:',titleLeft,120);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('#999999');
				let detailsAddressLeft = to2Px(allWidth,242);
				let detailAddress = this.data.dataInfo['detailsAddress'].substr(0,14);
				ctx1.fillText(detailAddress+'...',detailsAddressLeft,120);
				ctx1.drawImage(this.data.imgPath3,titleLeft,130,to2Px(allWidth,520),150);
				if(this.data.imgPath5!==''){
					ctx1.drawImage(this.data.imgPath5,titleLeft,288,to2Px(allWidth,166),84);
				}
				if(this.data.imgPath6!==''){
					ctx1.drawImage(this.data.imgPath6,to2Px(allWidth,294),288,to2Px(allWidth,166),84);
				}
				if(this.data.imgPath7!==''){
					ctx1.drawImage(this.data.imgPath7,to2Px(allWidth,470),288,to2Px(allWidth,166),84);
				}
				ctx1.setFontSize(15);
				ctx1.setFillStyle('black');
				let nameLeft = to2Px(allWidth,116);
				ctx1.fillText(this.data.userInfo['realName'],nameLeft,412);
				ctx1.drawImage(this.data.phoneImgPath,nameLeft,422,to2Px(allWidth,36),to2Px(allWidth,36));
				let phoneLeft = to2Px(allWidth,164);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('black');
				ctx1.font = '13px PingFangSC-Regular,PingFang SC';
				ctx1.fillText(this.data.userInfo['phone'],phoneLeft,435);
				let str = this.data.userInfo['synopsis']===""?'暂无简介':this.data.userInfo['synopsis'];
				let mulitipleWidth = to2Px(allWidth,320);
				this.renderText(ctx1,str,nameLeft,466,mulitipleWidth);
				let qrImgLeft = to2Px(allWidth,476);
				console.log(this.data.qrCodePath)
				ctx1.drawImage(this.data.qrCodePath,qrImgLeft,390,70,70);
				ctx1.draw(false,()=>{
					wx.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: allWidth,
						height: allHeight,
						destWidth: allWidth*dpr,
						destHeight: allHeight*dpr,
						fileType: 'png',
						canvasId: 'share2',
						quality: 1,
						success:(res)=>{
							console.log(res)
							this.setData({
								saveTempCanvas2: res.tempFilePath,
								isDisable: false
							})
						},
						fail:(err)=>{
							console.log(err)
						},
						complete:()=>{
							if(this.data.saveTempCanvas!=="" && this.data.saveTempCanvas1!=="" && this.data.saveTempCanvas2!=="" && this.data.saveTempCanvas3!==""){
								that.setData({
									disable: false
								})
							}

						}
					})
				});
			});
	},

	go3(){
		let that = this;
		const query = wx.createSelectorQuery();
		let allHeight = 0;
		let allWidth = 0;
		const dpr = wx.getSystemInfoSync().pixelRatio;
		query.select('#share3')
			.fields({ node: true, size: true })
			.exec((res) => {
				allWidth  = res[0].width;
				allHeight =  res[0].height;
				const ctx1 = wx.createCanvasContext('share3');
				ctx1.rect(0,0,allWidth,allHeight);
				ctx1.setFillStyle('white');
				ctx1.fill();
				ctx1.setFontSize(15);
				ctx1.setFillStyle('black');
				let nameLeft = to2Px(allWidth,116);
				ctx1.fillText(this.data.userInfo['realName'],nameLeft,16);
				ctx1.drawImage(this.data.phoneImgPath,nameLeft,26,to2Px(allWidth,36),to2Px(allWidth,36));
				let phoneLeft = to2Px(allWidth,164);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('black');
				ctx1.font = '13px PingFangSC-Regular,PingFang SC';
				ctx1.fillText(this.data.userInfo['phone'],phoneLeft,41);
				let str = this.data.userInfo['synopsis']===""?'暂无简介':this.data.userInfo['synopsis'];
				let mulitipleWidth = to2Px(allWidth,310);
				this.renderText(ctx1,str,nameLeft,70,mulitipleWidth);
				let qrImgLeft = to2Px(allWidth,486);
				ctx1.drawImage(this.data.qrCodePath,qrImgLeft,1,70,70);
				ctx1.drawImage(this.data.imgPath4,nameLeft,109,to2Px(allWidth,520),262);
				ctx1.drawImage(this.data.pic_resources,to2Px(allWidth,488),325,to2Px(allWidth,188),to2Px(allWidth,188));
				let titleLeft = to2Px(allWidth,116);
				this.renderTitle2(ctx1,this.data.dataInfo['title'],titleLeft,390,to2Px(allWidth,324));
				ctx1.setFontSize(13);
				ctx1.setFillStyle('#999999');
				ctx1.fillText(that.data.unitTitle,titleLeft,450);
				let unitPriceLeft = to2Px(allWidth,246);
				ctx1.setFontSize(18);
				ctx1.setFillStyle('#FE6300');
				let unitPrice = 0;
				if(this.data.dataInfo['houseMold'] === 'ESTATE'){
					unitPrice = this.data.dataInfo['unitPrice'];
				}else if(this.data.dataInfo['houseMold'] === 'SECOND_HAND'){
					unitPrice =  this.data.dataInfo['averagePrice'];
				}else if(this.data.dataInfo['houseMold'] === 'TENANCY'){
					unitPrice = this.data.dataInfo['monthRent'];
				}else if(this.data.dataInfo['houseMold'] === 'RESIDENTIAL_QUARTERS'){
					unitPrice = this.data.dataInfo['rentalAveragePrice'];
				}
				ctx1.fillText(that.data.unitPrice + that.data.unit,unitPriceLeft,452);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('#999999');
				ctx1.fillText('开盘地址:',titleLeft,480);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('#999999');
				let detailsAddressLeft = to2Px(allWidth,242);
				let detailAdress = this.data.dataInfo['detailsAddress'].substr(0,14);
				ctx1.fillText(detailAdress+'...',detailsAddressLeft,480);
				ctx1.draw(false,()=>{
					wx.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: allWidth,
						height: allHeight,
						destWidth: allWidth*dpr,
						destHeight: allHeight*dpr,
						fileType: 'png',
						canvasId: 'share3',
						quality: 1,
						success:(res)=>{
							console.log(res)
							this.setData({
								saveTempCanvas3: res.tempFilePath,
								isDisable: false
							})
						},
						fail:(err)=>{
							console.log(err)
						},
						complete:()=>{
							if(this.data.saveTempCanvas!=="" && this.data.saveTempCanvas1!=="" && this.data.saveTempCanvas2!=="" && this.data.saveTempCanvas3!==""){
								that.setData({
									disable: false
								})
							}
							that.setData({
								show: false
							});
						}
					})
				});
			});
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let agentId = wx.getStorageSync('agentId');
		let userId = wx.getStorageSync('userId');
		let resultInfo = wx.getSystemInfoSync();
		let parseObj = JSON.parse(options.data);//转换跳转参数
		console.log(parseObj.item);
		this.setData({
			dataInfo: parseObj.item,
			agentId:agentId,
			userId: userId
		},()=>{
			this.getUnit();
		});
		let designSketch = parseObj.item['designSketch'];
		getImageInfo(designSketch[0]).then(res=>{
			console.log(res)
			this.setData({
				imgPath3: res.path
			});
		}).catch(err=>{
			console.log(err)
		});
		getImageInfo(designSketch[0]).then(res=>{
			console.log(res)
			this.setData({
				imgPath4: res.path
			});
		}).catch(err=>{
			console.log(err)
		});
		if(designSketch[1]){
			getImageInfo(designSketch[1]).then(res=>{
				console.log(res)
				this.setData({
					imgPath5: res.path
				});
			}).catch(err=>{
				console.log(err)
			});
		}
		if(designSketch[2]){
			getImageInfo(designSketch[2]).then(res=>{
				console.log(res)
				this.setData({
					imgPath6: res.path
				});
			}).catch(err=>{
				console.log(err)
			});
		}
		if(designSketch[3]){
			getImageInfo(designSketch[3]).then(res=>{
				console.log(res)
				this.setData({
					imgPath7: res.path
				});
			}).catch(err=>{
				console.log(err)
			});
		}
		request.posterTemplate({}).then(res=>{
			this.setData({
				posterList: res
			});
			let imgPath1 = res[0].backgroundUri.replace(/[\'|\"]/g,"");
			let imgPath2 = res[1].backgroundUri.replace(/[\'|\"]/g,"");
			getImageInfo(imgPath1).then(res=>{
				console.log(res)
				console.log('图片高度')
				console.log(Number(resultInfo.screenWidth*720/750))
				this.setData({
					imgPath1: res.path,
					img1Height: Number(resultInfo.screenWidth*720/750)
				});
				this.go();
				this.go1();
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
		getImageInfo('../../image/pic_resources.png').then(res=>{
			console.log(res)
			this.setData({
				pic_resources: '../../../'+res.path
			})
		}).catch(err=>{
			console.log(err)
		})
	},

	drawQR(){
		let that = this;
		let res = wx.getSystemInfoSync();
		this.setData({
			clientWidth:  res.screenWidth
		});
		let qrCodeCtx =  wx.createCanvasContext('myQrcode');
		drawQrcode({
			width: 70,
			height: 70,
			canvasId: 'myQrcode',
			ctx: qrCodeCtx,
			text: `https://dev.delevin.beiru168.com/homepage?agentId=${that.data.agentId}&userId=${that.data.userId}`,
			callback: (e)=>{
				console.log(e)
				if(e['errMsg'].includes('ok')){
					console.log('二维码绘制完成');
					setTimeout(()=>{
						wx.canvasToTempFilePath({
							canvasId: 'myQrcode',
							quality: 1,
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
								that.go();
								that.go1();
								that.go2();
								that.go3();
							}
						})
					},1000);
				}else{
					wx.showToast({
						title: '二维码生成失败，请重新再试!'
					})
				}
			}
		})
	},
	drawQR1(){
		const that = this;
		let qrCodeCtx =  wx.createCanvasContext('myQrcode1');
		drawQrcode({
			width: 70,
			height: 70,
			canvasId: 'myQrcode1',
			ctx: qrCodeCtx,
			text: `https://dev.delevin.beiru168.com/homepage?agentId=${that.data.agentId}&userId=${that.data.userId}`,
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
		const that = this;
		let qrCodeCtx =  wx.createCanvasContext('myQrcode2');
		drawQrcode({
			width: 70,
			height: 70,
			canvasId: 'myQrcode2',
			ctx: qrCodeCtx,
			text: `https://dev.delevin.beiru168.com/homepage?agentId=${that.data.agentId}&userId=${that.data.userId}`,
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
		const that = this;
		let qrCodeCtx =  wx.createCanvasContext('myQrcode3');
		drawQrcode({
			width: 70,
			height: 70,
			canvasId: 'myQrcode3',
			ctx: qrCodeCtx,
			text: `https://dev.delevin.beiru168.com/homepage?agentId=${that.data.agentId}&userId=${that.data.userId}`,
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
	saveImg(){
		let {index,saveTempCanvas,saveTempCanvas1,saveTempCanvas2,saveTempCanvas3} = this.data;
		let filePath = '';
		switch (index) {
			case 1:
				filePath = saveTempCanvas;
				break;
			case 2:
				filePath = saveTempCanvas1;
				break;
			case 3:
				filePath = saveTempCanvas2;
				break;
			case 4:
				filePath = saveTempCanvas3;
				break;
			default:
				wx.showToast({
					title: '图片生成出错',
					icon: 'none'
				});
				break;
		}
		wx.hideLoading();
		wx.showModal({
			title: '图片保存',
			content: '是否保存图片',
			confirmText: '保存',
			cancelText: '取消',
			showCancel: true,
			success(result){
				if(result.confirm){
					wx.saveImageToPhotosAlbum({
						filePath: filePath,
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
				}else{

				}
			}
		})
	},
	save(){
		if(this.data.disable){
			return
		}
		wx.showLoading({
			title: '图片生成中!'
		});
		let that = this;
		wx.getSetting({
			success(res){
				console.log(res)
				let auth = res.authSetting['scope.writePhotosAlbum'];
				console.log(auth)
				if(auth || auth===undefined){
					that.saveImg();
				}else{
					wx.openSetting({
						success(res){
							console.log(res)
							if(res.authSetting['scope.writePhotosAlbum']){
								that.saveImg();
							}else{
								wx.showToast({
									title: '请先授权图片存储权限',
									icon: "none",
									duration: 1000
								})
							}
						},
						fail(err){
							console.log(err)
						}
					})
				}
			},
			fail(err){
				console.log(err)
			}
		});
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
			let synopsis = res.synopsis===""?'暂无简介':res.synopsis.substr(0,20)+'...';
			this.setData({
				userInfo: {...res,synopsis:synopsis}
			})
		}).catch(err=>{
			console.log(err)
		});
		wx.hideShareMenu({
			menus: ['shareAppMessage', 'shareTimeline']
		});
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
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
		return false
		// return{
		// 	title: '经纪人主页',
		// 	path: '/combination/pages/homepage/index?agentId='+this.data.agentId+'&userId='+this.data.userId,
		// }
	}
})
