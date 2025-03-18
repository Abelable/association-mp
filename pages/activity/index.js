import ActivityService from "./utils/activityService";

const activityService = new ActivityService();
const { statusBarHeight } = getApp().globalData;

Page({
  data: {
    statusBarHeight,
    curMenuIdx: 0,
    keywords: "",
    subMenuList: [],
    curSubMenuIdx: 0,
    categoryPickerModalVisible: false,
    activityList: [],
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

  async onLoad() {
    await this.setSubMenuList();
    this.setActivityList(true);
  },

  async setSubMenuList() {
    const list = await activityService.getActivityCategoryList();
    this.setData({
      subMenuList: [{ id: 0, name: "推荐" }, ...list]
    });
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
    this.setActivityList(true);
  },

  cancelSearch() {
    this.setData({
      keywords: ""
    });
    this.setActivityList(true);
  },

  selectSubMenu(e) {
    const curSubMenuIdx = e.currentTarget.dataset.index;
    this.setData({ curSubMenuIdx });
    this.setActivityList(true);
  },

  async setActivityList(init = false) {
    if (init) {
      this.activityPage = 0;
    }
    const { subMenuList, curSubMenuIdx, activityList, keywords } = this.data;
    const { list = [] } =
      (await activityService.getActivityList({
        category_id: subMenuList[curSubMenuIdx].id,
        title: keywords,
        page: ++this.activityPage
      })) || {};
    this.setData({ activityList: init ? list : [...activityList, ...list] });
  },

  async onPullDownRefresh() {
    if (this.data.curMenuIdx === 0) {
      await this.setSubMenuList();
      this.setActivityList(true);
    } else {
    }
    wx.stopPullDownRefresh();
  },

  onReachBottom() {
    if (this.data.curMenuIdx === 0) {
      this.setActivityList();
    } else {
    }
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
