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

  async onShow() {
    const lowList = await new LowService().getLowList(this.id) || []
    this.setData({ lowList })
  }
})
