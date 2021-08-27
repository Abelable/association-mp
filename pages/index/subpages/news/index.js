import checkLogin from '../../../../utils/checkLogin'
import NewsService from './utils/newsService'

const newsService = new NewsService()

Page({
  data: {
    isOldUser: false,
    newsList: [],
    curNewsIdx: 0,
    posterInfo: null,
    sharePopupVisible: false,
    posterModalVisible: false
  },

  onLoad(options) {
    const { id, scene } = options
    const decodedScene = scene ? decodeURIComponent(scene) : ''
    this.newsId = id || decodedScene.split('-')[0]
    this.setNewsList()
    this.setData({
      isOldUser: wx.getStorageSync('isOldUser')
    })
  },

  onSlide(e) {
    const curNewsIdx = Number(e.detail.current)
    const { newsList } = this.data

    this.setCurNewsIdxTimeout && clearTimeout(this.setCurNewsIdxTimeout)
    this.setCurNewsIdxTimeout = setTimeout(async () => {
      this.setData({ curNewsIdx })
    }, 200)
    
    if (curNewsIdx > newsList.length - 3) this.setNewsList(newsList[newsList.length - 1].id)
  }, 

  async setNewsList(lastId = '') {
    const list = await newsService.getNewsList(this.newsId, lastId)
    this.setData({
      newsList: [...this.data.newsList, ...list]
    })
  },

  async togglePraise() {
    checkLogin(() => {
      const { newsList, curNewsIdx } = this.data
      const { id, is_like } = newsList[curNewsIdx]
      const status = is_like == 1 ? 0 : 1
      this.setData({
        [`newsList[${curNewsIdx}].is_like`]: status
      })
      newsService.togglePraiseStatus(id, status)
    })
  },

  showSharePopup() {
    checkLogin(() => {
      this.setData({
        sharePopupVisible: true
      })
      this.setPosterInfo()
    })
  },

  async setPosterInfo() {
    let { posterBgUrl, posterAvatarUrl } = getApp().globalData
    if (!posterBgUrl) {
      const { path } = await newsService.getImageInfo('https://img.ubo.vip/mp/association/bg.png')
      posterBgUrl = path
      getApp().globalData.posterBgUrl = path
    }
    if (!posterAvatarUrl) {
      const { path } = await newsService.getImageInfo(wx.getStorageSync('userInfo').avatarUrl)
      posterAvatarUrl = path
      getApp().globalData.posterAvatarUrl = path
    }

    const { newsList, curNewsIdx } = this.data
    const { id, img, title } = newsList[curNewsIdx]
    const { path: cover } = await newsService.getImageInfo(img)
    const { app_code } = await newsService.share(id)
    const { path: qrCode } = await newsService.getImageInfo(app_code)

    const posterInfo = {
      bgUrl: posterBgUrl, 
      avatarUrl: posterAvatarUrl, 
      nickName: wx.getStorageSync('userInfo').nickName, 
      cover, 
      title, 
      qrCode
    }
    this.setData({ posterInfo })
  },

  hideSharePopup() {
    this.setData({
      sharePopupVisible: false
    })
  },

  showPosterModal() {
    if (!this.data.posterInfo) {
      wx.showLoading({ title: '海报生成中... ' })
      setTimeout(() => {
        this.showPosterModal()
      }, 1000)
    } else {
      wx.hideLoading()
      this.setData({
        sharePopupVisible: false,
        posterModalVisible: true
      })
    }
  },

  hidePosterModal() {
    this.setData({
      posterModalVisible: false
    })
  },

  hideTipsCover() {
    wx.setStorageSync('isOldUser', true);
    this.setData({
      isOldUser: true
    })
  }
})
