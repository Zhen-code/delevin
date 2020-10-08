const app = getApp();
import drawQrcode from '../../../miniprogram_npm/weapp-qrcode/index'
/*
小程序利用canvas实现一键保存图片功能 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneImg: '',
    cname: '杜芝天',
    renwu: '',
    yuyan: '',
    fan: '',
    xg: '',
    imgurl: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3922290090,3177876335&fm=26&gp=0.jpg',
    canvasHidden: true,     //设置画板的显示与隐藏，画板不隐藏会影响页面正常显示
    wxappName: '页面生成图片',    //小程序名称
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
    qrCodePath: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {uri} = options;
    // wx.getImageInfo({
    //   src: '../image/1.jpg',
    //   success:(res)=>{
    //     console.log(res)
    //     this.setData({
    //       imgPath: '../../'+res.path
    //     })
    //   },
    //   fail: (err)=>{
    //     console.log(err);
    //   }
    // });
    // wx.getImageInfo({
    //   src: '../image/icon_phonecall_30@2x.png',
    //   success: (res)=>{
    //     console.log(res)
    //     this.setData({
    //       phoneImgPath: '../../'+res.path
    //     })
    //   },
    //   fail:(err)=>{
    //     console.log(err)
    //   }
    // })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let res = wx.getSystemInfoSync();
    console.log(res)
    this.setData({
      clientWidth:  res.screenWidth
    });
    let qrCodeCtx =  wx.createCanvasContext('myQrcode');
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      ctx: qrCodeCtx,
      text: 'https://baidu.com',
      callback: (e)=>{
        console.log(e)
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
          }
        })
      }
    })

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
    const query = wx.createSelectorQuery();
    let allWidth = 0;
    let allHeight = 0;
    const dpr = wx.getSystemInfoSync().pixelRatio;
    query.select('#share')
        .fields({ node: true, size: true })
        .exec((res) => {
          allWidth = res[0].width;
          allHeight =  res[0].height;
          const ctx1 = wx.createCanvasContext('share');
          console.log(this.data.imgPath)
          ctx1.drawImage(this.data.imgPath,0,0,allWidth,300);
          ctx1.rect(0,300,allWidth,allHeight-350);
          ctx1.setFillStyle('white');
          ctx1.fill();
          ctx1.setFontSize(15);
          ctx1.setFillStyle('black');
          let nameLeft = this.to2Px(64);
          ctx1.fillText('经济人',nameLeft,382);
          ctx1.drawImage(this.data.phoneImgPath,nameLeft,391,this.to2Px(36),this.to2Px(36));
          let phoneLeft = this.to2Px(108);
          ctx1.setFontSize(13);
          ctx1.setFillStyle('black');
          ctx1.font = '13px PingFangSC-Regular,PingFang SC';
          ctx1.fillText('17820563432',phoneLeft,404);
          let str = '个人介绍个人介绍奥克兰的公交卡';
          let mulitipleWidth = this.to2Px(310);
          this.renderText(ctx1,str,nameLeft,429,mulitipleWidth);
          let qrImgLeft = this.to2Px(518);
          ctx1.drawImage(this.data.qrCodePath,qrImgLeft,382,68,68);
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
                  saveTempCanvas: res.tempFilePath
                },()=>{
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
                })
              },
              fail:(err)=>{
                console.log(err)
              }
            })
          });
        });


  },
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return{
      title: '经纪人信息',
      path: '/pages/upload/index',
      imageUrl: this.data.saveTempCanvas
    }
  }
});
