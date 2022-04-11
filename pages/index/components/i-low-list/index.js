Component({
  properties: {
    list: Array
  },

  methods: {
    navTo(e) {
      const { id } = e.currentTarget.dataset
      wx.navigateTo({
        url: `/pages/index/subpages/news/index?id=${id}`
      })
    }
  }
})
