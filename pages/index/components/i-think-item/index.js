Component({
  properties: {
    item: Object
  },

  methods: {
    navTo() {
      wx.navigateTo({
        url: `/pages/index/subpages/think/subpages/think-detail/index?id=${this.properties.item.id}`
      })
    }
  }
})
