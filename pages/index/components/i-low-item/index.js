Component({
  properties: {
    item: {
      type: Object,
      observer(info) {
        let { content } = info || {}
        content = content.replace(/<\/?[^>]*>/g,'') //去除HTML tag
        content = content.replace(/[ | ]*\n/g,'\n') //去除行尾空白
        content = content.replace(/\n[\s| | ]*\r/g,'\n') //去除多余空行
        content = content.replace(/&nbsp;/g, '')
        content = content.replace(/&ldquo;/g, '“')
        content = content.replace(/&rdquo;/g, '”')
        content = content.replace(/&lsquo;/g, '’')
        content = content.replace(/&rsquo;/g, '’')
        this.setData({ content })
      }
    }
  },

  data: {
    content: ''
  },

  methods: {
    navTo() {
      wx.navigateTo({
        url: `/pages/index/subpages/low/subpages/low-detail/index?id=${this.properties.item.id}`
      })
    }
  }
})
