import promisify from './promisify'

export default {
  getSetting: promisify(wx.getSetting),
  request: promisify(wx.request),
  uploadFile: promisify(wx.uploadFile),
  chooseImage: promisify(wx.chooseImage),
  chooseVideo: promisify(wx.chooseVideo),
  getUserInfo: promisify(wx.getUserInfo),
  getUserProfile: promisify(wx.getUserProfile),
  getImageInfo: promisify(wx.getImageInfo),
  requestSubscribeMessage: promisify(wx.requestSubscribeMessage),
  login: promisify(wx.login)
}