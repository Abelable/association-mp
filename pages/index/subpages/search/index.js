import { debounce } from '../../../../utils/util'

const { statusBarHeight } = getApp().globalData

Page({
  data: {
    statusBarHeight,
    menuList: ['综合', '法律汇编', '网商智库'],
    curMenuIdx: 0,
    keyword: '',
    historyKeywords: ['三只松鼠坚果大礼包', '华为手表', '资生堂', '变啦健康', '口红', '手机iphone XS MAX', '最多显示最新的十个'],
    searchStatus: false
  },

  onLoad() {},

  selectMenu(e) {
    this.setData({
      curMenuIdx: Number(e.currentTarget.dataset.index)
    })
  },

  setKeyword(e) {
    debounce(this.setData({
      keyword: e.detail.value
    }), 300)
  },

  search() {
    if (!this.data.keyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      })
      return
    }
    this.setData({
      searchStatus: true
    })
  },

  selectKeyword(e) {
    this.setData({
      keyword: e.currentTarget.dataset.keyword,
      searchStatus: true
    })
  },

  clearKeyword() {
    this.setData({
      keyword: '',
      searchStatus: false
    })
  },

  navBack() {
    wx.navigateBack()
  },

  async onPullDownRefresh() {
    wx.stopPullDownRefresh()
  }
})
