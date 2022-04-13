Component({
  properties: {
    item: Object
  },

  methods: {
    navTo() {
      const { id, name } = this.properties.item
      wx.navigateTo({
        url: `/pages/index/subpages/low/index?id=${id}&title=${name}`
      })
    }
  }
})
