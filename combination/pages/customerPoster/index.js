const topHeight = require('../../../request/topHeight.js').topHeight;
const {http} = require('../../../request/http');
const {api} = require('../../../request/api');
Page( {

	/**
	 * 页面的初始数据
	 */
	data: {
		paddingTop: topHeight,
		bgColor: {
			"color": true,
			"border": true,
		},
		tabItem: ['配图', '配文', ],
		tabIndex:0,
		activeKey: 0,
		goodArray: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
		isShow: false,
		iconName: 'arrow-down',
		showName: '展开',
		contents: '我所有的自负皆来自我的自卑，所有的英雄气概都来自于我的软弱。嘴里振振有词是因为心里满是怀疑，深情是因为痛恨自己无情。这世界没有一件事情是虚空而生的，站在光里，背后就会有阴影，这深夜里一片寂静，是因为你还没有听见声音。',
		noramalData: [],
		leftList: [],
		rightList: [],
		leftHight: 0,
		rightHight: 0,
		classifyList: [],
		supportText: [],
		height: 0,
		flexd: false,
		show: false,
	},
	classifyId: 0,
	pageIndex: 1,
	pageSize: 12,
	pageTotal: 0,
	getArticleClassify(){
		http({
			url: '/api/access/v1/article/classify/list',
			method: 'GET',
			params:{
				type: 'SUPPORTING_TEXT'
			}
		}).then(res=>{
			console.log(res)
			this.classifyId = res[0]['id'];
			this.setData({
				classifyList: res
			})
		}).then(()=>{
			this.getImg(this.classifyId);
			this.getArticle(this.classifyId);
		}).catch(err=>{
			console.log(err)
		})
	},
	toggle(e) {
		console.log(e)
		let {index} = e.currentTarget.dataset;
		let {supportText} = this.data;
		let show = !supportText[index]['isShow'];
		supportText[index]['isShow'] = show;
		console.log(show)
		// iconName: !isShow ? 'arrow-up' : 'arrow-down',
		// 	showName: !isShow ? '收起' : '展开',
		this.setData({
			supportText:supportText
		})
	},

	copyBtn: function (e) {
		wx.setClipboardData({
			data: e.currentTarget.dataset.text,
			success: function (res) {
				wx.getClipboardData({
					success: function (res) {
						wx.showToast({
							title: '复制成功'
						})
					}
				})
			}
		})
	},

	getBackTabIndex(e) {
		this.setData({
			tabIndex:e.detail
		})
	},
	getImg(classifyId){
		http({
			url: api.operation.supportPoster,
			method: 'GET',
			params: {
				classifyId: classifyId,
				pageIndex: this.pageIndex,
				pageSize: this.pageSize
			}
		}).then(res=>{
			console.log(res);
			let dataArray = res.list.map((v,i)=>{
				if(i%2===0){
					v.CoverHeight = 160;
					v.CoverWidth = 122;
				}else{
					v.CoverHeight =  190;
					v.CoverWidth = 122;
				}
				return v;
			});
			if(dataArray.length === 0){
				this.setData({
					height: 80,
					flexd: true,
					show: true
				})
			}else{
				this.setData({
					noramalData: dataArray,
					height: 0,
					flexd: false,
					show: false
			})
			}
		}).then(()=>{
			var that = this;
			var allData = that.data.noramalData;
			//定义两个临时的变量来记录左右两栏的高度，避免频繁调用setData方法
			var leftH = that.data.leftHight;
			var rightH = that.data.rightHight;
			var leftData = [];
			var rightData = [];
			for (let i = 0; i < allData.length; i++) {
				var currentItemHeight = parseInt(Math.round(allData[i].CoverHeight * 345 / allData[i].CoverWidth));
				allData[i].CoverHeight = currentItemHeight; //因为xml文件中直接引用的该值作为高度，所以添加对应单位
				if (leftH == rightH || leftH < rightH) { //判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
					leftData.push(allData[i]);
					leftH += currentItemHeight;
				} else {
					rightData.push(allData[i]);
					rightH += currentItemHeight;
				}
			}

			//更新左右两栏的数据以及累计高度
			that.setData({
				leftHight: leftH,
				rightHight: rightH,
				leftList: leftData,
				rightList: rightData
			})


		}).catch(err=>{
			console.log(err)
		})
	},
	getArticle(classifyId){
		http({
			url: api.operation.supportList,
			method: 'GET',
			params: {
				classifyId: classifyId,
				pageIndex: this.pageIndex,
				pageSize: this.pageSize
			}
		}).then(res=>{
			console.log(res)
			if(res===null){
				return;
			}
			this.pageTotal = res.pageTotal?res.pageTotal:0;
			let { supportText } = this.data;
			let list = res.list.map(v=>{
				v.isShow = false;
				return v;
			});
			this.setData({
				supportText: [...supportText,...list]
			})
		}).catch(err=>{
			console.log(err)
		})

	},
	onChange(e) {
		console.log(e)
		this.pageIndex = 1;
		let {id} = e.currentTarget.dataset;
		this.classifyId = id;
		this.setData({
			activeKey:e.currentTarget.dataset.index,
			noramalData: []
		});
		this.getImg(id);
		this.getArticle(id);
	},
	toBottom(){
		console.log(666)
		let pageIndex = this.pageIndex++;
		if(pageIndex>this.pageTotal){

		}else{
			this.getArticle(this.classifyId);
		}
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
