Page({
  data: {
    banner: ['https://img.ubo.vip/mp/association/intro-banner.png'], 
  },

  onLoad(options) {
  },

  navToConsulting() {
    wx.navigateTo({
      url: '../consulting/index'
    });
  }
})
