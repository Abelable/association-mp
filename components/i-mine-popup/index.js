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
    navToCollect() {
      wx.navigateTo({ url: '/pages/register/subpages/collect/index' })
    },

    navToRecord() {
      wx.navigateTo({ url: '/pages/register/subpages/record/index' })
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
