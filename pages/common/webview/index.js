Page({
  data: {
    url: ''
  },

  onLoad(options) {
    let { url, title, ...rest } = options
    wx.setNavigationBarTitle({ title })
    for (let key in rest) {
      url += `${url.indexOf('?') === -1 ? '?' : '&'}${key}=${rest[key]}`
    }
    this.setData({ url })
  }
})
