Component({
  /**
   * 组件的属性列表
   */
  properties: {
    top: {
      type: Number, //类型
      value: 0 //默认值
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    newTop: 0,
    index:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scrollTop() {
      this.triggerEvent('scrollTop')
    },
  },
  observers: {
    top(val, newVal) {
      this.setData({
        'newTop': val
      })
    },
  }
})