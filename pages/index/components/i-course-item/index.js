import { formatNumber } from '../../../../utils/util'

Component({
  properties: {
    item: {
      type: Object,
      observer(info) {
        const { duration } = info || {}
        const minute = formatNumber(Math.floor(duration / 60))
        const second = formatNumber(duration % 60)
        this.setData({ 
          duration: `${minute}:${second}`
        })
      }
    }
  },

  data: {
    duration: '',
    courseVisible: true
  },

  lifetimes: {
    attached() {
      const { envVersion } = wx.getAccountInfoSync().miniProgram || {};
      if (envVersion === "trial") {
        this.setData({ courseVisible: false });
      }
    },
  },

  methods: {
    navTo() {
      wx.navigateTo({
        url: `/pages/index/subpages/course/subpages/course-detail/index?id=${this.properties.item.id}`
      })
    }
  }
})
