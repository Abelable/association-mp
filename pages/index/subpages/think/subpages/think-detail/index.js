import checkLogin from '../../../../../../utils/checkLogin'
import LowService from '../../utils/lowService'

const lowService = new LowService()

Page({
  data: {
    info: null,
    posterInfo: null,
    sharePopupVisible: false,
    posterModalVisible: false
  },

  onLoad(options) {
    const { id, scene } = options
    const decodedScene = scene ? decodeURIComponent(scene) : ''
    this.id = id || decodedScene.split('-')[0]
    this.setInfo()
    wx.showLoading({ title: '加载中...' })
  },

  async setInfo() {
    const info = await lowService.getLowDetail(this.id)
    this.setData({ info })
  },

  load() {
    wx.hideLoading()
  },

  async togglePraise() {
    checkLogin(() => {
      const { id, is_like } = this.data.info
      const status = is_like == 1 ? 0 : 1
      this.setData({
        ['info.is_like']: status
      })
      lowService.toggleLowPraiseStatus(id, status)
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
      const { path } = await lowService.getImageInfo('https://img.ubo.vip/mp/association/bg.png')
      posterBgUrl = path
      getApp().globalData.posterBgUrl = path
    }
    if (!posterAvatarUrl) {
      const { path } = await lowService.getImageInfo(wx.getStorageSync('userInfo').avatarUrl)
      posterAvatarUrl = path
      getApp().globalData.posterAvatarUrl = path
    }

    const { id, image, title } = this.data.info
    const { path: cover } = await lowService.getImageInfo(image)
    const { app_code } = await lowService.share({ legal_id: id })
    const { path: qrCode } = await lowService.getImageInfo(app_code)

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
    const path = `/pages/index/subpages/low/subpages/low-detail/index?id=${this.id}`
    return { path, title, imageUrl }
  }
})
