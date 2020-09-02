// combination/pages/post/index.js
const {topHeight} = require('../../../request/topHeight');
import Toast from "../../../miniprogram_npm/vant-weapp/toast/toast";
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
    title: '',
    content: '',
    label:'',
    fileList: [
      {
        url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=137857614,3957930467&fm=26&gp=0.jpg'
      },
      {
        url: 'https://common-fd.zol-img.com.cn/g6/M00/0C/0B/ChMkKV9PWCyILa9sAABE7jtAJdcAABylAO02AAAAEUG381.jpg'
      }
          ],
    timeFlag:1,
    disable: true
  },
  titleInput(e){
    console.log(e)
    clearTimeout(this.timeFlag);
    setTimeout(()=>{
      let {value} = e.detail;
      if(value===""||this.data.content===""){
        this.setData({
          title: value,
          disable: true
        });
        return;
      }else{
        this.setData({
          title: value,
          disable: false
        })
      }
    },2000);
  },
  contentInput(e){
    console.log(e);
    clearTimeout(this.timeFlag);
    setTimeout(()=>{
      let {value} = e.detail;
      if(value===""||this.data.title===""){
        this.setData({
          content: value,
          disable: true
        });
        return;
      }else{
        this.setData({
          content: value,
          disable: false
        })
      }
    },2000);
  },
  afterRead(event) {
    const { file } = event.detail;
    let pathArray = file.map(item=>{
      return item.path;
    });
    console.log(file)
    for(let i=0;i<pathArray.length;i++){
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      wx.uploadFile({
        url: 'http://my.zol.com.cn/index.php?c=Ajax_User&a=uploadImg', // 仅为示例，非真实的接口地址
        filePath: pathArray[i],
        name: 'myPhoto',
        formData: { user: 'user' },
        success:(response)=> {
          let res = JSON.parse(response.data);
          // console.log(res);
          // 上传完成需要更新 fileList
          let {url} = res;
          if(url!==null&&url!==''){
            console.log(typeof url)
            url = url.replace("\\", '');
          }
          // console.log(url);
          let {fileList} = this.data;
          fileList.push({ url });
          this.setData({ fileList });
        },
        fail(err){
          console.log(err);
        },
        complete(){
          console.log(666)
        }
      });
    }
  },
  deleteImg(e){
    console.log(e)
    let {index} = e.detail;
    let {fileList} = this.data;
    fileList.splice(index,1);
    this.setData({
      fileList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    console.log(666)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
