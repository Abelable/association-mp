Component({
  properties: {
    item: {
      type: Object,
      bserver(info) {
        const { virtual_like, actual_like, virtual_look, actual_look } = info || {}
        this.setData({
          praiseCount: Number(virtual_like) + Number(actual_like),
          viewsCount: Number(virtual_look) + Number(actual_look)
        })
      }
    }
  },

  data: {
    praiseCount: 0,
    viewsCount: 0
  },

  methods: {
    navToNews() {
      wx.navigateTo({
        url: '/pages/index/subpages/news/index'
      })
    }
  }
})
