Component({
  properties: {
    list: Array
  },

  methods: {
    navTo(e) {
      const { id, name } = e.currentTarget.dataset.low
      wx.navigateTo({
        url: `/pages/index/subpages/low/index?id=${id}&title=${name}`
      })
    }
  }
})
