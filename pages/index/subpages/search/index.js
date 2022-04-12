import { debounce, unique } from '../../../../utils/util'
import SearchService from './utils/searchService'

const { statusBarHeight } = getApp().globalData

Page({
  data: {
    statusBarHeight,
    menuList: ['综合', '法律汇编', '网商智库'],
    curMenuIdx: 0,
    keyword: '',
    historyKeywords: [],
    searchStatus: false,
    lowList: [{}, {}, {}],
    thinkList: [{}, {}, {}]
  },

  onLoad() {
    const historyKeywords = wx.getStorageSync('historyKeywords') || []
    historyKeywords.length && this.setData({ historyKeywords })
  },

  onUnload() {
    wx.setStorage({
      key: 'historyKeywords',
      data: this.data.historyKeywords
    })
  },

  selectMenu(e) {
    this.setData({
      curMenuIdx: Number(e.currentTarget.dataset.index)
    }, () => this.search())
  },

  setKeyword(e) {
    debounce(this.setData({
      keyword: e.detail.value
    }), 300)
  },

  async search() {
    const { keyword, curMenuIdx, historyKeywords } = this.data
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      })
      return
    }
    const type = curMenuIdx === 0 ? 0 : curMenuIdx + 1
    const { legal: lowList = [], wisdom_library: thinkList = [] } = await new SearchService().search(type, keyword) || {}
    this.setData({
      lowList,
      thinkList,
      searchStatus: true,
      historyKeywords: unique([...historyKeywords, keyword])
    })
  },

  selectKeyword(e) {
    this.setData({
      keyword: e.currentTarget.dataset.keyword
    }, () => this.search())
  },

  clearKeyword() {
    this.setData({
      keyword: '',
      searchStatus: false
    })
  },

  clearHistoryKeywords() {
    this.setData({  
      historyKeywords: []
    })
  },

  navBack() {
    wx.navigateBack()
  },

  async onPullDownRefresh() {
    wx.stopPullDownRefresh()
  }
})
