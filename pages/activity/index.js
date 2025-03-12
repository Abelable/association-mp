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
    activityList: [
      {
        cover:
          "https://img-oss.zjseca.com/government/20231013/1697188126318.png",
        title: "“之江数据安全治理”系列活动——“助力数据跨境，护航企业出海”交流会",
        status: 1,
        limit: 100
      },
      {
        cover:
          "https://img-oss.zjseca.com/government/20231013/1697188126318.png",
        title: "美妆行业“绿色直播间”助力品牌发展论坛",
        status: 2,
        limit: 100
      }
    ],
    albumList: [
      {
        title: "美妆行业“绿色直播间”助力品牌发展论坛",
        imageList: [
          "https://img-oss.zjseca.com/government/20231013/1697188126318.png",
          "https://img-oss.zjseca.com/government/20231013/1697188126318.png",
          "https://img-oss.zjseca.com/government/20231013/1697188126318.png",
          "https://img-oss.zjseca.com/government/20231013/1697188126318.png"
        ]
      },
      {
        title: "美妆行业“绿色直播间”助力品牌发展论坛",
        imageList: [
          "https://img-oss.zjseca.com/government/20231013/1697188126318.png",
          "https://img-oss.zjseca.com/government/20231013/1697188126318.png",
          "https://img-oss.zjseca.com/government/20231013/1697188126318.png",
          "https://img-oss.zjseca.com/government/20231013/1697188126318.png"
        ]
      }
    ]
  },

  onLoad(options) {},

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

  checkAlbum() {
    wx.navigateTo({
      url: "./subpages/album-detail/index"
    });
  }
});
