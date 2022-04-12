import { debounce } from '../../../../utils/util'

const { statusBarHeight } = getApp().globalData

Page({
  data: {
    statusBarHeight,
    keyword: ''
  },

  onLoad() {},

  setKeyword(e) {
    debounce(this.setData({
      keyword: e.detail.value
    }), 300)
  },

  navBack() {
    wx.navigateBack()
  },

  async onPullDownRefresh() {
    wx.stopPullDownRefresh()
  }
})
