import drawQrcode from '../../../miniprogram_npm/weapp-qrcode/index';
const topHeight = require('../../../request/topHeight.js').topHeight;
Component({
  properties: {
    obj: {
      type: Object,
      require: true,
    },
    type: {
      type: String,
      value: "news"
    },
    //属性值可以在组件使用时指定
    isCanDraw: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal) {
        // newVal && this.drawPic()
      }
    },
    item: {
      type: Object,
      value: {},
      observer(newVal, oldVal) {
        this.setData({
          data: newVal
        }, () => {
          this.drawPic()
        })
      }
    }
  },
  data: {
    isModal: false, //是否显示拒绝保存图片后的弹窗
    imgDraw: {}, //绘制图片的大对象
    sharePath: '', //生成的分享图
    visible: false,
    data: '',
    bgColor:{
      "color": true,
      "border": true
    },
    title: '二维码分享',
    pageHome: false,
    backHome: true,
    paddingTop:topHeight,
    qrCodePath:''
  },
  lifetimes: {
    attached: function () {
      this.drawCode(1,2);
      // 在组件实例进入页面节点树时执行
      console.log(this.data)
      this.setData({
        data: this.data.item
      })
      this.drawPic()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  observers:{
    "obj":function(val){
      this.drawPic()
    }
  },

  methods: {
    handlePhotoSaved() {
      this.savePhoto(this.data.sharePath)
    },
    handleClose() {
      this.setData({
        visible: false
      })
    },
    drawPic() {
      const that = this;
      console.log(2)
      let data = this.data.data;
      console.log(data)
      wx.showLoading({
        title: '生成中'
      })


      let info = wx.getStorageSync('info')
      if (!!wx.getStorageSync('info').agentId) {
        info.realName = info.nickname

      }
      // info.storeName =  info.storeName ?  '('+info.storeName+')':""
      if (this.data.sharePath) { //如果已经绘制过了本地保存有图片不需要重新绘制
        this.setData({
          visible: true
        })
        this.triggerEvent('initData')
        return
      }

      this.setData({
        imgDraw: {
          width: '750rpx',
          height: '1334rpx',
          background: '/combination/image/bg_share_h667@2x.png',
          views: [
            {
              type: "image",
              url: "/combination/image/icon_logo_w@2x.png",
              css: {
                left: "522rpx",
                top: "86rpx",
                height: "46rpx",
                width: "184rpx",
              }
            },
            {
              type: "image",
              url: info.headImgUri,
              css: {
                left: "32rpx",
                top: "196rpx",
                height: "100rpx",
                width: "100rpx",
                borderRadius: '50rpx'
              }
            },
            {
              id: "my-text-id",
              type: "text",
              text: info.realName,
              css: {
                top: '198rpx',
                left: '156rpx',
                fontWeight: "bold",
                fontSize: "36rpx"
              },
            },
            {
              type: "text",
              text: info.storeName+'向你推荐',
              css: {
                top: '256rpx',
                left: '156rpx',
                fontSize:"28rpx"
              },
            },
            {
              type: 'rect',
              css: {
                top: '336rpx',
                left: '32rpx',
                background: "rgba(255, 255, 255, 1)",
                width: '686rpx',
                height: '532rpx',
                borderRadius: '16rpx'
              },
            },
            {
              type: "text",
              text: this.data.obj.title,
              css: {
                top: '372rpx',
                left: '72rpx',
                fontSize: "48rpx",
                fontWeight: "bold",
                maxLines: "2",
                width: '606rpx',
                lineHeight: "60rpx"
              },
            },
            {
              type: "text",
              text: this.data.obj.desc,
              css: {
                top: '528rpx',
                left: '72rpx',
                fontSize: "32rpx",
                maxLines: "5",
                color: "#666666",
                width: '606rpx',
                lineHeight: "60rpx"
              },
            },
            // {
            //   type: "image",
            //   url: '/combination/image/white-bg.png',
            //   css: {
            //     left: "264rpx",
            //     top: "930rpx",
            //     height: "250rpx",
            //     width: "250rpx"
            //   }
            // },
            {
              type: 'image',
              url: that.data.qrCodePath,
              css: {
                top: '946rpx',
                left: '280rpx',
                width: '240rpx',
                height: '234rpx',
              }
            },
            {
              type: 'text',
              text: "识别小程序码查看更多房源资讯",
              css: {
                top: '1190rpx',
                left: "180rpx",
                fontSize: "28rpx"
              }
            },
            // {
            //   type: 'rect',
            //   // content:"",
            //   css: {
            //     top: '490rpx',
            //     background: "rgba(255, 255, 255, 1)",
            //     left: '32rpx',
            //     // right: '0rpx',
            //     width: '686rpx',
            //     height: '532rpx',
            //     borderRadius: '16rpx'
            //   },
            // },

            // // {
            // //   type: 'text',
            // //   text: data.realName,
            // //   css: {
            // //     top: '420rpx',
            // //     left: '125rpx',
            // //     align: 'left',
            // //     fontSize: '32rpx',
            // //     color: '#333333',
            // //     fontWeight: 'bold',
            // //   }
            // // },
            // // {
            // //   type: 'image',
            // //   url: '/combination/image/icon_phonecall_30@2x.png',
            // //   css: {
            // //     top: '480rpx',
            // //     left: '125rpx',
            // //     width: '40rpx',
            // //     height: '40rpx'
            // //   }
            // // },
            // // {
            // //   type: 'text',
            // //   text: data.phone,
            // //   css: {
            // //     top: '480rpx',
            // //     left: '180rpx',
            // //     align: 'left',
            // //     fontSize: '30rpx',
            // //     color: '#333333'
            // //   }
            // // },
          ]
        }
      })
    },
    onImgErr(e) {
      wx.hideLoading()
      wx.showToast({
        title: '生成分享图失败，请刷新页面重试'
      })
    },
    onImgOK(e) {
      wx.hideLoading()
      this.setData({
        sharePath: e.detail.path,
        visible: true,
      })
      //通知外部绘制完成，重置isCanDraw为false
      this.triggerEvent('initData')
    },
    preventDefault() { },
    // 保存图片
    savePhoto(path) {
      wx.showLoading({
        title: '正在保存...',
        mask: true
      })
      this.setData({
        isDrawImage: false
      })
      wx.saveImageToPhotosAlbum({
        filePath: path,
        success: (res) => {
          wx.showToast({
            title: '保存成功',
            icon: 'none'
          })
          setTimeout(() => {
            this.setData({
              visible: false
            })
          }, 300)
        },
        fail: (res) => {
          wx.getSetting({
            success: res => {
              let authSetting = res.authSetting
              if (!authSetting['scope.writePhotosAlbum']) {
                this.setData({
                  isModal: true
                })
              }
            }
          })
          setTimeout(() => {
            wx.hideLoading()
            this.setData({
              visible: false
            })
          }, 300)
        }
      })
    }
  }
})
