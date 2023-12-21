import BaseService from '../service/baseService'

const baseService = new BaseService()

const login = async () => {
  const { code } = await baseService.wxLogin()
  const { open_id } = await baseService.login(code)
  wx.setStorageSync('openid', open_id)
}

const checkLogin = async (fn) => {
  if (!wx.getStorageSync('openid')) await login()
  fn()
}

export default checkLogin
