const { statusBarHeight } = getApp().globalData

Component({ 
  data: {
    statusBarHeight,
    show: false
  },

  lifetimes: {
    attached() {
      setTimeout(() => {
        this.setData({ show: true })
      }, 50)
    }
  },

  methods: { 
    navToRecord() {
      wx.navigateTo({ url: './subpages/record/index' })
    },

    hide() {
      this.setData({
        show: false
      }, () => {
        setTimeout(() => {
          this.triggerEvent('hide')
        }, 200)
      })
    },

    catchtap() {}
  }
})
