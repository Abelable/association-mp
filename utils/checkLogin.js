import BaseService from '../service/baseService'

const baseService = new BaseService()

const login = async () => {
  // const { userInfo } = await baseService.getUserProfile()
  const { code } = await baseService.wxLogin()
  const { open_id, is_bind } = await baseService.login(code)

  wx.setStorageSync('openid', open_id)
  // wx.setStorageSync('userInfo', userInfo)
  // if (is_bind == 0) {
  //   await baseService.bindUserInfo(userInfo)
  // }
}

const checkLogin = async (fn) => {
  if (!wx.getStorageSync('openid')) await login()
  fn()
}

export default checkLogin
