import IndexService from '../../utils/indexService'

Page({
  data: {
    thinkList: []
  },

  onLoad() {
    this.setThinkList(true)
  },
  
  onPullDownRefresh() {
    this.setThinkList(true)
    wx.stopPullDownRefresh() 
  },

  onReachBottom() {
    this.setThinkList()
  },

  async setThinkList(init= false) {
    if (init) this.page = 0
    const { list } = await new IndexService().getThinkList(++this.page) || []
    this.setData({
      thinkList: init ? list : [...this.data.thinkList, ...list]
    })
  }
})
