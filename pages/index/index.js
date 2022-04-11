import IndexService from './utils/indexService'

const indexService = new IndexService()
const { statusBarHeight } = getApp().globalData

Page({
  data: {
    statusBarHeight,
    navBarVisible: false,
    banner: [],
    courseList: [{}, {}, {}],
    selectedMenuIndex: 0,
    nomore: false
  },

  onShow() {
    this.setBanner()
  },

  async setBanner() {
    const introItem = { img: 'https://img.ubo.vip/mp/association/intro-banner.png', redirect_url: '/pages/index/subpages/intro/index' }
    const banner = await indexService.getBanner() || []
    this.setData({ banner: [...banner, introItem] })
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
    await this.setMenuList()
    this.setNewsList(true)
    wx.stopPullDownRefresh()
  },

  onReachBottom() {
    this.setNewsList()
  },
  
  onShareAppMessage() {}
})
