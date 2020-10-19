const app = getApp();
import drawQrcode from '../../../miniprogram_npm/weapp-qrcode/index';
import {request} from '../../../request/request';
const { topHeight } = require('../../../request/topHeight');
/*
小程序利用canvas实现一键保存图片功能 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agentId: '',
    userId: '',
    isShare: false,
    bgImgHeight: 0,
    cname: '',
    phone: '',
    synopsis: '',
    imgUrl: '',//背景图片地址
    shareTempFilePath: '',
    canvasWidth: '',
    canvasHeight: '',
    loadUrl: '',
    screenWidth: 0,//设备屏幕宽度
    screenHeight: 0,//设备屏幕高度
    shareImgSrc: '',
    shareImgPath: '',
    imgPath: '',
    phoneImgPath: '',
    saveTempCanvas: '',
    clientWidth: 0,
    qrCodePath: '',
    isDisable: true,
    title: '配图分享',
    bgColor: {
      "color": true,
      "border": true
    },
    paddingTop: topHeight,
    back: true,
    backHome: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {uri} = options;
    let bgImgUrl = uri.replace(/[\'|\"]/g,'');
    console.log(bgImgUrl);
    let that = this;
    //获取大图
    // wx.downloadFile({
    //   url: bgImgUrl,
    //   success: (res)=>{
    //     console.log(res)
    //     that.setData({
    //       imgUrl: res.tempFilePath,
    //       imgPath: res.tempFilePath
    //     });
    //   },
    //   fail: (err)=>{
    //     console.log(err)
    //   },
    //   complete: ()=>{
    //     console.log('下载完成')
    //   }
    // });
    wx.getImageInfo({
      src: bgImgUrl,
      success:(res)=>{
      console.log(res)
      that.setData({
        imgUrl: res.path,
        imgPath: res.path,
        bgImgHeight: res.height
       });
      }
    });
    //获取手机图标
    wx.getImageInfo({
      src: '../../image/icon_phonecall_30@2x.png',
      success: (res)=>{
        console.log(res)
        this.setData({
          phoneImgPath: '../../../'+res.path
        })
      },
      fail:(err)=>{
        console.log(err)
      }
    })
  },

  onShow() {
    request.information().then(res=>{
      console.log(res)
      this.setData({
        cname: res.nickname,
        phone: res.phone,
        synopsis: res.synopsis===""?'暂无简介':res.synopsis,
        agentId: res.agentId,
        userId: res.id
      })
    }).catch(err=>{
      console.log(err)
    })
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    let agentId = wx.getStorageSync('agentId');
    let userId = wx.getStorageSync('userId');
    console.log(agentId);
    console.log('经纪人agentid');
    let res = wx.getSystemInfoSync();
    this.setData({
      clientWidth:  res.screenWidth
    });
    let qrCodeCtx =  wx.createCanvasContext('myQrcode');
    drawQrcode({
      width: 100,
      height: 100,
      canvasId: 'myQrcode',
      ctx: qrCodeCtx,
      text: `https://dev.delevin.beiru168.com/homepage?agentId=${agentId}&userId=${userId}`,
      callback: (e)=>{
        console.log(e)
        if(e['errMsg'].includes('ok')){
          console.log('二维码绘制完成');
          setTimeout(()=>{
            wx.canvasToTempFilePath({
              canvasId: 'myQrcode',
              quality: 1,
              success: (res) => {
                console.log(res)
                this.setData({
                  qrCodePath: res.tempFilePath
                })
              },
              fail: (err) => {
                console.log(err)
              },
              complete: () => {
                that.go()
              }
            })
          },1000)
        }else{
          wx.showToast({
            title: '二维码生成失败，请重新再试!'
          })
        }
      }
    });
  },
  to2Px(x){
    return Number(this.data.clientWidth/750*x);
  },
  renderText(ctx,str,left,initTop,canvasWidth){
    let lineWidth = 0;
    let lastSubStrIndex = 0;
    for(let i = 0;i<str.length;i++){
      lineWidth = lineWidth+ctx.measureText(str[i]).width;
      if(lineWidth>canvasWidth){
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
    let that = this;
    let {isShare} = this.data;
    const query = wx.createSelectorQuery();
    let allWidth = 0;
    let allHeight = 0;
    let {bgImgHeight} = this.data;
    const dpr = wx.getSystemInfoSync().pixelRatio;
    query.select('#share')
        .fields({ node: true, size: true })
        .exec((res) => {
          allWidth = res[0].width;
          allHeight =  res[0].height;
          const ctx1 = wx.createCanvasContext('share');
          ctx1.rect(0,0,allWidth,allHeight);
          ctx1.setFillStyle('#FFFFFF');
          ctx1.fill();
          console.log(this.data.imgPath)
          ctx1.drawImage(this.data.imgPath,0,0,allWidth,350);
          ctx1.setFontSize(15);
          ctx1.setFillStyle('black');
          let nameLeft = this.to2Px(64);
          ctx1.fillText(this.data.cname,nameLeft,382);
          ctx1.drawImage(this.data.phoneImgPath,nameLeft,391,this.to2Px(36),this.to2Px(36));
          let phoneLeft = this.to2Px(108);
          ctx1.setFontSize(13);
          ctx1.setFillStyle('black');
          ctx1.font = '13px PingFangSC-Regular,PingFang SC';
          ctx1.fillText(this.data.phone,phoneLeft,404);
          let str = this.data.synopsis;
          let mulitipleWidth = this.to2Px(310);
          this.renderText(ctx1,str,nameLeft,429,mulitipleWidth);
          let qrImgLeft = this.to2Px(518);
          ctx1.drawImage(this.data.qrCodePath,qrImgLeft,372,80,80);
          ctx1.draw(false,()=>{
            console.log(666)
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
                },()=>{
                  if(isShare){
                    wx.getSetting({
                      success(res){
                        let auth = res.authSetting['scope.writePhotosAlbum'];
                        if(auth || auth===undefined){
                          that.saveImg();
                        }else{
                          wx.openSetting({
                            success(res){
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
  saveImg(){
    wx.saveImageToPhotosAlbum({
      filePath: this.data.saveTempCanvas,
      success: (res)=>{
        console.log(res);
        wx.showToast({
          title: '保存成功',
          icon: "none",
          duration: 2000
        })
      },
      fail:(err)=>{
        console.log(err)
        wx.showToast({
          title: '保存失败',
          icon: "none",
          duration: 2000
        })
      }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    this.setData({
      isShare: true
    });
    let from = res.from;
    if(from === "button"){
      this.go();
      return{
        title: '经纪人主页',
        path: '/combination/pages/homepage/index?agentId='+this.data.agentId+'&userId='+this.data.userId,
        imageUrl: this.data.saveTempCanvas
      }
    }else{
      return{
        title: '经纪人主页',
        path: '/combination/pages/homepage/index?agentId='+this.data.agentId+'&userId='+this.data.userId,
        imageUrl: this.data.saveTempCanvas
      }
    }
  }
});
