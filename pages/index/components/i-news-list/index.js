import IndexService from '../../utils/indexService'

Component({
  properties: {
    list: Array,
    categoryId: String
  },

  data: {
    content: '',
    praiseCount: 0,
    viewsCount: 0
  },

  methods: {
    navToNews(e) {
      const { id } = e.currentTarget.dataset
      const { categoryId } = this.properties
      wx.navigateTo({
        url: `/pages/index/subpages/news/index?id=${id}&categoryId=${categoryId}`
      })
      if (wx.getStorageSync('openid')) {
        new IndexService().checkArticle(categoryId, id)
      }
    }
  }
})
