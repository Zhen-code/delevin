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
    backHome: true,
    painting: {},
    shareImage: '',
    showmenu: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let {uri} = options;
    let bgImgUrl = uri.replace(/[\'|\"]/g,'');
    wx.getImageInfo({
      src: bgImgUrl,
      success:(res)=>{
      console.log(res);
      that.setData({
        imgUrl: res.path
       });
      }
    });
    //获取手机图标
    wx.getImageInfo({
      src: '../../image/icon_phonecall_30@2x.png',
      success: (res)=>{
        console.log(res)
        this.setData({
          phoneImgPath: '../../'+res.path
        })
      },
      fail:(err)=>{
        console.log(err)
      }
    });
  },
  eventDraw(url,phoneUrl,codeImg) {
    var self  = this;
    wx.showLoading({
      title: '海报绘制中',
      mask: true
    });
    this.setData({
      painting: {
        width: 686,
        height: 1188,
        clear: true,
        views: [
          {
          type: 'rect',
          background: '#FFFFFF',
          top: 0,
          left:0,
          width: 686,
          height: 1188
          },
          {
          type: 'image',
          url: url,//背景图
          top: 0,
          left: 0,
          width: 686,
          height: 914
          },
          {
            type: 'text',
              content: this.data.cname,
              fontSize: 30,
              textAlign: 'left',
              color: "#333333",
              top: 962,
              left: 32,
              bolder: true
          },
          {
            type: 'image',
            url: phoneUrl,
            top: 1012,
            left: 32,
            width: 36,
            height: 36
          },
          {
            type: 'text',
            content: this.data.phone,
            fontSize: 26,
            textAlign: 'left',
            color: "#333333",
            top: 1012,
            left: 76,
            bolder: true
          },
          {
            type: 'text',
            content: this.data.synopsis,
            fontSize: 24,
            color:'#999999',
            textAlign: 'left',
            top: 1064,
            left: 32,
            lineHeight: 34,
            width: 452,
            MaxLineNumber: 2,//最多展示5行
            breakWord: true,
            bolder: false
          },
          {
            type: 'image',
            url: codeImg,
            top: 962,
            left: 518,
            width: 136,
            height: 136
          }
          // {
          //   type: 'text',
          //   content: '为您推荐 ' + self.data.shop.shopName,//店铺名字
          //   fontSize: 32,
          //   textAlign: 'center',//居中，但是还是要left 自己left到居中 然后不管什么型号的都会居中了center必须要有
          //   color: "#1a1a1a",
          //   top: 575,
          //   left: 375,
          //   bolder: true
          // },
          // {
          //   type: 'text',
          //   content: self.data.shop.shopSign,//店铺介绍
          //   fontSize: 28,
          //   color:'#1a1a1a',
          //   textAlign: 'left',
          //   top: 660,
          //   left: 22,
          //   lineHeight: 40,
          //   width: 680,
          //   MaxLineNumber: 5,//最多展示5行
          //   breakWord: true,
          //   bolder: false
          // },
        ]
      }
    })

  },
  eventGetImage(event) {
    console.log(event)
    wx.hideLoading()
    const {
      tempFilePath,
    } = event.detail;
    if(tempFilePath){
      this.setData({
        shareImage: tempFilePath,
        isDisable: false
      })
    }else{
      this.setData({
        isDisable: true
      })
    }

  },
  previewImage: function () {
    const current = this.data.shareImage;
    const showmenu = this.data.showmenu;
    console.log(current)
    wx.previewImage({
      current: current,
      urls: [current]
    },true)
  },
  eventSave() {
    this.setData({
      showmenu: true
    },()=>{
      this.previewImage()
    })
  },
  getAgentInfo(){
    const userInfo = JSON.parse(wx.getStorageSync('userInfo')||'{}');
    this.setData({
      cname: userInfo.nickname,
      phone: userInfo.phone,
      synopsis: userInfo.synopsis===""?'暂无简介':userInfo.synopsis,
      agentId: userInfo.agentId,
      userId: userInfo.id
    })
  },
  to2Px(clientWidth,x){
    return Number(clientWidth*x/750);
  },
  drawCode(agentId,userId){
    const systemInfo = wx.getSystemInfoSync();
    const screenWidth = systemInfo.screenWidth;
    const that = this;
    let qrCodeCtx =  wx.createCanvasContext('myQrcode');
    drawQrcode({
      width: that.to2Px(screenWidth,136),
      height: that.to2Px(screenWidth,136),
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
                },()=>{
                  that.eventDraw(that.data.imgUrl,that.data.phoneImgPath,res.tempFilePath);
                })
              },
              fail: (err) => {
                console.log(err)
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

  onShow() {
    this.getAgentInfo();
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let agentId = wx.getStorageSync('agentId');
    let userId = wx.getStorageSync('userId');
    console.log(agentId);
    console.log('经纪人agentid');
    this.drawCode(agentId,userId);
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
  onShareAppMessage: function (res) {
    this.setData({
      isShare: true
    });
    let from = res.from;
    if(from === "button"){
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
