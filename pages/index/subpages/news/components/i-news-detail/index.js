Component({
  properties: {
    item: {
      type: Object,
      observer(info) {
        const content = info.content.replace(/<p/g, '<p style="margin-top: 8px;"')
        this.setData({ content })
      }
    }
  },

  data: {
    fold: true,
    content: ''
  },

  methods: {
    unfold() {
      this.setData({
        fold: false
      })
    }
  }
})
