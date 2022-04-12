const { statusBarHeight } = getApp().globalData

Page({
  data: {
    statusBarHeight,
  },

  onLoad() {},

  async onPullDownRefresh() {
    wx.stopPullDownRefresh()
  }
})
