import ActivityService from "./utils/activityService";

const activityService = new ActivityService();
const { statusBarHeight } = getApp().globalData;

Page({
  data: {
    statusBarHeight,
    vantComponentVisible: false,
    curMenuIdx: 0,
    keywords: "",
    subMenuList: [],
    curSubMenuIdx: 0,
    categoryPickerModalVisible: false,
    activityList: [],
    activityListFinished: false,
    albumList: [],
    albumListFinished: false,
    cityList: [
      "杭州",
      "宁波",
      "温州",
      "绍兴",
      "湖州",
      "嘉兴",
      "金华",
      "衢州",
      "台州",
      "丽水",
      "舟山"
    ],
    curCityIdx: -1,
    cityPickPopupVisible: false,
    minDate: new Date(2010, 0, 1).getTime(),
    maxDate: new Date().getTime(),
    startTime: "",
    endTime: "",
    calendarPopupVisibel: false
  },

  async onLoad() {
    await this.setSubMenuList();
    await this.setActivityList(true);
  },

  async setSubMenuList() {
    const list = await activityService.getActivityCategoryList();
    this.setData({
      subMenuList: [{ id: 0, name: "推荐" }, ...list]
    });
  },

  async selectMenu(e) {
    const curMenuIdx = e.currentTarget.dataset.index;
    this.setData({ curMenuIdx });
    if (curMenuIdx === 1 && !this.data.vantComponentVisible) {
      wx.showLoading({ title: '加载中...' });
      this.setData({ vantComponentVisible: true });
      await this.setAlbumList(true);
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

  showCityPickPopup() {
    this.setData({
      cityPickPopupVisible: true
    });
  },

  hideCityPickPopup() {
    this.setData({
      cityPickPopupVisible: false
    });
  },

  setCity(e) {
    const curCityIdx = e.detail.index;
    this.setData({ curCityIdx, cityPickPopupVisible: false });
    this.setAlbumList(true);
  },

  cancelCityPick() {
    this.setData({ curCityIdx: -1 });
    this.setAlbumList(true);
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
      this.setData({ activityListFinished: false });
    }
    const { subMenuList, curSubMenuIdx, activityList, keywords } = this.data;
    const { list = [] } =
      (await activityService.getActivityList({
        category_id: subMenuList[curSubMenuIdx].id,
        title: keywords,
        page: ++this.activityPage
      })) || {};
    this.setData({ activityList: init ? list : [...activityList, ...list] });
    if (!list.length) {
      this.setData({ activityListFinished: true });
    }
  },

  async setAlbumList(init = false) {
    if (init) {
      this.albumPage = 0;
      this.setData({ albumListFinished: false });
    }
    const { albumList, curCityIdx, startTime, endTime } = this.data;
    const { list = [] } =
      (await activityService.getAlbumList({
        city_id: curCityIdx === -1 ? "" : curCityIdx + 1,
        start_time: startTime,
        end_time: endTime,
        page: ++this.albumPage
      })) || {};
    this.setData({ albumList: init ? list : [...albumList, ...list] });
    if (list.length < 10) {
      this.setData({ albumListFinished: true });
    }
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
    this.setActivityList(true);
  },

  hideCategoryPickerModal() {
    this.setData({ categoryPickerModalVisible: false });
  }
});
