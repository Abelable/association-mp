import OpenInfoService from "./utils/openInfoService";

const openInfoService = new OpenInfoService();

Page({
  data: {
    openInfoList: []
  },

  async onLoad() {
    this.setOpenInfoList(true);
  },

  onPullDownRefresh() {
    this.setOpenInfoList(true);
    wx.stopPullDownRefresh();
  },

  onReachBottom() {
    this.setOpenInfoList();
  },

  async setOpenInfoList(init = false) {
    if (init) this.page = 0;
    const { list = [] } =
      (await openInfoService.getOpenInfoList(++this.page)) || {};
    this.setData({
      openInfoList: init ? [...list, ...list, ...list, ...list, ...list, ...list, ...list] : [...this.data.openInfoList, ...list]
    });
  }
});
