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
    albumList: [],
    minDate: new Date(2010, 0, 1).getTime(),
    maxDate: new Date().getTime(),
    startTime: "",
    endTime: "",
    calendarPopupVisibel: false
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
    if (curMenuIdx === 1 && !this.data.albumList.length) {
      this.setAlbumList(true);
    }
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

  showCalendarPopup() {
    this.setData({
      calendarPopupVisibel: true
    });
  },

  hideCalendarPopup() {
    this.setData({
      calendarPopupVisibel: false
    });
  },

  cancelCalendarPick() {
    this.setData({
      startTime: "",
      endTime: ""
    });
    this.setAlbumList(true);
  },

  setCalendar(e) {
    const [start, end] = e.detail;
    const startTime = `${start.getTime()}`.slice(0, -3);
    const endTime = `${end.getTime() + 86400000}`.slice(0, -3);
    this.setData({
      startTime,
      endTime,
      calendarPopupVisibel: false
    });
    this.setAlbumList(true);
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

  async setAlbumList(init = false) {
    if (init) {
      this.albumPage = 0;
    }
    const { albumList, startTime, endTime } = this.data;
    const { list = [] } =
      (await activityService.getAlbumList({
        start_time: startTime,
        end_time: endTime,
        page: ++this.albumPage
      })) || {};
    this.setData({ albumList: init ? list : [...albumList, ...list] });
  },

  async onPullDownRefresh() {
    if (this.data.curMenuIdx === 0) {
      await this.setSubMenuList();
      this.setActivityList(true);
    } else {
      this.setAlbumList(true);
    }
    wx.stopPullDownRefresh();
  },

  onReachBottom() {
    if (this.data.curMenuIdx === 0) {
      this.setActivityList();
    } else {
      this.setAlbumList();
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
  }
});
