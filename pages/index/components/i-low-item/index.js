Component({
  properties: {
    item: Object
  },

  methods: {
    navTo() {
      wx.navigateTo({
        url: `/pages/index/subpages/low/subpages/low-detail/index?id=${this.properties.item.id}`
      })
    }
  }
})
