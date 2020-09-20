// pages/watchhot/watchhot.js
//功能已经更新，请勿删除！！！！！！！！！！！！！！！！
//功能已经更新，请勿删除！！！！！！！！！！！！！！！！
const {topHeight} = require('../../request/topHeight');
const {http} = require('../../request/http');
const {api} = require('../../request/api');
var sy = 0;
//功能已经更新，请勿删除！！！！！！！！！！！！！！！！
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
    triggered: false,
    isIndrag: false,
    scrollTop: 0,
    hei: 0,
    desc: '下拉刷新'
  },
  pageIndex: 1,
  pageSize: 10,
  pageTotal: 0,
  classifyId: 0,
  postPIndex:1,
  postPSize: 10,
  postPTotal: 0,
  timeFlag: 1,
  i:0,
  start(e){
    sy = e.touches[0].clientY;
  },
  end(e){
    // console.log(e)
    sy = 0;
    let that = this;
    // console.log('离开高度'+this.data.hei)
    if(this.data.hei>80){
      this.setData({
        desc: '正在刷新',
        hei: 80
      });
      that.pageIndex = 1;
      if(that.data._index == 0){
        that.getNewsList(that.classifyId);
      }else if(that.data._index == 1){
        that.getPostList();
      }
      // console.log('下拉刷新了')
    }else{
      this.setData({
        desc: '下拉刷新',
        hei: 0,
        isIndrag: false
      })
    }
  },
  move(e){
    // console.log(e)
    let delta = e.touches[0].clientY - sy;
    if(this.data.hei<=0 && delta<=0){
      console.log('上拉')
      return
    }
    if(this.data.scrollTop>0){
      return;
    }
    if(this.data.scrollTop<=0){
      // console.log('触发顶部，scrollTopo<=0')
      console.log(this.data.scrollTop);
      if(!this.data.isIndrag){
        this.setData({
          isIndrag: true
        })
      }
      var tempdelta = 0;
      if(delta>0){
        console.log('正在下拉')
        if(this.data.hei>80){
          // console.log('hei='+'80')
          this.setData({
            desc: '松开刷新'
          })
          tempdelta =  this.data.hei+delta/ (this.data.hei - 80)
        }else{
          // console.log('hei未达到80')
          this.setData({
            desc: '下拉刷新'
          });
          tempdelta = this.data.hei+delta;
        }
      }else{
        // console.log('正在上拉'+this.data.hei + delta)
        tempdelta = this.data.hei + delta;
        if(tempdelta<=0){
          tempdelta = 0;
        }
        this.setData({
          desc: '下拉刷新'
        })
      }
      this.setData({
        hei: tempdelta
      })
    }
    sy = e.touches[0].clientY;
  },
  scroll(e){
    clearTimeout(this.timeFlag);
    this.timeFlag = setTimeout(()=>{
      let st = e.detail.scrollTop;
      // console.log('st='+st)
      this.setData({
        scrollTop: st
      })
    },200);
  },
  scrollList(){
    this.i = (this.i)+1;
    if(this.i>=2){
      return
    }
    if(this.data._index == 0){
      this.pageIndex++;
      if(this.pageIndex>this.pageTotal){
        this.i = 0;
        this.setData({
          isBottom: true
        })
      }else{
        this.getNewsList(this.classifyId);
      }
    }else if(this.data._index == 1){
      this.postPIndex++;
      if(this.postPIndex>this.postPTotal){
        this.i = 0;
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
      if(this.data.hei>=80){
        this.setData({
          newsList: resList,
          isBottom:isBottom
        })
      }else{
        this.setData({
          newsList: [...newsList,...resList],
          isBottom:isBottom
        });
      }
    }).then(()=>{
          this.i = 0;
          this.setData({
            scrollTop: 0,
            hei: 0,
            isIndrag: false,
            desc: '下拉刷新'
          })
        }
    ).catch(err=>{
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
      if(this.data.hei>=80){
        this.setData({
          postList: [...postList,...resList],
          isPostBottom:isPostBottom
        });
      }else{
        this.setData({
          postList: resList,
          isPostBottom:isPostBottom
        });
      }
    }).then(()=>{
      this.setData({
        scrollTop: 0,
        hei: 0,
        isIndrag: false,
        desc: '下拉刷新'
      })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
