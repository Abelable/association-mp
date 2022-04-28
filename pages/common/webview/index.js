Page({
  data: {
    url: ''
  },

  onLoad(options) {
    let { url, ...rest } = options
    for (let key in rest) {
      url += `${url.indexOf('?') === -1 ? '?' : '&'}${key}=${rest[key]}`
    }
    this.setData({ url })
  }
})
