import LowService from './utils/lowService'

Page({
  data: {
    lowList: [],
  },

  async onLoad(options) {
    const { id, title } = options
    wx.setNavigationBarTitle({ title })
    this.id = id
    this.title = title
  },

  onShow() {
    this.setLowList(true)
  },

  onPullDownRefresh() {
    this.setLowList(true)
    wx.stopPullDownRefresh() 
  },

  onReachBottom() {
    this.setLowList()
  },

  async setLowList(init = false) {
    if (init) this.page = 0
    const list = await new LowService().getLowList(this.id, ++this.page) || []
    this.setData({ 
      lowList: init ? list : [...this.data.lowList, ...list]
    })
  }
})
