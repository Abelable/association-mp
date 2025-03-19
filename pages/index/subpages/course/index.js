import IndexService from "../../utils/indexService";

const indexService = new IndexService();

Page({
  data: {
    subMenuList: [],
    curSubMenuIdx: 0,
    keywords: "",
    categoryPickerModalVisible: false,
    courseList: []
  },

  async onLoad() {
    await this.setSubMenuList();
    this.setCourseList(true);
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
    this.setCourseList(true);
  },

  cancelSearch() {
    this.setData({
      keywords: ""
    });
    this.setCourseList(true);
  },

  async setSubMenuList() {
    const list = await indexService.getCourseCategoryList();
    this.setData({
      subMenuList: [{ id: 0, name: "推荐" }, ...list]
    });
  },

  selectSubMenu(e) {
    const curSubMenuIdx = e.currentTarget.dataset.index;
    this.setData({ curSubMenuIdx });
    this.setCourseList(true);
  },

  showCategoryPickerModal() {
    this.setData({ categoryPickerModalVisible: true });
  },

  confirmCategoryPick(e) {
    const curSubMenuIdx = e.detail;
    this.setData({ curSubMenuIdx, categoryPickerModalVisible: false });
    this.setCourseList(true);
  },

  hideCategoryPickerModal() {
    this.setData({ categoryPickerModalVisible: false });
  },

  onPullDownRefresh() {
    this.setCourseList(true);
    wx.stopPullDownRefresh();
  },

  onReachBottom() {
    this.setCourseList();
  },

  async setCourseList(init = false) {
    if (init) this.page = 0;
    const { subMenuList, curSubMenuIdx, courseList, keywords } = this.data;
    const list = (await indexService.getCourseList({
      category_id: subMenuList[curSubMenuIdx].id || "",
      title: keywords,
      page: ++this.page
    })) || [];
    this.setData({
      courseList: init ? list : [...courseList, ...list]
    });
  },

  applyCourse() {
    wx.navigateTo({
      url: "./subpages/course-apply/index"
    });
  }
});
