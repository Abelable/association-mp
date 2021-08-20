import { env } from '../../config'
import api from './api'

class Base {
  constructor() {
    switch (env) {
      case 'pro':
        this.baseUrl = 'https://mms.youboi.com'
        break
      case 'beta':
        this.baseUrl = 'https://beta.mms.youboi.com'
        break
      case 'dev':
        this.baseUrl = 'https://gb.ubo.vip'
        break
    }
  }

  async get({ url, data, success, fail, loadingTitle = '' }) {
    loadingTitle && wx.showLoading({ title: loadingTitle })
    const [res, err] = await this._request({ url, data }) || []
    loadingTitle && wx.hideLoading()
    return this.processRes({ res, err, success, fail })
  }

  async post({ url, data, success, fail, loadingTitle = '' }) {
    loadingTitle && wx.showLoading({ title: loadingTitle })
    const [res, err] = await this._request({ url, data, method: 'POST' }) || []
    loadingTitle && wx.hideLoading()
    return this.processRes({ res, err, success, fail })
  }

  async _request({ url, data, method = 'GET' }) {
    return api.request({ url, method, data,
      header: { 
        "content-type": method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        "open-id": wx.getStorageSync('openid') || '',
      }
    }).then(res => [res, null]).catch(err => [null, err])
  }

  async uploadFile({ url, filePath, success, fail, loadingTitle = '加载中...' }) {
    loadingTitle && wx.showLoading({ title: loadingTitle })
    const [res, err] = await api.uploadFile({ url, filePath,
      name: 'file',
      header: { 
        "Content-Type": 'multipart/form-data',
        "open-id": wx.getStorageSync('openid') || ''
      }
    }).then(res => [res, null]).catch(err => [null, err])
    loadingTitle && wx.hideLoading()
    return this.processRes({ res, err, success, fail })
  }

  processRes({ res, err, success, fail }) {
    if (err) {
      if (typeof(err) === 'object' && err.errMsg) {
        if (err.errMsg.indexOf('request:fail') !== -1) err = '网络不稳定'
        else err = err.errMsg
      } else err = String(err)
      wx.showToast({ title: err, icon: 'none' })
      return
    }
    if ([200, 201, 204].includes(res.statusCode)) {
      if (res.data.code == 200) {
        if (success) success(res)
        else return res.data.data
      } else {
        fail ? fail(res) : wx.showToast({ title: res.data.message, icon: 'none' })
      }
    } else wx.showToast({ title: res.errMsg, icon: 'none' })
  }

  getSetting() {
    return api.getSetting()
  }

  chooseImage(count) {
    return api.chooseImage({ count })
  }

  chooseVideo() {
    return api.chooseVideo({ 
      sourceType:['album', 'camera'],
      compressed: false 
    })
  }

  async getLocation() {
    return api.getLocation()
  }  
  
  getUserInfo() {
    return api.getUserInfo()
  }

  getUserProfile() {
    return api.getUserProfile({ desc: '用于完善会员资料', lang: 'zh_CN' })
  }

  getImageInfo(src) {
    return api.getImageInfo({ src })
  }

  wxLogin() {
    return api.login()
  }
  
  requestSubscribeMessage(tmplId) {
    return api.requestSubscribeMessage({ tmplIds: [tmplId]})
  }
}

export default Base
