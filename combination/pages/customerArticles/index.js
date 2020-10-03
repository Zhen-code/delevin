const app = getApp();
const {topHeight} = require('../../../request/topHeight');
const {http} = require('../../../request/http');
const {api} = require('../../../request/api');

var sy = 0;
Page({
	data: {
		title:'看点',
		type: false,
		paddingTop:topHeight,
		bgColor: {
			"color": true,
			"border": true
		},
		active: 0,
		tabActive: 0,
		list: [],
		fId: 0,
		newsList: [],
		isBottom: true,
		isPostBottom: true,
		triggered: false,
		isIndrag: false,
		scrollTop: 0,
		hei: 0,
		desc: '下拉刷新',
		height: 0,
		flexd: false,
		_index:0,
		isIos: false,
		safeBottom: 0
	},
	pageIndex: 1,
	pageSize: 10,
	pageTotal: 0,
	classifyId: 0,
	postPIndex:1,
	postPSize: 10,
	postPTotal: 0,
	timeFlag: 1,
	showOnce: 1,
	i:0,
	tabItem(e){
		let {index,id} = e.currentTarget.dataset;
		this.setData({
			_index: index,
			newsList:[]
		});
		this.classifyId = id;
		this.pageIndex = 1;
		this.getNewsList(id);
	},
	start(e){
		sy = e.touches[0].clientY;
	},
	end(e){
		sy = 0;
		let that = this;
		that.pageIndex = 1;
		if(this.data.hei>80){
			this.setData({
				desc: '正在刷新',
				hei: 80,
				newsList: []
			});
			that.getNewsList(that.classifyId);
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
			this.pageIndex++;
			if(this.pageIndex>this.pageTotal){
				this.setData({
					isBottom: true
				})
			}else{
				this.getNewsList(this.classifyId);
			}
	},
	goHouseDetal(e){
		wx.navigateTo({
			url: '/combination/pages/customerArticleDetail/index?id=' + e.currentTarget.dataset.id,
		})
		console.log(e.currentTarget.dataset.id);
	},
	getNewsList(classifyId){
		http({
			url: api.personalHome.customerList,
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
			let joinArray = [...newsList,...resList];
			if(joinArray.length===0){
				this.setData({
					height: 70,
					flexd: true,
					show: true,
					isBottom: false
				});
				return;
			}else{
				this.setData({
					height: 0,
					flexd: false,
					show: false
				})
			}
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
		http({
			url: api.personalHome.articleClassify,
			method: 'GET',
			params:{
				type: 'CUSTOMERS'
			}
		}).then(res=>{
			console.log(res);
			this.classifyId = res[0]['id'];
			this.setData({
				list: res|| [],
				fId: res[0]['id']|| 0,
			})
		}).then(()=>{
			http({
				url: api.personalHome.customerList,
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
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getArticleClassify();
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
		let res = wx.getSystemInfoSync();
		if(res['model'].includes('iPhone')){
			this.setData({
				isIos: true,
				safeBottom: Number(res.safeArea.bottom - res.safeArea.height)
			})
		}
	},

})
