const systemInfo = wx.getSystemInfoSync();
let system = systemInfo.system.toLowerCase();
let _height = 0;
if (system.match("android")) {
  _height = 7.5;
} else if (system.match("ios")) {
  _height = 4;
}
const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
let navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight + _height;
let menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
let menuRight = systemInfo.screenWidth - menuButtonInfo.right;
let menuHeight = menuButtonInfo.height + _height;
let maxHeight = systemInfo.statusBarHeight + _height;
Component({

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: navBarHeight, //导航栏高度
    menuRight: menuRight, // 胶囊距右方间距（方保持左、右间距一致）
    menuBotton: menuBotton,
    menuHeight: menuHeight,
    maxHeight: maxHeight,
    newTop: 0,
    border: '',
    bg: '',
    titleColor: '',
  },
  properties: {
    back: {
      type: Boolean, //类型
      value: false //默认值
    },
    backHome: {
      type: Boolean, //类型
      value: false //默认值
    },
    bgColor: {
      type: Object, //类型
      value: {} //默认值
    },
    title: {
      type: String, //类型
      value: '' //默认值
    },
    top: {
      type: Number, //类型
      value: 0 //默认值
    },
  },
  observers: {
    top(val, newVal) {
      if (val > 100) {
        this.setData({
          'bg': '#FFD200'
        })
      } else {
        this.setData({
          'bg': ''
        })
      }
    },
    bgColor(val, newVal) {
      if (val !== null) {
        if (val.color) {
          this.setData({
            'bg': '#FFFFFF'
          })
        };
        if (val.border) {
          this.setData({
            border: true
          })
        };
        if (val.titleColor) {
          this.setData({
            titleColor: true
          })
        }
      }
    },
  },

  methods: {
    back() {
      wx.navigateBack({
        delta: 1
      })
    },
    toHome() {
      wx.navigateTo({
        url: `/pages/index/index`
      })
    },
  }
})