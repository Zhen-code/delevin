// component/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    val: {
      type: String,//类型
      value: ""//默认值
    },
    placeholder:{
      type:String,
      value:"输入地名/地铁/楼盘/小区查找房源",
    },
    isCancel:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue:""
  },
  created(){
    this.data.inputValue = this.data.val;

  },
  observers:{
    val(val,newVal){
      this.setData({
        'inputValue':val
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindCode: function (e) {
      this.triggerEvent('getData',{detail:e.detail.value});
      this.setData({
        'inputValue':e.detail.value
      });
      // var that = this;
      // var val = e.detail.value == undefined ? that.data.codes : e.detail.value; //通过这个传递数据
      // var myEventDetail = {
      //   val: val
      // } // detail对象，提供给事件监听函数
      // this.triggerEvent('change', myEventDetail) //myevent自定义名称事件，父组件中使/
    },
    cancel(e){
      this.setData({
        'inputValue': ''
      })
      wx.navigateBack({
        delta: -1
      })
    },
    //按了搜索确认按钮后执行的方法
    firm(e) {
      let that = this;
      let val = e.detail.value == undefined ? that.data.codes : e.detail.value; //通过这个传递数据
      let myEventDetail = {
        val: val
      }
      this.triggerEvent('firmInput', myEventDetail) //myevent自定义名称事件，父组件中使/
    },

    search(){
      // let that = this;
      let val = this.data.inputValue
      let myEventDetail = {
        val: val
      }
      this.triggerEvent('search', myEventDetail) //myevent自定义名称事件，父组件中使/
    },
  }
})
