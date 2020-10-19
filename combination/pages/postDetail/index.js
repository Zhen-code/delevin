// combination/pages/postDetail/index.js
const topHeight = require('../../../request/topHeight.js').topHeight;
const {api} = require('../../../request/api');
const {http} = require('../../../request/http');
import Toast from "../../../miniprogram_npm/vant-weapp/toast/toast";
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
    author: '',
    newsImg:[],
    title: '',
    content:'',
    createDate:'',
    commentNumber: 0,
    number: 0,
    collect: 'NO',
    like: '',
    commentList:[],
    placeHolder: '666',
    showTextArea: false,
    id:'',
    winHeight: '',
    tabScrollTop: 0,
    top: 0,
    rpxR: 0,
    isIos: false,
    hideBack: true
  },
  id: '',
  timeFlag: 1,
  addHistoryRecod(id){
    http({
      url: api.browse.browserHistoryAdd,
      method:'POST',
      params:{
        "targetId": id,
        "type": "POST"
      }
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  toReply(e){
    console.log(e)
    let {fatherid , targertid ,name} = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../replyComment/index?fatherid='+fatherid+'&targertid='+targertid+'&nickName='+ name+'&type='+'posts'
    });
  },
  bindconfirm(){
    console.log(666)
    this.setData({
      showTextArea: false
    })
  },
  getPostDetail(id){
    http({
      url: api.personalHome.postDetail(id),
      method: 'GET',
      params:{}
    }).then(res=>{
      console.log(res);
      let newsImg = [];
      if(res.imageUri) {
        newsImg = res.imageUri.split(',');
      }
      this.setData({
        title: res.title,
        content: res.content,
        createDate: res.createDate,
        newsImg: newsImg,
        commentNumber: res.commentNumber,
        number: res.number,
        collect: res.collect,
        commentList: res.commentList,
        like: res.like,
        author: res.author
      });
    }).then(()=>{
      let that = this;
      let toRpx = 0;
      wx.getSystemInfo({
        success: (res)=>{
          toRpx = 750/res.windowWidth;
        }
      });
      let query = wx.createSelectorQuery();
      query.select('#tab-comment').boundingClientRect((res=>{
        console.log(res)
        console.log(res.top)
        let top = res.top*toRpx;
        that.setData({
          tabScrollTop: top
        })
      })).exec();

    }).catch(err=>{
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let {id,hideBack} = options;
    this.setData({
      id,
      hideBack: Boolean(hideBack)
    });
    this.id = id;
    this.addHistoryRecod(id);
    this.getPostDetail(id);
  },
  onPageScroll(options) {
    // console.log(options)
    clearTimeout(this.timeFlag);
    this.timeFlag = setTimeout(()=>{
      this.setData({
        top: options.scrollTop
      })
    },1000);
  },
  goComment(){
    let { tabScrollTop } = this.data;
    wx.pageScrollTo({
      scrollTop: tabScrollTop
    })
  },
  like(){
    let that = this;
    let {like} = this.data;
    if(like == 'NO'){
      http({
        url: '/api/access/v1/post/like',
        method: 'POST',
        params:{
          id: this.id
        }
      }).then(res=>{
        console.log(res);
        that.getPostDetail(that.id);
      }).catch(err=>{
        console.log(err);
      })
    }else if(like == 'YES'){
      http({
        url: '/api/access/v1/post/like/cancel',
        method: 'POST',
        params:{
          id: this.id
        }
      }).then(res=>{
        console.log(res);
        that.getPostDetail(that.id);
      }).catch(err=>{
        console.log(err);
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    wx.getSystemInfo({
      success: (res)=>{
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let rpxR = 750/clientWidth;
        let calc = clientHeight * rpxR;
        that.setData({
          winHeight: calc
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getPostDetail(this.id);
    let res = wx.getSystemInfoSync();
    if(res['model'].includes('iPhone')){
      this.setData({
        isIos: true
      })
    }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let { title} = this.data;
    console.log(res);
    if(res.from === 'button'){

    }
    return {
      title: title,
      path: '/combination/pages/postDetail/index?id='+this.id+'&hideBack=true',
      success: function (res) {
        console.log('成功', res)
      }
    }
  },
  toWrite() {
    wx.navigateTo({
      url: '/combination/pages/comment/index?targetId='+this.id+'&type='+'POST'
    })
  },
  collect(){
    let that = this;
    let {collect} = this.data;
    if(collect == 'NO'){
     http({
       url: '/api/access/v1/member/collection/add',
       method: 'POST',
       params:{
         "targetId": Number(that.id),
         "type": "POST"
       }
     }).then(res=>{
       Toast('收藏成功!');
       console.log(res)
     }).catch(err=>{
       Toast('收藏失败!');
       console.log(err);
     })
    }else if(collect == 'YES'){
      http({
        url: '/api/access/v1/member/collection/cancel',
        method: 'POST',
        params:{
          "targetId": Number(that.id),
          "type": "POST"
        }
      }).then(res=>{
        Toast('取消收藏成功!');
        console.log(res)
      }).catch(err=>{
        Toast('取消收藏失败!');
        console.log(err);
      })
    }
    that.getPostDetail(that.id);
  }
});
