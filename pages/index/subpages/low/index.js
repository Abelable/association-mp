import IndexService from '../../utils/indexService'

Page({
  data: {
    lowList: [],
  },

  async onLoad(options) {
    const { id, title } = options
    wx.setNavigationBarTitle({ title })
    const lowList = await new IndexService().getLowList(id, title) || []
    this.setData({ lowList })
  }
})
