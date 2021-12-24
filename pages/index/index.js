import IndexService from './utils/indexService'

const indexService = new IndexService()
const { statusBarHeight } = getApp().globalData

Page({
  data: {
    statusBarHeight,
    navBarVisible: false,
    banner: [],
    menuList: [],
    newsList: [],
    selectedMenuIndex: 0,
    menuFixed: false,
    nomore: false
  },

  async onShow() {
    if (!this.data.menuList.length) {
      this.setBanner()
      await this.setMenuList()
      this.setMenuTop()
    }
    this.setNewsList(true)
  },
  
  selectMenu(e) {
    this.setData({ 
      selectedMenuIndex: Number(e.currentTarget.dataset.index),
      newsList: []
    }, () => {
      this.setNewsList(true)
    })
  },

  async setBanner() {
    const introItem = { img: 'https://img.ubo.vip/mp/association/intro-banner.png', redirect_url: '/pages/index/subpages/intro/index' }
    const banner = await indexService.getBanner() || []
    this.setData({ banner: [...banner, introItem] })
  },

  async setMenuList() {
    const menuList = await indexService.getCategory() || []
    this.setData({ menuList })
  },

  async setNewsList(init = false) {
    if (init) this.page = 0
    const { menuList, selectedMenuIndex, newsList, nomore } = this.data
    const list = await indexService.getNewsList(menuList[selectedMenuIndex].id, ++this.page) || []
    list.map(item => {
      item.content = this._formatContent(item.content)
      item.virtual_look = +item.virtual_look
      item.actual_look = +item.actual_look
      item.virtual_like = +item.virtual_like
      item.actual_like = +item.actual_like
    })
    this.setData({
      newsList: init ? list : [...newsList, ...list]
    })
    if (list.length < 10 && !nomore) this.setData({ nomore: true })
    if (list.length === 10 && nomore) this.setData({ nomore: false })
  },

  _formatContent(content) {
    content = content.replace(/<\/?[^>]*>/g,'') //去除HTML tag
    content = content.replace(/[ | ]*\n/g,'\n') //去除行尾空白
    content = content.replace(/\n[\s| | ]*\r/g,'\n') //去除多余空行
    content = content.replace(/&nbsp;/g, '')
    content = content.replace(/&ldquo;/g, '“')
    content = content.replace(/&rdquo;/g, '”')
    content = content.replace(/&lsquo;/g, '’')
    content = content.replace(/&rsquo;/g, '’')
    return content
  },

  setMenuTop() {
    const query = wx.createSelectorQuery()
    query.select('.menu-wrap').boundingClientRect()
    query.exec(rect => {
      this.menuTop = rect[0].top
    })
  },

  navTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({ url })
  },

  onPageScroll(e) {
    if (e.scrollTop >= 10 && !this.data.navBarVisible) this.setData({ navBarVisible: true })
    else if (e.scrollTop < 10 && this.data.navBarVisible) this.setData({ navBarVisible: false })

    if (e.scrollTop >= (this.menuTop - statusBarHeight - 44) && !this.data.menuFixed) this.setData({ menuFixed: true })
    else if (e.scrollTop < (this.menuTop - statusBarHeight - 44) && this.data.menuFixed) this.setData({ menuFixed: false })
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
