import IndexService from '../../utils/indexService'

Component({
  properties: {
    item: {
      type: Object,
      observer(info) {
        let { content, virtual_like, actual_like, virtual_look, actual_look } = info || {}
        content = content.replace(/<\/?[^>]*>/g,'') //去除HTML tag
        content = content.replace(/[ | ]*\n/g,'\n') //去除行尾空白
        content = content.replace(/\n[\s| | ]*\r/g,'\n') //去除多余空行
        content = content.replace(/ /ig,'') //去掉 
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
      wx.navigateTo({
        url: `/pages/index/subpages/news/index?id=${this.properties.item.id}`
      })
      if (wx.getStorageSync('openid')) {
        new IndexService().checkArticle(this.properties.item.id)
      }
    }
  }
})
