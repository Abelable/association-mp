import IndexService from './utils/indexService'

const indexService = new IndexService()
const { statusBarHeight } = getApp().globalData

Page({
  data: {
    statusBarHeight,
    navBarVisible: false,
    banner: [],
    lowCateList: [],
    thinkList: [],
    certificate: '',
    certificateModalVisible: false
  },

  async onLoad() {
    wx.showLoading({
      title: '加载中...'
    })
    await this.setBanner()
    this.getCertificate()
    await this.setCourseList()
    await this.setLowCateList()
    await this.setThinkList()
    wx.hideLoading()
  },

  async setBanner() {
    const introItem = { img: 'https://img.ubo.vip/mp/association/intro-banner.png', link_type: 0 }
    const banner = await indexService.getBanner() || []
    this.setData({ banner: [...banner, introItem] })
  },

  async setCourseList() {
    const courseList = await indexService.getCourseList(1, 3)
    this.setData({ courseList })
  },

  async setLowCateList() {
    const lowCateList = await indexService.getLowCateList(1, 10)
    this.setData({ lowCateList })
  },

  async setThinkList() {
    const { list: thinkList } = await indexService.getThinkList(1, 3)
    this.setData({ thinkList })
  },

  navTo(e) {
    const { link_type, article_id, redirect_url } = this.data.banner[e.currentTarget.dataset.index]
    switch (link_type) {
      case 0:
        wx.navigateTo({ url: '/pages/common/intro/index' })
        break;
      case 1:
        wx.navigateTo({ url: `/pages/index/subpages/course/subpages/course-detail/index?id=${article_id}` })
        break;
      case 2:
        wx.navigateTo({ url: `/pages/index/subpages/low/subpages/low-detail/index?id=${article_id}` })
        break;
      case 3:
        wx.navigateTo({ url: `/pages/index/subpages/think/subpages/think-detail/index?id=${article_id}` })
        break;
      case 4:
        wx.navigateTo({ url: `/pages/common/webview/index?url=${redirect_url.replace("?", "&")}` })
        break;
    }
  },

  checkMoreCourse() {
    wx.navigateTo({
      url: '/pages/index/subpages/course/index'
    })
  },

  checkMoreLow() {
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
    await this.setCourseList()
    await this.setLowCateList()
    await this.setThinkList()
    wx.hideLoading()
    wx.stopPullDownRefresh()
  },

  async getCertificate() {
    const { list = [] } = await indexService.getApplyList(1, 100) || {}
    list.map(item => {
      if (item.certificate_status == 1) {
        this.setData({
          certificate: item.url
        })
      }
    })
  },

  checkCertificate() {
    this.setData({
      certificateModalVisible: true
    })
  },

  async saveImageToPhotosAlbum() {
    const { path: filePath } = await indexService.getImageInfo(this.data.certificate)
    wx.saveImageToPhotosAlbum({
      filePath,
      success: () => {
        this.setData({
          certificateModalVisible: false
        })
        wx.showToast({ title: '成功保存', icon:"success" })
      }
    })
  },
  
  onShareAppMessage() {}
})
