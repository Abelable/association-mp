import IndexService from './utils/indexService'

const indexService = new IndexService()
const { statusBarHeight } = getApp().globalData

Page({
  data: {
    statusBarHeight,
    navBarVisible: false,
    banner: [],
    courseList: [],
    lowList: [],
    thinkList: []
  },

  onLoad() {
    this.setBanner()
    this.setCourseList()
    this.setLowList()
    this.setThinkList()
  },

  async setBanner() {
    const introItem = { img: 'https://img.ubo.vip/mp/association/intro-banner.png', redirect_url: '/pages/common/intro/index' }
    const banner = await indexService.getBanner() || []
    this.setData({ banner: [...banner, introItem] })
  },

  async setCourseList() {
    const courseList = await indexService.getCourseList(1, 3)
    this.setData({ courseList })
  },

  async setLowList() {
    const lowList = await indexService.getLowList()
    this.setData({ lowList })
  },

  async setThinkList() {
    const thinkList = await indexService.getThinkList(1)
    this.setData({ thinkList })
  },

  navTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({ url })
  },

  onPageScroll(e) {
    if (e.scrollTop >= 10 && !this.data.navBarVisible) this.setData({ navBarVisible: true })
    else if (e.scrollTop < 10 && this.data.navBarVisible) this.setData({ navBarVisible: false })
  },

  async onPullDownRefresh() {
    this.setBanner()
    this.setCourseList()
    this.setLowList()
    this.setThinkList()
    wx.stopPullDownRefresh()
  },
  
  onShareAppMessage() {}
})
