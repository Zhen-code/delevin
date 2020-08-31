// component/search/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    val: {
      type: String, //类型
      value: "" //默认值
    },
  },
  observers: {
    val(val, newVal) {
      this.setData({
        'inputValue': val
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    height: app.globalData.menuHeight,
    top: 0,
    codes: '',
    inputValue: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindCode: function (e) {
      let that = this;
      let val = e.detail.value == undefined ? that.data.codes : e.detail.value; //通过这个传递数据
      let myEventDetail = {
        val: val
      } // detail对象，提供给事件监听函数
      this.triggerEvent('change', myEventDetail) //myevent自定义名称事件，父组件中使/
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
    toBack() {
      wx.navigateBack({
        delta: 1
      })
    },
    // 通过获取系统信息计算导航栏高度
    setNavSize: function () {
      var that = this,
        sysinfo = wx.getSystemInfoSync(),
        statusHeight = sysinfo.statusBarHeight,
        isiOS = sysinfo.system.indexOf('iOS') > -1,
        navHeight;
      if (!isiOS) {
        navHeight = 48;
      } else {
        navHeight = 44;
      }
      that.setData({
        status: statusHeight,
        navHeight: navHeight
      })
    },
    setStyle: function () {
      var that = this,
        containerStyle, textStyle, iconStyle;
      containerStyle = [
        'background:' + that.data.background
      ].join(';');
      textStyle = [
        'color:' + that.data.color,
        'font-size:' + that.data.fontSize + 'px'
      ].join(';');
      iconStyle = [
        'width: ' + that.data.iconWidth + 'px',
        'height: ' + that.data.iconHeight + 'px'
      ].join(';');
      that.setData({
        containerStyle: containerStyle,
        textStyle: textStyle,
        iconStyle: iconStyle
      })
    },
  },
  attached: function () {
    var that = this;
    if (!app.globalData.systeminfo) {
      app.globalData.systeminfo = wx.getSystemInfoSync();
    }
    if (!app.globalData.headerBtnPosi) app.globalData.headerBtnPosi = wx.getMenuButtonBoundingClientRect();
    console.log(app.globalData)
    let statusBarHeight = app.globalData.systeminfo.statusBarHeight // 状态栏高度
    let headerPosi = app.globalData.headerBtnPosi // 胶囊位置信息
    console.log(statusBarHeight)
    console.log(headerPosi)
    let btnPosi = { // 胶囊实际位置，坐标信息不是左上角原点
      height: headerPosi.height,
      width: headerPosi.width,
      top: headerPosi.top - statusBarHeight, // 胶囊top - 状态栏高度
      bottom: headerPosi.bottom - headerPosi.height - statusBarHeight, // 胶囊bottom - 胶囊height - 状态栏height （胶囊实际bottom 为距离导航栏底部的长度）
      right: app.globalData.systeminfo.windowWidth - headerPosi.right // 这里不能获取 屏幕宽度，PC端打开小程序会有BUG，要获取窗口高度 - 胶囊right
    }
    let haveBack;
    if (getCurrentPages().length != 1) { // 当只有一个页面时，并且是从分享页进入
      haveBack = false;
    } else {
      haveBack = true;
    }
    var cusnavH = btnPosi.height + btnPosi.top + btnPosi.bottom // 导航高度
    this.setData({
      haveBack: haveBack, // 获取是否是通过分享进入的小程序
      statusBarHeight: statusBarHeight,
      navbarHeight: headerPosi.bottom + btnPosi.bottom, // 胶囊bottom + 胶囊实际bottom
      navbarBtn: btnPosi,
      cusnavH: cusnavH
    });
  },
})