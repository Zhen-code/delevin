// combination/pages/aspectDetail/index.js
const topHeight = require('../../../request/topHeight.js').topHeight;
const {api} = require('../../../request/api');
const {http} = require('../../../request/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paddingTop:topHeight,
    bgColor: {
      "color": true,
      "border": true
    },
    newsImg:[
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1251668712,1631279038&fm=26&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3054075612,3413957361&fm=26&gp=0.jpg'
    ],
    collect: '',
    commentCount: '',
    commentList: [],
    title: '',
    author: '',
    time: '',
    nodes: '',
    winHeight: 0,
    tabScrollTop: 0,
    top: 0,
    id: '',
    toView: '',
    safeBottom: 0,
    isIos: false,
    hideBack: true
  },
  targetId: '',
  id: '',
  timeFlag: 1,
  getNewsDetail(id){
    http({
      url: api.personalHome.newsDetail(id),
      method: 'GET',
      params:{}
    }).then(res=>{
      console.log(res)
      this.setData({
        title: res.name,
        author: res.author,
        collect: res.collect,
        commentCount: res.commentCount,
        commentList: res.commentList,
        time: res.createDate,
        nodes: res.newsDetails.replace(/\<img /gi,'<img class="news-img" ')
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
        // console.log(res)
        console.log(res.top)
        let top = (res.top*toRpx);
        // console.log(top)
        that.setData({
          tabScrollTop: top
        })
      })).exec();
      // query.select('#content').boundingClientRect((res=>{
      //   console.log(res)
      //   console.log(res.top)
      // })).exec();

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
    console.log(hideBack)
    this.setData({
      id: id,
      hideBack: Boolean(hideBack)
    });
    this.targetId = id;
    this.id = id;
    this.addHistoryRecod(id);
    this.getNewsDetail(id);
  },
  onPageScroll(options) {
    console.log(options)
    clearTimeout(this.timeFlag);
    this.timeFlag = setTimeout(()=>{
      this.setData({
        top: options.scrollTop
      })
    },1000);
  },
  addHistoryRecod(id){
    http({
      url: api.browse.browserHistoryAdd,
      method:'POST',
      params:{
        "targetId": id,
        "type": "NEWS"
      }
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  goComment(){
    let { tabScrollTop } = this.data;
    wx.pageScrollTo({
      scrollTop: tabScrollTop
    })
  },
  toReplay(e){
    console.log(e)
    let {fatherid,nickname,targetid} = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../replyComment/index?fatherid='+fatherid+'&targertid='+targetid+'&nickName='+ nickname+'&type='+'news'
    });
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
        // console.log(calc)
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
    this.getNewsDetail(this.id);
    let res = wx.getSystemInfoSync();
    if(res['model'].includes('iPhone')){
      this.setData({
        safeBottom: Number(res.safeArea.bottom-res.safeArea.height),
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let { title} = this.data;
    console.log(res);
    return {
      title: title,
      path: '/combination/pages/aspectDetail/index?id='+this.id+'&hideBack=false',
      success: function (res) {
        console.log('成功', res)
      }
    }

  },
  toWrite(){
    wx.navigateTo({
      url: '/combination/pages/comment/index?targetId='+this.targetId+'&type='+'NEWS'
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
          "type": "NEWS"
        }
      }).then(res=>{
        console.log(res);
        wx.showToast({
          title: '收藏成功!',
          icon:"none",
          duration: 1000
        });
      }).catch(err=>{
        wx.showToast({
          title: '收藏失败!',
          icon:"none",
          duration: 1000
        });
        console.log(err);
      })
    }else if(collect == 'YES'){
      http({
        url: '/api/access/v1/member/collection/cancel',
        method: 'POST',
        params:{
          "targetId": Number(that.id),
          "type": "NEWS"
        }
      }).then(res=>{
        wx.showToast({
          title: '取消收藏成功!',
          icon:"none",
          duration: 1000
        });
        console.log(res)
      }).catch(err=>{
        wx.showToast({
          title: '取消收藏失败!',
          icon:"none",
          duration: 1000
        });
        console.log(err);
      })
    }
    that.getNewsDetail(that.id);
  }
});
