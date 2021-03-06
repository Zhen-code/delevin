// combination/pages/comment/index.js
const topHeight = require('../../../request/topHeight.js').topHeight;
const {http} = require('../../../request/http');
const {api} = require('../../../request/api');
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
    commentValue: '',
    disable:true
  },
  timeFlag: 1,
  targetId: '',
  type: '',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let {targetId,type} = options;
    this.targetId = Number(targetId);
    this.type = type;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
    })
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
  onShareAppMessage: function () {

  },
  commentInput(e){
    console.log(e)
      let {value} = e.detail;
      if(value===''||value===null){
        this.setData({
          disable:true
        });
      }else{
        this.setData({
          commentValue:value,
          disable:false
        })
      }
  },
  go(){
    if (this.data.commentValue === '' || !this.data.commentValue || this.data.commentValue===null){
      return;
    }
    if(this.type === "NEWS") {
      http({
        url: api.personalHome.commentNewPost,
        method: 'POST',
        params: {
          content: this.data.commentValue,
          targetId: this.targetId,
          type: "NEWS"
        }
      }).then(res=>{
        console.log(res)
        wx.showToast({
          icon: "none",
          title: '评论成功！',
          duration:1000
        });
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          });
        },1000);
      }).catch(err=>{
        console.log(err);
      })
    }else if(this.type === "POST"){
      http({
        url: api.personalHome.commentNewPost,
        method: 'POST',
        params: {
          content: this.data.commentValue,
          targetId: this.targetId,
          type: "POST"
        }
      }).then(res=>{
        console.log(res);
        wx.showToast({
          icon: "none",
          title: '评论成功！',
          duration:1000
        });
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          });
        },1000)}).catch(err=>{
          console.log(err);
        })
    }
  }
})
