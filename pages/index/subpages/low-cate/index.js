import IndexService from "../../utils/indexService";

Page({
  data: {
    menuList: [
      "省内政策",
      "省外政策",
      "国家政策",
      "海外政策",
      "省内政策",
      "省外政策",
      "国家政策",
      "海外政策",
    ],
    subMenuList: [
      "广告监督",
      "跨境电商",
      "快递外卖",
      "综合规定",
      "网络安全",
      "广告监督",
      "跨境电商",
      "快递外卖",
      "综合规定",
      "网络安全",
      "广告监督",
      "跨境电商",
      "快递外卖",
      "综合规定",
      "网络安全",
      "广告监督",
      "跨境电商",
      "快递外卖",
      "综合规定",
      "网络安全",
    ],
    curMenuIdx: 0,
    curSubMenuIdx: 0,
    lowCateList: [
      1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 100,
    ],
  },

  onLoad() {
    this.setLowCateList(true);
  },

  selectMenu(e) {
    const curMenuIdx = Number(e.currentTarget.dataset.index);
    this.setData({ curMenuIdx });
  },

  selectSubMenu(e) {
    const curSubMenuIdx = Number(e.currentTarget.dataset.index);
    this.setData({ curSubMenuIdx });
  },

  onPullDownRefresh() {
    this.setLowCateList(true);
    wx.stopPullDownRefresh();
  },

  onReachBottom() {
    this.setLowCateList();
  },

  async setLowCateList(init = false) {
    if (init) this.page = 0;
    const list = (await new IndexService().getLowCateList(++this.page)) || [];
    this.setData({
      lowCateList: init ? list : [...this.data.lowCateList, ...list],
    });
  },
});
