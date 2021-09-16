import IndexService from '../../utils/indexService'

Component({
  properties: {
    categoryId: '',
    item: {
      type: Object,
      observer(info) {
        let { content, virtual_like, actual_like, virtual_look, actual_look } = info || {}
        content = content.replace(/<\/?[^>]*>/g,'') //去除HTML tag
        content = content.replace(/[ | ]*\n/g,'\n') //去除行尾空白
        content = content.replace(/\n[\s| | ]*\r/g,'\n') //去除多余空行
        content = content.replace(/&nbsp;/g, '')
        content = content.replace(/&ldquo;/g, '“')
        content = content.replace(/&rdquo;/g, '”')
        content = content.replace(/&lsquo;/g, '’')
        content = content.replace(/&rsquo;/g, '’')
        this.setData({
          content,
          praiseCount: Number(virtual_like) + Number(actual_like),
          viewsCount: Number(virtual_look) + Number(actual_look)
        })
      }
    }
  },

  data: {
    content: '',
    praiseCount: 0,
    viewsCount: 0
  },

  methods: {
    navToNews() {
      const { item, categoryId } = this.properties
      wx.navigateTo({
        url: `/pages/index/subpages/news/index?id=${item.id}&categoryId=${categoryId}`
      })
      if (wx.getStorageSync('openid')) {
        new IndexService().checkArticle(categoryId, item.id)
      }
    }
  }
})
