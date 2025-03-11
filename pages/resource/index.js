const { statusBarHeight } = getApp().globalData;

Page({
  data: {
    statusBarHeight,
    curMenuIdx: 0,
    subMenuList: ["全部", "电商", "直播", "农产品", "AI", "制造业", "机械", "汽车"],
    curSubMenuIdx: 0
  },

  onLoad(options) {},

  selectMenu(e) {
    const curMenuIdx = e.currentTarget.dataset.index;
    this.setData({ curMenuIdx });
  },

  selectSubMenu(e) {
    const curSubMenuIdx = e.currentTarget.dataset.index;
    this.setData({ curSubMenuIdx });
  },
});
