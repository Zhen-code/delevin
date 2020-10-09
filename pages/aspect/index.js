// pages/watchhot/watchhot.js
const app = getApp()
const {topHeight} = require('../../request/topHeight');
const {http} = require('../../request/http');
const {api} = require('../../request/api');
const {
	request
} = require('../../request/request.js');
var sy = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'看点',
    type: false,
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
    desc: '下拉刷新',
    on_index: 0,
    tabItem: ['新房/楼盘', '二手房', '租房', '小区'],
		item: [],
		pageIndex: 1,
		pageSize: 12,
		placeholder: '输入地名/地铁/楼盘/小区查找房源',
		value: '',
		keyword: '',
		city: '',
		province: '',
		index: 0,
  },
  pageIndex: 1,
  pageSize: 10,
  pageTotal: 0,
  classifyId: 0,
  postPIndex:1,
  postPSize: 10,
  postPTotal: 0,
  timeFlag: 1,
  start(e){
    sy = e.touches[0].clientY;
  },
  end(e){
    // console.log(e)
    sy = 0;
    let that = this;
    // console.log('离开高度'+this.data.hei)
    if(this.data.hei>80){
      if(that.data._index == 0){
          that.setData({
              desc: '正在刷新',
              hei: 80,
              newsList: []
          });
          that.pageIndex = 1;
          that.getNewsList(that.classifyId);
      }else if(that.data._index == 1){
          that.setData({
              desc: '正在刷新',
              hei: 80,
              postList:[]
          });
          that.postPIndex = 1;
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
  goHouseDetal(e){
    wx.navigateTo({
      url: '/combination/pages/aspectDetail/index?id=' + e.currentTarget.dataset.id+'&hideBack=true',
    })
    console.log(e.currentTarget.dataset.id);
  },
  goPostDetail(e){
    wx.navigateTo({
      url: '/combination/pages/postDetail/index?id=' + e.currentTarget.dataset.id+'&hideBack=true'
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

    }).then(()=>{
          this.i = 0;
          this.setData({
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
    http({
      url: api.personalHome.articleClassify,
      method: 'GET',
      params:{
        type: 'NEWS'
      }
    }).then(res=>{
      console.log(res);
        this.classifyId = res[0]['id']|| 0;
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
    }).then(()=>{
      this.setData({
        hei: 0,
        isIndrag: false,
        desc: '下拉刷新'
      })
    }).catch(err=>{
      console.log(err);
    })
  },
  tabItem(e){
    let {index,id} = e.currentTarget.dataset;
    this.setData({
      on_index: index,
      newsList:[]
    });
    this.classifyId = id;
    this.pageIndex = 1;
    this.getNewsList(id);
  },

  getCityValue(e) {
		this.setData({
			province: e.detail[0].name,
			city: e.detail[1].name,
		}, () => {
			this.getData()
		})
	},

	getInputValue(e) {
		this.setData({
			keyword: e.detail
		})
	},

	getSearchValue(e) {
		this.setData({
			keyword: e.detail.value,
			city: e.detail.city,
			province: e.detail.province || app.globalData.address.province,
		},()=>{
			this.getData()
		})
	},

	getBackTabValue(e) {
		this.setData({
			item:[],
			pageIndex:1,
			index: e.detail
		},()=>{
			this.getData()
		})
	},

	scrollTop() {
		wx.pageScrollTo({
			scrollTop: 0
		})
	},

	topList() {
		this.setData({
			triggered: false,
		})
		this.getData()
	},

	scrollLists() {
		this.getData()
	},

	getData() {
		let requests = '';
		let {
			index,
			city,
			item,
			keyword,
			province,
			pageIndex,
			pageSize,
		} = this.data;
		switch (index) {
			case 0:
				requests = request.newListings;
				break
			case 1:
				requests = request.towListings;
				break
			case 2:
				requests = request.tenancyListings;
				break
			case 3:
				requests = request.quartersListings;
				break
		}
		requests({
			"city": city,
			"keyword": keyword,
			"pageIndex": pageIndex,
			"pageSize": pageSize,
			"province": province,
		}).then((res) => {
			item.push(...res.list)
			this.setData({
				item: item,
				pageIndex: pageIndex + 1,
			})
		}).catch((err) => {
			wx.showToast({
				title: '数据错误',
				icon: 'none',
				duration: 2500
			})
		})
	},

	toDetails(e){
		let type = '';
		switch (this.data.index) {
			case 0:
				type = "新房房源";
				break;
			case 1:
				type = "二手房房源";
				break;
			case 2:
				type = "租房房源";
				break;
			case 3:
				type = "小区房源";
				break;
			default:
		}
		let item = JSON.stringify({
			'title': type,
			"id": e.currentTarget.dataset.item.id,
		})
		wx.navigateTo({
			url: `/combination/pages/listingDetails/index?item=${item}`,
		})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.state){
      this.getArticleClassify();
    }else{
      this.setData({
        city: app.globalData.address.city || '',
        province: app.globalData.address.province || '',
        value: options.title || '',
        keyword:options.title || '',
      },()=>{
        this.getData()
      })
    }
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
    this.setData({
      title:app.globalData.state?'看点':'房源',
			type: app.globalData.state
		});
    this.postPIndex = 1;
    this.getPostList();
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
