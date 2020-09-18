// pages/watchhot/watchhot.js
const {topHeight} = require('../../request/topHeight');
const {http} = require('../../request/http');
const {api} = require('../../request/api');

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
    _index: '0',
    active: 0,
    tabActive: 0,
    list: [],
    fId: 0,
    newsList: [],
    postList:[],
    isBottom: true,
    isPostBottom: true,
    triggered: false
  },
  pageIndex: 1,
  pageSize: 10,
  pageTotal: 0,
  classifyId: 0,
  postPIndex:1,
  postPSize: 10,
  postPTotal: 0,
  scrollTop() {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  topList(){
    console.log('下拉')
    // this.pageIndex = 1;
    this.getArticleClassify();
    this.getPostList();
    this.setData({
      triggered: false,
    })
  },
  scrollList(){
    console.log('上拉')
    if(this.data._index == 0){
      this.pageIndex++;
      if(this.pageIndex>this.pageTotal){
        this.setData({
          isBottom: true
        })
      }else{
        this.getNewsList(this.classifyId);
      }
    }else if(this.data._index == 1){
      this.postPIndex++;
      if(this.postPIndex>this.postPTotal){
        this.setData({
          isPostBottom: true
        })
      }else{
        this.getPostList();
      }
    }
  },
  toggleTab(e) {
    console.log(this.data.list)
    this.setData({
      _index: e.target.dataset.index
    })
  },
  onChange(event) {
    console.log(event.detail);
    this.setData({
      tabActive: event.detail.index,
      newsList:[]
    });
    this.pageIndex = 1;
    let {index} =  event.detail;
    let {list} = this.data;
    let classifyId = list[index]['id'];
    this.classifyId = classifyId;
    this.getNewsList(classifyId);
  },
  goHouseDetal(e){
    wx.navigateTo({
      url: '/combination/pages/aspectDetail/index?id=' + e.currentTarget.dataset.id,
    })
    console.log(e.currentTarget.dataset.id);
  },
  goPostDetail(e){
    wx.navigateTo({
      url: '/combination/pages/postDetail/index?id=' + e.currentTarget.dataset.id
    })
  },
  post(){
    wx.navigateTo({
      url: '/combination/pages/post/index'
    })
  },
  getNewsList(classifyId){
    http({
      url: api.personalHome.newsList,
      method: 'GET',
      params:{
        classifyId: classifyId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
    }).then(res=>{
      console.log(res)
      let isBottom = true;
      if(res.pageIndex>=res.pageTotal){

      }else{
        isBottom = false;
      }
      this.pageTotal = res.pageTotal;
      let {newsList} = this.data;
      let resList = res.list || [];
      this.setData({
        newsList: [...newsList,...resList],
        isBottom:isBottom
      });
    }).catch(err=>{
      console.log(err);
    })
  },
  getArticleClassify(){
    console.log(666)
    http({
      url: api.personalHome.articleClassify,
      method: 'GET',
      params:{
        type: 'NEWS'
      }
    }).then(res=>{
      console.log(res);
        this.setData({
          list: res|| [],
          fId: res[0]['id']|| 0,
        })
    }).then(()=>{
      http({
        url: api.personalHome.newsList,
        method: 'GET',
        params:{
          classifyId: this.data.fId,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(res=>{
        console.log(res)
        let isBottom = true;
        if(res.pageIndex>=res.pageTotal){

        }else{
          isBottom = false;
        }
        this.pageTotal = res.pageTotal;
        this.setData({
          newsList: res.list,
          isBottom:isBottom
        });
      }).catch(err=>{
        console.log(err);
      })
    }).catch(err=>{
      console.log(err);
    })
  },
  getPostList(){
    http({
      url: api.personalHome.postList,
      method: 'GET',
      params:{
        pageIndex: this.postPIndex,
        pageSize: this.postPSize
      }
    }).then(res=>{
      console.log(res)
      let isPostBottom = true;
      if(res.pageIndex>=res.pageTotal){

      }else{
        isPostBottom = false;
      }
      this.postPTotal = res.pageTotal;
      let {postList} = this.data;
      let resList = res.list || [];
      this.setData({
        postList: [...postList,...resList],
        isPostBottom:isPostBottom
      });
    }).catch(err=>{
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticleClassify();
    this.getPostList();
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
  onShareAppMessage: function () {

  }
})
