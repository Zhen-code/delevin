Component({
  properties: {
    //属性值可以在组件使用时指定
    isCanDraw: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal) {
        newVal && this.drawPic()
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
      let data = this.data.data;
      if (this.data.sharePath) { //如果已经绘制过了本地保存有图片不需要重新绘制
        this.setData({
          visible: true
        })
        this.triggerEvent('initData')
        return
      }
      wx.showLoading({
        title: '生成中'
      })
      this.setData({
        imgDraw: {
          width: '750rpx',
          height: '1700rpx',
          background: '/combination/image/bg_house@2x.png',
          views: [{
              type: 'image',
              url: '/combination/image/bg_qr_white@2x.png',
              css: {
                top: '350rpx',
                left: '55rpx',
                right: '55rpx',
                width: '640rpx',
                height: '880rpx',
                borderRadius: '16rpx'
              },
            },
            {
              type: 'text',
              text: data.realName,
              css: {
                top: '420rpx',
                left: '125rpx',
                align: 'left',
                fontSize: '32rpx',
                color: '#333333',
                fontWeight: 'bold',
              }
            },
            {
              type: 'image',
              url: '/combination/image/icon_phonecall_30@2x.png',
              css: {
                top: '480rpx',
                left: '125rpx',
                width: '40rpx',
                height: '40rpx'
              }
            },
            {
              type: 'text',
              text: data.phone,
              css: {
                top: '480rpx',
                left: '180rpx',
                align: 'left',
                fontSize: '30rpx',
                color: '#333333'
              }
            },
            {
              type: 'text',
              text: data.synopsis || '请将我推荐给有需要的人',
              css: {
                width: '500rpx',
                height: '100rpx',
                top: '560rpx',
                left: '125rpx',
                maxLines: 2,
                align: 'left',
                fontSize: '28rpx',
                color: '#999999'
              }
            },
            {
              type: 'image',
              url: data.tempFilePath,
              css: {
                top: '670rpx',
                left: '170rpx',
                width: '400rpx',
                height: '400rpx',
              }
            },
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
    preventDefault() {},
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