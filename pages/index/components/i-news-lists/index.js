import IndexService from '../../utils/indexService'

Component({
  properties: {
    item: {
      type: Object,
      observer(info) {
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
        url: `/pages/index/subpages/news/index?id=${this.properties.item.id}`
      })
      if (wx.getStorageSync('openid')) {
        new IndexService().checkArticle(this.properties.item.id)
      }
    }
  }
})
