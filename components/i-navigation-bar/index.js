Component({
  properties: {
    title: {
      type: String,
      value: "标题",
    },
    customBack: {
      type: Boolean,
      value: false
    }
  },
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight
  },
  methods: {
    navigateBack() {
      this.properties.customBack ? this.triggerEvent('navigateBack') : wx.navigateBack()
    }
  }
})
