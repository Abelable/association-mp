import IndexService from '../../utils/indexService'

Page({
  data: {
    lowCateList: []
  },

  onLoad() {
    this.setLowCateList(true)
  },
  
  onPullDownRefresh() {
    this.setLowCateList(true)
    wx.stopPullDownRefresh() 
  },

  onReachBottom() {
    this.setLowCateList()
  },

  async setLowCateList(init= false) {
    if (init) this.page = 0
    const list = await new IndexService().getLowCateList(++this.page) || []
    this.setData({
      lowCateList: init ? list : [...this.data.lowCateList, ...list]
    })
  }
})
