import RegisterService from '../../utils/registerService'
import { formatTime } from '../../../../utils/util'

const registerService = new RegisterService()
const { statusBarHeight } = getApp().globalData

Page({
  data: {
    statusBarHeight,
    list: []
  },

  navBack() {
    wx.navigateBack()
  },

  onLoad() {
    this.setList(true)
  },

  async setList(init = false) {
    if (init) this.page = 0
    const { list = [] } = await registerService.getApplyList(++this.page) || {}
    list.map(item => {
      item.time = formatTime(item.created_at)
    })
    this.setData({ 
      list: init ? list : [...this.data.list, ...list]
    })
  },

  check(e) {
    wx.navigateTo({ url: `../record-detail/index?id=${e.currentTarget.dataset.id}` })
  },

  onPullDownRefresh() {
    this.setList(true)
    wx.stopPullDownRefresh()
  },

  onReachBottom() {
    this.setList()
  }
})
