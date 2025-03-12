const { statusBarHeight } = getApp().globalData;

Page({
  data: {
    statusBarHeight,
    curMenuIdx: 0,
    keywords: "",
    isSearching: false,
    subMenuList: [
      "推荐",
      "培训",
      "助农",
      "党建",
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

  setKeywords(e) {
    this.setData({
      keywords: e.detail.value
    });
  },

  search() {
    const { keywords } = this.data;
    if (!keywords) {
      return;
    }
    this.setData({ isSearching: true });
  },

  cancelSearch() {
    this.setData({
      keywords: "",
      isSearching: false
    });
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
