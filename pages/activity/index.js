const { statusBarHeight } = getApp().globalData;

Page({
  data: {
    statusBarHeight,
    curMenuIdx: 0,
    subMenuList: [
      "全部",
      "电商",
      "直播",
      "农产品",
      "AI",
      "制造业",
      "机械",
      "汽车"
    ],
    curSubMenuIdx: 0,
    categoryPickerModalVisible: false,
  },

  onLoad(options) {
  },

  selectMenu(e) {
    const curMenuIdx = e.currentTarget.dataset.index;
    this.setData({ curMenuIdx });
  },

  selectSubMenu(e) {
    const curSubMenuIdx = e.currentTarget.dataset.index;
    this.setData({ curSubMenuIdx });
  },

  showCategoryPickerModal() {
    this.setData({ categoryPickerModalVisible: true });
  },

  confirmCategoryPick(e) {
    const curSubMenuIdx = e.detail;
    this.setData({ curSubMenuIdx, categoryPickerModalVisible: false });
  },

  hideCategoryPickerModal() {
    this.setData({ categoryPickerModalVisible: false });
  },
})
