Component({
  properties: {
    item: Object
  },

  methods: {
    navTo() {
      const { id } = this.properties.item
      wx.navigateTo({
        url: `/pages/index/subpages/low/subpages/low-detail/index?id=${id}`
      })
    }
  }
})
