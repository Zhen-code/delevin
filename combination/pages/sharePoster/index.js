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
		posterList: [],
		dataInfo: '',
		userInfo: '',
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
	renderText(ctx,str,left,initTop,canvasWidth,color='',size=0){
		let lineWidth = 0;
		let lastSubStrIndex = 0;
		for(let i = 0;i<str.length;i++){
			lineWidth = lineWidth+ctx.measureText(str[i]).width;
			if(lineWidth>canvasWidth){
				ctx.setFillStyle(color);
				ctx.font = `${size}px PingFangSC-Regular,PingFang SC`;
				ctx.fillText(str.substring(lastSubStrIndex,i),left,initTop+2);
				lastSubStrIndex = i;
				lineWidth = 0;
				initTop+=size;
			}
			if(i === str.length-1){
				ctx.setFillStyle(color);
				ctx.font = `${size}px PingFangSC-Regular,PingFang SC`;
				ctx.fillText(str.substring(lastSubStrIndex,i+1),left,initTop+2);
			}
		}
	},
	go(){
		const query = wx.createSelectorQuery();
		let allHeight = 0;
		let allWidth = 0;
		let that = this;
		const dpr = wx.getSystemInfoSync().pixelRatio;
		const screenWidth = wx.getSystemInfoSync().screenWidth;
		query.select('#share')
			.fields({ node: true, size: true })
			.exec((res) => {
				allWidth  = res[0].width;
				allHeight =  res[0].height;
				const ctx1 = wx.createCanvasContext('share');
				ctx1.rect(0,0,allWidth,allHeight);
				ctx1.setFillStyle('white');
				ctx1.fill();
				ctx1.drawImage(this.data.imgPath1,0,0,allWidth,to2Px(screenWidth,720));
				ctx1.setFontSize(18);
				ctx1.setFillStyle('white');
				let titleLeft = to2Px(screenWidth,48);
				this.renderTitle(ctx1,this.data.dataInfo['title'],titleLeft,48,to2Px(screenWidth,504));
				ctx1.setFontSize(13);
				ctx1.setFillStyle('white');
				ctx1.fillText(that.data.unitTitle,titleLeft,100);
				let unitPriceLeft = to2Px(screenWidth,182);
				ctx1.setFontSize(18);
				ctx1.setFillStyle('#FFD793');
				ctx1.fillText(that.data.unitPrice + that.data.unit,unitPriceLeft,100);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('white');
				ctx1.fillText('开盘地址:',titleLeft,122);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('white');
				let detailsAddressLeft = to2Px(screenWidth,182);
				let detailsAddress = this.data.dataInfo['detailsAddress'];
				this.renderText(ctx1,detailsAddress,detailsAddressLeft,120,to2Px(screenWidth,380),'#FFF',13);
				let nameLeft = to2Px(screenWidth,40);
				ctx1.setFillStyle('#333333');
				ctx1.setFontSize(15);
				ctx1.fillText(this.data.userInfo['realName'],nameLeft,to2Px(screenWidth,768));
				ctx1.drawImage(this.data.phoneImgPath,nameLeft,to2Px(screenWidth,790),to2Px(screenWidth,36),to2Px(screenWidth,36));
				let phoneLeft = to2Px(screenWidth,88);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('black');
				ctx1.font = '13px PingFangSC-Regular,PingFang SC';
				console.log()
				ctx1.fillText(this.data.userInfo['phone'],phoneLeft,to2Px(screenWidth,818));
				let str = this.data.userInfo['synopsis'];
				let mulitipleWidth = to2Px(screenWidth,358);
				this.renderText(ctx1,str,nameLeft,to2Px(screenWidth,870),mulitipleWidth,'#999',12);
				let qrImgLeft = to2Px(screenWidth,460);
				console.log(this.data.qrCodePath)
				console.log('二维码0')
				ctx1.drawImage(this.data.qrCodePath,qrImgLeft,to2Px(screenWidth,768),to2Px(screenWidth,100),to2Px(screenWidth,100));
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
								saveTempCanvas: res.tempFilePath
							},()=>{
								if(this.data.saveTempCanvas!=="" && this.data.saveTempCanvas1!=="" && this.data.saveTempCanvas2!=="" && this.data.saveTempCanvas3!==""){
									that.setData({
										disable: false,
										show: false
									})
								}
							})
						},
						fail:(err)=>{
							console.log(err)
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
				const screenWidth = wx.getSystemInfoSync().screenWidth;
				const ctx1 = wx.createCanvasContext('share1');
				ctx1.rect(0,0,allWidth,allHeight);
				ctx1.setFillStyle('#FFF');
				ctx1.fill();
				ctx1.drawImage(this.data.imgPath2,0,0,allWidth,to2Px(screenWidth,720));
				ctx1.setFontSize(18);
				ctx1.setFillStyle('#333');
				let titleLeft = to2Px(screenWidth,48);
				this.renderTitle1(ctx1,this.data.dataInfo['title'],titleLeft,93,to2Px(screenWidth,498));
				ctx1.setFontSize(13);
				ctx1.setFillStyle('#999999');
				ctx1.fillText(that.data.unitTitle,titleLeft,150);
				let unitPriceLeft = to2Px(screenWidth,178);
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
				ctx1.setFontSize(18);
				ctx1.setFillStyle('#FE6300');
				ctx1.fillText(unitPrice +that.data.unit,unitPriceLeft,150);
				ctx1.setFontSize(12);
				ctx1.setFillStyle('#999999');
				ctx1.fillText('开盘地址:',titleLeft,169);
				let detailsAddressLeft = to2Px(screenWidth,178);
				let detailsAddress = this.data.dataInfo['detailsAddress'];
				that.renderText(ctx1,detailsAddress,detailsAddressLeft,168,to2Px(screenWidth,382),'#999999',13);
				ctx1.setFontSize(15);
				ctx1.setFillStyle('black');
				let nameLeft = to2Px(screenWidth,40);
				ctx1.fillText(this.data.userInfo['realName'],nameLeft,to2Px(screenWidth,780));
				ctx1.drawImage(this.data.phoneImgPath,nameLeft,to2Px(screenWidth,800),to2Px(screenWidth,36),to2Px(screenWidth,36));
				let phoneLeft = to2Px(screenWidth,88);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('black');
				ctx1.font = '13px PingFangSC-Regular,PingFang SC';
				ctx1.fillText(this.data.userInfo['phone'],phoneLeft,to2Px(screenWidth,824));
				let str = this.data.userInfo['synopsis']===""?'暂无简介':this.data.userInfo['synopsis'];
				let mulitipleWidth = to2Px(screenWidth,360);
				this.renderText(ctx1,str,nameLeft,to2Px(screenWidth,870),mulitipleWidth,'#999',12);
				let qrImgLeft = to2Px(screenWidth,460);
				console.log(this.data.qrCodePath)
				console.log('二维码1')
				ctx1.drawImage(this.data.qrCodePath,qrImgLeft,to2Px(screenWidth,768),to2Px(screenWidth,100),to2Px(screenWidth,100));
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
								saveTempCanvas1: res.tempFilePath
							},()=>{
								if(this.data.saveTempCanvas!=="" && this.data.saveTempCanvas1!=="" && this.data.saveTempCanvas2!=="" && this.data.saveTempCanvas3!==""){
									that.setData({
										disable: false,
										show: false
									})
								}
							})
						},
						fail:(err)=>{
							console.log(err)
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
		const screenWidth = wx.getSystemInfoSync().screenWidth;
		query.select('#share2')
			.fields({ node: true, size: true })
			.exec((res) => {
				allWidth  = res[0].width;
				allHeight =  res[0].height;
				const ctx1 = wx.createCanvasContext('share2');
				ctx1.rect(0,0,allWidth,allHeight);
				ctx1.setFillStyle('white');
				ctx1.fill();
				let titleLeft = to2Px(screenWidth,36);
				this.renderTitle2(ctx1,this.data.dataInfo['title'],titleLeft,to2Px(screenWidth,48),to2Px(allWidth,500));
				ctx1.setFontSize(13);
				ctx1.setFillStyle('#999999');
				ctx1.fillText(that.data.unitTitle,titleLeft,to2Px(screenWidth,130));
				let unitPriceLeft = to2Px(screenWidth,156);
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
				ctx1.fillText(that.data.unitPrice + that.data.unit,unitPriceLeft,to2Px(screenWidth,130));
				ctx1.setFontSize(12);
				ctx1.setFillStyle('#999999');
				ctx1.fillText('开盘地址:',titleLeft,to2Px(screenWidth,173));
				let detailsAddressLeft = to2Px(screenWidth,160);
				let detailAddress = this.data.dataInfo['detailsAddress'];
				that.renderText(ctx1,detailAddress,detailsAddressLeft,to2Px(screenWidth,170),to2Px(screenWidth,400),'#999999',12);
				ctx1.drawImage(this.data.imgPath3,titleLeft,to2Px(screenWidth,230),to2Px(screenWidth,520),to2Px(screenWidth,364));
				if(this.data.imgPath5!==''){
					ctx1.drawImage(this.data.imgPath5,titleLeft,to2Px(screenWidth,600),to2Px(screenWidth,166),to2Px(screenWidth,168));
				}
				if(this.data.imgPath6!==''){
					ctx1.drawImage(this.data.imgPath6,to2Px(screenWidth,218),to2Px(screenWidth,600),to2Px(screenWidth,166),to2Px(screenWidth,166));
				}
				if(this.data.imgPath7!==''){
					ctx1.drawImage(this.data.imgPath7,to2Px(screenWidth,394),to2Px(screenWidth,600),to2Px(screenWidth,166),to2Px(screenWidth,166));
				}
				ctx1.setFontSize(15);
				ctx1.setFillStyle('black');
				let nameLeft = to2Px(screenWidth,40);
				ctx1.fillText(this.data.userInfo['realName'],nameLeft,to2Px(screenWidth,800));
				ctx1.drawImage(this.data.phoneImgPath,nameLeft,to2Px(screenWidth,830),to2Px(screenWidth,36),to2Px(screenWidth,36));
				let phoneLeft = to2Px(screenWidth,84);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('black');
				ctx1.font = '13px PingFangSC-Regular,PingFang SC';
				ctx1.fillText(this.data.userInfo['phone'],phoneLeft,to2Px(screenWidth,853));
				let str = this.data.userInfo['synopsis']===""?'暂无简介':this.data.userInfo['synopsis'];
				let mulitipleWidth = to2Px(screenWidth,360);
				this.renderText(ctx1,str,nameLeft,to2Px(screenWidth,902),mulitipleWidth,'#999999',12);
				let qrImgLeft = to2Px(screenWidth,460);
				console.log(this.data.qrCodePath)
				console.log('二维码2')
				ctx1.drawImage(that.data.qrCodePath,qrImgLeft,to2Px(screenWidth,800),to2Px(screenWidth,100),to2Px(screenWidth,100));
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
								saveTempCanvas2: res.tempFilePath
							},()=>{
								if(this.data.saveTempCanvas!=="" && this.data.saveTempCanvas1!=="" && this.data.saveTempCanvas2!=="" && this.data.saveTempCanvas3!==""){
									that.setData({
										disable: false,
										show: false
									})
								}
							})
						},
						fail:(err)=>{
							console.log(err)
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
				const screnWidth = wx.getSystemInfoSync().screenWidth;
				const ctx1 = wx.createCanvasContext('share3');
				ctx1.rect(0,0,allWidth,allHeight);
				ctx1.setFillStyle('white');
				ctx1.fill();
				ctx1.setFontSize(15);
				ctx1.setFillStyle('black');
				let nameLeft = to2Px(screnWidth,40);
				ctx1.fillText(this.data.userInfo['realName'],nameLeft,to2Px(screnWidth,42));
				ctx1.drawImage(this.data.phoneImgPath,nameLeft,to2Px(screnWidth,70),to2Px(screnWidth,36),to2Px(screnWidth,36));
				let phoneLeft = to2Px(screnWidth,84);
				ctx1.setFontSize(13);
				ctx1.setFillStyle('black');
				ctx1.font = '13px PingFangSC-Regular,PingFang SC';
				ctx1.fillText(this.data.userInfo['phone'],phoneLeft,to2Px(screnWidth,94));
				let str = this.data.userInfo['synopsis']===""?'暂无简介':this.data.userInfo['synopsis'];
				let mulitipleWidth = to2Px(screnWidth,360);
				this.renderText(ctx1,str,nameLeft,to2Px(screnWidth,134),mulitipleWidth,'#999999',12);
				let qrImgLeft = to2Px(screnWidth,460);
				console.log(this.data.qrCodePath)
				console.log('二维码3')
				ctx1.drawImage(this.data.qrCodePath,qrImgLeft,to2Px(screnWidth,32),to2Px(screnWidth,100),to2Px(screnWidth,100));
				ctx1.drawImage(this.data.imgPath4,nameLeft,to2Px(screnWidth,218),to2Px(screnWidth,520),to2Px(screnWidth,520));
				ctx1.drawImage(this.data.pic_resources,to2Px(screnWidth,412),to2Px(screnWidth,682),to2Px(screnWidth,188),to2Px(screnWidth,188));
				let titleLeft = to2Px(screnWidth,40);
				this.renderTitle2(ctx1,this.data.dataInfo['title'],titleLeft,to2Px(screnWidth,778),to2Px(screnWidth,324));
				ctx1.setFontSize(13);
				ctx1.setFillStyle('#999999');
				ctx1.fillText(that.data.unitTitle,titleLeft,to2Px(screnWidth,888));
				let unitPriceLeft = to2Px(screnWidth,170);
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
				ctx1.setFontSize(18);
				ctx1.setFillStyle('#FE6300');
				ctx1.fillText(unitPrice + that.data.unit,unitPriceLeft,to2Px(screnWidth,884));
				ctx1.setFontSize(13);
				ctx1.setFillStyle('#999999');
				ctx1.fillText('开盘地址:',titleLeft,to2Px(screnWidth,934));
				let detailsAddressLeft = to2Px(screnWidth,170);
				let detailAdress = this.data.dataInfo['detailsAddress'];
				this.renderText(ctx1,detailAdress,detailsAddressLeft,to2Px(screnWidth,930),to2Px(screnWidth,390),'#999999',13);
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
								saveTempCanvas3: res.tempFilePath
							},()=>{
								if(this.data.saveTempCanvas!=="" && this.data.saveTempCanvas1!=="" && this.data.saveTempCanvas2!=="" && this.data.saveTempCanvas3!==""){
									that.setData({
										disable: false,
										show: false
									})
								}
							})
						},
						fail:(err)=>{
							console.log(err)
						}
					})
				});
			});
	},

	getDesign3(newDesignArray=[]){
		this.drawQR();
		if(newDesignArray.length===1){
			getImageInfo(newDesignArray[0]).then(res=>{
				console.log(res)
				this.setData({
					imgPath3: res.path
				},()=>{
					this.go2();
				});
			})
		}else if(newDesignArray.length===2){
			getImageInfo(newDesignArray[0]).then(res=>{
				console.log(res)
				this.setData({
					imgPath3: res.path
				},()=>{
					getImageInfo(newDesignArray[1]).then(res=>{
						console.log(res)
						this.setData({
							imgPath5: res.path
						},()=>{
							this.go2();
						});
					}).catch(err=>{
						console.log(err)
					});
				});
			})
		}else if(newDesignArray.length===3){
			getImageInfo(newDesignArray[0]).then(res=>{
				console.log(res)
				this.setData({
					imgPath3: res.path
				},()=>{
					getImageInfo(newDesignArray[1]).then(res=>{
						console.log(res)
						this.setData({
							imgPath5: res.path
						},()=>{
							getImageInfo(newDesignArray[2]).then(res=>{
								console.log(res)
								this.setData({
									imgPath6: res.path
								},()=>{
									this.go2();
								});
							}).catch(err=>{
								console.log(err)
							});
						});
					}).catch(err=>{
						console.log(err)
					});
				});
			})
		}else if(newDesignArray.length===4){
			getImageInfo(newDesignArray[0]).then(res=>{
				console.log(res)
				this.setData({
					imgPath3: res.path
				},()=>{
					getImageInfo(newDesignArray[1]).then(res=>{
						console.log(res)
						this.setData({
							imgPath5: res.path
						},()=>{
							getImageInfo(newDesignArray[2]).then(res=>{
								console.log(res)
								this.setData({
									imgPath6: res.path
								},()=>{
									getImageInfo(newDesignArray[3]).then(res=>{
										console.log(res)
										this.setData({
											imgPath7: res.path
										},()=>{
											this.go2();
										});
									}).catch(err=>{
										console.log(err)
									});
								});
							}).catch(err=>{
								console.log(err)
							});
						});
					}).catch(err=>{
						console.log(err)
					});
				});
			})
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.drawQR();
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
		getImageInfo('../../image/icon_phonecall_30@2x.png').then(res=>{
			console.log(res)
			this.setData({
				phoneImgPath: '../../../'+res.path
			})
		}).catch(err=>{
			console.log(err)
		});
		let designSketch = parseObj.item['designSketch'];
		const newDesignArray = designSketch.slice(0,4);
		this.getDesign3(newDesignArray);
		request.posterTemplate({}).then(res=>{
			this.setData({
				posterList: res
			});
			let imgPath1 = res[0].backgroundUri.replace(/[\'|\"]/g,"");
			let imgPath2 = res[1].backgroundUri.replace(/[\'|\"]/g,"");
			getImageInfo(imgPath1).then(res=>{
				this.setData({
					imgPath1: res.path
				},()=>{
					this.go();
				});
			}).catch(err=>{
				console.log(err)
			});
			getImageInfo(imgPath2).then(res=>{
				console.log(res)
				this.setData({
					imgPath2: res.path
				},()=>{
					this.go1();
				});
			}).catch(err=>{
				console.log(err)
			});
		}).catch(err=>{
			console.log(err)
		});
		getImageInfo(designSketch[0]).then(res=>{
			console.log(res)
			this.setData({
				imgPath4: res.path
			},()=>{
				getImageInfo('../../image/pic_resources.png').then(res=>{
					this.setData({
						pic_resources: '../../../'+res.path
					},()=>{
						this.go3();
					})
				}).catch(err=>{
					console.log(err)
				})
			});
		}).catch(err=>{
			console.log(err)
		});
	},

	drawQR(){
		let that = this;
		let res = wx.getSystemInfoSync();
		let qrCodeCtx =  wx.createCanvasContext('myQrcode');
		drawQrcode({
			width: 80,
			height: 80,
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
							complete:()=>{
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
	previewImage() {
		console.log('preview')
		console.log(index)
		const {index,saveTempCanvas,saveTempCanvas1,saveTempCanvas2,saveTempCanvas3} = this.data;
		const imgArray = [saveTempCanvas,saveTempCanvas1,saveTempCanvas2,saveTempCanvas3];
		wx.previewImage({
			current: imgArray[index-1],
			urls: [saveTempCanvas,saveTempCanvas1,saveTempCanvas2,saveTempCanvas3]
		},true)
	},
	save(){
		if(this.data.disable){
			return
		}
		// this.previewImage();
		// let that = this;
		// wx.getSetting({
		// 	success(res){
		// 		console.log(res)
		// 		let auth = res.authSetting['scope.writePhotosAlbum'];
		// 		console.log(auth)
		// 		if(auth || auth===undefined){
		// 			that.saveImg();
		// 		}else{
		// 			wx.openSetting({
		// 				success(res){
		// 					console.log(res)
		// 					if(res.authSetting['scope.writePhotosAlbum']){
		// 						that.saveImg();
		// 					}else{
		// 						wx.showToast({
		// 							title: '请先授权图片存储权限',
		// 							icon: "none",
		// 							duration: 1000
		// 						})
		// 					}
		// 				},
		// 				fail(err){
		// 					console.log(err)
		// 				}
		// 			})
		// 		}
		// 	},
		// 	fail(err){
		// 		console.log(err)
		// 	}
		// });
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
		const userInfo = JSON.parse(wx.getStorageSync('userInfo')||'{}');
		let synopsis = userInfo.synopsis===""?'暂无简介':userInfo.synopsis;
		this.setData({
			userInfo: {...userInfo,synopsis:synopsis}
		});
		wx.hideShareMenu({
			menus: ['shareAppMessage', 'shareTimeline']
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
