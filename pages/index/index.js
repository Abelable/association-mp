import IndexService from './utils/indexService'

const indexService = new IndexService()
const { statusBarHeight } = getApp().globalData

Page({
  data: {
    statusBarHeight,
    navBarVisible: false,
    banner: [],
    lowCateList: [],
    thinkList: []
  },

  async onLoad() {
    wx.showLoading({
      title: '加载中...'
    })
    await this.setBanner()
    await this.setLowCateList()
    await this.setThinkList()
    wx.hideLoading()
  },

  async setBanner() {
    const introItem = { img: 'https://img.ubo.vip/mp/association/intro-banner.png', redirect_url: '/pages/common/intro/index' }
    const banner = await indexService.getBanner() || []
    this.setData({ banner: [...banner, introItem] })
  },

  async setLowCateList() {
    const lowCateList = await indexService.getLowCateList(1, 10)
    this.setData({ lowCateList })
  },

  async setThinkList() {
    const { list: thinkList } = await indexService.getThinkList(1)
    this.setData({ thinkList })
  },

  navTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({ url })
  },

  checkMore() {
    wx.navigateTo({
      url: '/pages/index/subpages/low-cate/index'
    })
  },

  onPageScroll(e) {
    if (e.scrollTop >= 10 && !this.data.navBarVisible) this.setData({ navBarVisible: true })
    else if (e.scrollTop < 10 && this.data.navBarVisible) this.setData({ navBarVisible: false })
  },

  async onPullDownRefresh() {
    wx.showLoading({
      title: '加载中...'
    })
    await this.setBanner()
    await this.setLowCateList()
    await this.setThinkList()
    wx.hideLoading()
    wx.stopPullDownRefresh()
  },
  
  onShareAppMessage() {}
})
