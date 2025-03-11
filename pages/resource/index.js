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

  onLoad(options) {},

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

  checkEnterpriseDetail(e) {
    const { id } = e.currentTarget.dataset;
    const url = `./subpages/enterprise-detail/index?id=${id}`;
    wx.navigateTo({ url });
  }
});
