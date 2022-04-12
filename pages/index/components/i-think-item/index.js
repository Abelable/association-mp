Component({
  properties: {
    item: Object
  },

  methods: {
    navTo() {
      wx.navigateTo({
        url: `/pages/index/subpages/news/index?id=${this.properties.item.id}`
      })
    }
  }
})
