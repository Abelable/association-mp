import LowService from './utils/lowService'

Page({
  data: {
    lowList: [],
  },

  async onLoad(options) {
    const { id, title } = options
    wx.setNavigationBarTitle({ title })
    const lowList = await new LowService().getLowList(id, title) || []
    this.setData({ lowList })
  }
})
