// components/sheet.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type: Boolean,
      value: false
    },
    actions:{
      type: Array,
      value: []
    },
    type:{
      type: String,
      value: ''
    },
    title:{
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    name: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectData(e){
      console.log(e.detail.name);
      this.setData({
        name: e.detail.name
      })
    },
    onClose() {
     this.triggerEvent('onClose',{type:this.properties.type,detail:this.data.name});
      setTimeout(()=>{
        this.setData({
          name: ''
        })
      },500)
    }
  }
})
