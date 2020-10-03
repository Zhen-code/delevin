import {
  _wxml,
  _style
} from './canvas.js'
import drawQrcode from "../../../utils/weapp.qrcode.esm.js"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    heightObj: {},
    imgUrl: '',
    showSaveBtn: false,
    showSaveBtn2: false,
    reportOrClassOverFlag: {
      codeUrl: '',
      name: '吴加良',
      phone: '17620835317',
      text: '今天房猿通开发了二维码界面',
      bookUrl: 'https://quxue-data.oss-cn-beijing.aliyuncs.com/shop/product_test/KN6xszcjS7F4ByRRsAsZ.jpg',
    },
    qrcodeUrl: ''
  },
  downloadImgShare() {
    const p2 = this.widget.canvasToTempFilePath()
    p2.then(res => {
      let obj = {
        img: res.tempFilePath,
        type: 2,
        content: '保存成功，快去分享吧',
      }
      savePoster(obj)
    })
    // this.savePoster()
  },
  //点击保存到相册
  fsavePoster: function () {
    var that = this
    console.log(that.data.imgUrl)
    let img = that.data.imgUrl
    wx.downloadFile({
      url: img,
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showModal({
              content: '保存成功，快去分享吧',
              showCancel: false,
              confirmText: '好的',
              confirmColor: '#333',
              success: function (res) {
                if (res.confirm) {
                  console.log('999999')
                  console.log('用户点击确定');
                  /* 该隐藏的隐藏 */
                  that.setData({
                    maskHidden: false
                  })
                }
              },
              fail: function (res) {
                console.log(11111)
              }
            })
          },
          fail(res) {
            // wx.showToast({
            //   title: '保存失败',
            //   icon: 'none',
            // })
            // 拒绝授权时，则进入手机设置页面，可进行授权设置
            if (res.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
              wx.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success: modalSuccess => {
                  wx.openSetting({
                    success(settingdata) {
                      console.log("settingdata", settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击按钮即可保存',
                          showCancel: false,
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
                        })
                      }
                    },
                    fail(failData) {
                      console.log("failData", failData)
                    },
                    complete(finishData) {
                      console.log("finishData", finishData)
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  },
  // 保存图片
  saveImg: function (e) {
    let that = this;
    //获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.openSetting({
            complete: (res) => {},
          })
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              //这里是用户同意授权后的回调
              that.saveImgToLocal();
            },
            fail() { //这里是用户拒绝授权后的回调
              that.setData({
                openSettingBtnHidden: false
              })
            }
          })
        } else { //用户已经授权过了
          that.saveImgToLocal();
        }
      }
    })
  },
  saveImgToLocal: function (e) {
    let that = this;
    let imgSrc = that.data.imgUrl;
    wx.downloadFile({
      url: imgSrc,
      success: function (res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '保存成功快去分享吧',
              icon: 'none',
              duration: 1500
            })
          },
        })
      }
    })
  },
  getData() {
    let myClassAcId = wx.getStorageSync('myClassAcId'),
      orgObj = wx.getStorageSync('orgObj')
    let param = {
      uid: orgObj.uid,
      activityId: myClassAcId.activityId,
      itemId: myClassAcId.activityItemId,
      orgId: orgObj.orgId,
      moduleId: 2
    }
    downloadShareImg(param).then(res => {
      console.log(res)
      if (res.code == 200) {
        let dataw = res.result
        this.setData({
          imgUrl: res.result
        })
        // this.renderToCanvas();
        // this.creatCode();
      }
    })
  },
  getClassOverImage() {
    let myClassAcId = wx.getStorageSync('myClassAcId'),
      orgObj = wx.getStorageSync('orgObj'),
      orgName = wx.getStorageSync('orgName')
    let param = {
      uid: orgObj.uid,
      activityId: myClassAcId.activityId,
      orgId: orgObj.orgId,
      orgName: orgName
    }
    getOverClassImage(param).then(res => {
      console.log(res)
      if (res.code == 200) {
        let dataw = res.result
        this.setData({
          imgUrl: res.result
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.widget = this.selectComponent('.widget');
    wx.getSystemInfo({
      complete: (res) => {
        this.setData({
          heightObj: res
        })
      },
    })
    this.creatCode();
  },
  creatCode() {
    //动态生成二维码
    let that = this;
    let myClassAcId = wx.getStorageSync('myClassAcId'),
      orgObj = wx.getStorageSync('orgObj')
    // drawQrcode.clear()
    // let shareUrl = 'http://recruit.quxueabc.com/qudaka/?uid=' + orgObj.uid + '&orgId=' + orgObj.orgId + '&activityId=' + myClassAcId.activityId + '&itemId=' + myClassAcId.activityItemId + '&moduleId=2#'
    let shareUrl = 'http://www.baidu.com'
    drawQrcode({
      width: 150,
      height: 150,
      canvasId: 'myQrcode',
      text: shareUrl,
      callback(e) {
        // 使用 setTimeout, 避免部分安卓机转出来的二维码图片不完整
        if (e.errMsg == "drawCanvas:ok") {
          setTimeout(() => {
            wx.canvasToTempFilePath({
              canvasId: 'myQrcode',
              x: 0,
              y: 0,
              width: 150,
              height: 150,
              success(e) {
                console.log(e)
                that.renderToCanvas(e.tempFilePath);
                that.setData({
                  qrcodeUrl: e.tempFilePath
                })
              }
            })
          }, 100);
        } else {
          wx.showToast({
            title: '生成二维码失败',
            icon: 'none',
          })
        }
      }
    })
  },
  renderToCanvas(codeUrl='') {
    let that = this;
    this.setData({
      reportOrClassOverFlag: {
        codeUrl: codeUrl,
        name: '吴加良',
        phone: '17620835317',
        text: '今天房猿通开发了二维码界面',
        bookUrl: 'https://quxue-data.oss-cn-beijing.aliyuncs.com/shop/product_test/KN6xszcjS7F4ByRRsAsZ.jpg',
      }
    })
    let wxml = _wxml(this.data.reportOrClassOverFlag);
    let screenWidth = this.data.heightObj.screenWidth,
      screenHeight = this.data.heightObj.screenHeight,
      windowHeight = this.data.heightObj.windowHeight

    /**
     * 画布大一点就不行了 canvas尺寸是750*1334rpx 高度超出这个多一些就gg了
     * 降低安卓机的dpr 最大设为2 就可以了
     * */
    let width = (screenWidth),
      height = (windowHeight)
    let style = _style(width, height, 1, this.data.reportOrClassOverFlag);
    that.setData({
      showSaveBtn2: true
    })
    setTimeout(() => {
      this.widget.renderToCanvas({
        wxml,
        style
      }).then((res) => {
        console.log('container', res.layoutBox)
        that.container = res
        that.setData({
          showSaveBtn: true,
          showSaveBtn2: true
        })
      })
    }, 1000)
  },
  // 下载网络图片
  downloadImage() {
    let obj = {
      img: this.data.imgUrl,
      type: 2,
      content: '保存成功，快去分享吧',
    }
    savePoster(obj)
  },
  // 下载自己生成的canvas
  extraImage() {
    if (this.data.showSaveBtn == false) {
      wx.showToast({
        title: '正在生成图片哦！',
        icon: 'none',
      })
      return;
    }
    const p2 = this.widget.canvasToTempFilePath({
        // quality: 1,
        // fileType: 'jpg'
      })
      .then(res => {
        let obj = {
          img: res.tempFilePath,
          type: 2,
          content: '保存成功，快去分享吧',
        }
        saveLocalPoster(obj)
      })
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
  onShareAppMessage: function (options) {
    console.log(options)
    options.orgId = wx.getStorageSync('orgId')
    options.imgUrl = ''
    let shareObj = shareFunction(options)
    return shareObj
  }
})