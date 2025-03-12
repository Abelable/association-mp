import { formatNumber } from '../../../../utils/util'

Component({
  properties: {
    item: Object
  },

  methods: {
    navTo() {
      wx.navigateTo({
        url: `/pages/index/subpages/course/subpages/open-info-detail/index?id=${this.properties.item.id}`
      })
    }
  }
})
