import ResourceService from "./utils/resourceService";

const resourceService = new ResourceService();
const { statusBarHeight } = getApp().globalData;

Page({
  data: {
    statusBarHeight,
    curMenuIdx: 0,
    keywords: "",
    subMenuList: [],
    curSubMenuIdx: 0,
    categoryPickerModalVisible: false,
    enterpriseList: []
  },

  async onLoad() {
    await this.setSubMenuList();
    this.setEnterpriseList(true);
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
    this.setEnterpriseList(true);
  },

  cancelSearch() {
    this.setData({
      keywords: ""
    });
    this.setEnterpriseList(true);
  },

  async setSubMenuList() {
    const list = await resourceService.getEnterpriseCategoryList();
    this.setData({ subMenuList: [{ id: 0, name: "全部" }, ...list] });
  },

  async setEnterpriseList(init = false) {
    if (init) {
      this.page = 0;
    }
    const { subMenuList, curSubMenuIdx, keywords, enterpriseList } = this.data;
    const list = await resourceService.getEnterpriseList({
      category_id: subMenuList[curSubMenuIdx].id,
      company_name: keywords,
      page: ++this.page
    });
    this.setData({
      enterpriseList: init ? list : [...enterpriseList, ...list]
    });
  },

  selectMenu(e) {
    const curMenuIdx = e.currentTarget.dataset.index;
    this.setData({ curMenuIdx });
  },

  selectSubMenu(e) {
    const curSubMenuIdx = e.currentTarget.dataset.index;
    this.setData({ curSubMenuIdx });
    this.setEnterpriseList(true);
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

  async onPullDownRefresh() {
    if (this.data.curMenuIdx === 0) {
      await this.setSubMenuList();
      this.setEnterpriseList(true);
    }
    wx.stopPullDownRefresh();
  },

  onReachBottom() {
    if (this.data.curMenuIdx === 0) {
      this.setEnterpriseList();
    }
  },

  checkEnterpriseDetail(e) {
    const { id } = e.currentTarget.dataset;
    const url = `./subpages/enterprise-detail/index?id=${id}`;
    wx.navigateTo({ url });
  }
});
