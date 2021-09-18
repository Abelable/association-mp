Component({
  properties: {
    item: Object
  },

  data: {
    fold: true,
  },

  lifetimes: {
    attached() {
      wx.showLoading({ title: '加载中...' })
    }
  },

  methods: {
    unfold() {
      this.setData({
        fold: false
      })
    },

    load() {
      wx.hideLoading()
    }
  }
})
