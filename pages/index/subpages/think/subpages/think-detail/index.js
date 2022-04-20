import checkLogin from '../../../../../../utils/checkLogin'
import ThinkService from './utils/thinkService'

const thinkService = new ThinkService()

Page({
  data: {
    info: null,
    likeStatus: false,
    posterInfo: null,
    sharePopupVisible: false,
    posterModalVisible: false
  },

  onLoad(options) {
    const { id, scene } = options
    const decodedScene = scene ? decodeURIComponent(scene) : ''
    this.id = id || decodedScene.split('-')[0]
    this.setInfo()
    this.setLikeStatus()
    wx.showLoading({ title: '加载中...' })
  },

  async setInfo() {
    const info = await thinkService.getThinkDetail(this.id)
    this.setData({ info })
  },

  load() {
    wx.hideLoading()
  },

  setLikeStatus() {
    const list = wx.getStorageSync('thinkArticleLikeList') || [];
    if (list.length) {
      const statusItem = list.find(item => item.id === this.id)
      if (statusItem && statusItem.status) {
        this.setData({
          likeStatus: true
        })
      }
    }
  },

  async togglePraise() {
    checkLogin(() => {
      const { likeStatus } = this.data
      this.setData({
        likeStatus: !likeStatus
      })
      const list = wx.getStorageSync('thinkArticleLikeList') || [];
      const curItemIndex = list.findIndex(item => item.id === this.id)
      if (curItemIndex !== -1) {
        list[curItemIndex].status = !likeStatus
      } else {
        list.push( { id: this.id, status: !likeStatus })
      }
      wx.setStorage({
        key: 'thinkArticleLikeList',
        data: list
      });
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
      const { path } = await thinkService.getImageInfo('https://img.ubo.vip/mp/association/bg.png')
      posterBgUrl = path
      getApp().globalData.posterBgUrl = path
    }
    if (!posterAvatarUrl) {
      const { path } = await thinkService.getImageInfo(wx.getStorageSync('userInfo').avatarUrl)
      posterAvatarUrl = path
      getApp().globalData.posterAvatarUrl = path
    }

    const { id, image, title } = this.data.info
    const { path: cover } = await thinkService.getImageInfo(image)
    const { app_code } = await thinkService.share({ type: 3, legal_id: id })
    const { path: qrCode } = await thinkService.getImageInfo(app_code)

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

  onShareAppMessage() {
    const { image, title } = this.data.info
    const imageUrl = `${image}?x-oss-process=image/resize,m_fill,h_180,w_180`
    const path = `/pages/index/subpages/think/subpages/think-detail/index?id=${this.id}`
    return { path, title, imageUrl }
  }
})