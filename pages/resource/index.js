import ResourceService from "./utils/resourceService";

const resourceService = new ResourceService();
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
    enterpriseList: [
      {
        cover:
          "https://img-oss.zjseca.com/government/20221122/1669105837384.png",
        name: "杭州艺福堂茶叶有限公司",
        type: "普通会员单位",
        business: "茶叶销售、茶叶制品"
      },
      {
        cover:
          "https://img-oss.zjseca.com/government/20221122/1669105837384.png",
        name: "杭州艺福堂茶叶有限公司",
        type: "普通会员单位",
        business: "茶叶销售、茶叶制品"
      },
      {
        cover:
          "https://img-oss.zjseca.com/government/20221122/1669105837384.png",
        name: "杭州艺福堂茶叶有限公司",
        type: "普通会员单位",
        business: "茶叶销售、茶叶制品"
      }
    ]
  },

  async onLoad() {
    await this.setSubMenuList();
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
    const { subMenuList, curSubMenuIdx, enterpriseList } = this.data;
    const list = await resourceService.getEnterpriseList(
      subMenuList[curSubMenuIdx].id,
      ++this.page
    );
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
    await this.setSubMenuList();
    this.setEnterpriseList(true);
    wx.stopPullDownRefresh();
  },

  onReachBottom() {
    this.setEnterpriseList();
  },

  checkEnterpriseDetail(e) {
    const { id } = e.currentTarget.dataset;
    const url = `./subpages/enterprise-detail/index?id=${id}`;
    wx.navigateTo({ url });
  }
});
