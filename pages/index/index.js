import checkLogin from "../../utils/checkLogin";
import IndexService from "./utils/indexService";

const indexService = new IndexService();
const { statusBarHeight } = getApp().globalData;

Page({
  data: {
    statusBarHeight,
    navBarVisible: false,
    banner: [],
    lowList: [],
    thinkList: [],
    certificate: "",
    certificateModalVisible: false,
    minePopupVisible: false,
  },

  async onShow() {
    wx.showLoading({
      title: "加载中...",
    });
    await this.setBanner();
    if (wx.getStorageSync("openid")) {
      this.getCertificate();
    }
    await this.setCourseList();
    await this.setLowList();
    await this.setThinkList();
    wx.hideLoading();
  },

  async setBanner() {
    const introItem = {
      img: "https://img.ubo.vip/mp/association/intro-banner.png",
      link_type: 0,
    };
    const banner = (await indexService.getBanner()) || [];
    this.setData({ banner: [...banner, introItem] });
  },

  async setCourseList() {
    const courseList = await indexService.getCourseList(1, 3);
    this.setData({ courseList });
  },

  async setLowList() {
    const lowList = await indexService.getLowList({ page: 1 });
    this.setData({ lowList });
  },

  async setThinkList() {
    const { list: thinkList } = await indexService.getThinkList(1, 3);
    this.setData({ thinkList });
  },

  navTo(e) {
    const { link_type, article_id, redirect_url } =
      this.data.banner[e.currentTarget.dataset.index];
    switch (link_type) {
      case 0:
        wx.navigateTo({ url: "/pages/common/intro/index" });
        break;
      case 1:
        wx.navigateTo({
          url: `/pages/index/subpages/course/subpages/course-detail/index?id=${article_id}`,
        });
        break;
      case 2:
        wx.navigateTo({
          url: `/pages/index/subpages/low/subpages/low-detail/index?id=${article_id}`,
        });
        break;
      case 3:
        wx.navigateTo({
          url: `/pages/index/subpages/think/subpages/think-detail/index?id=${article_id}`,
        });
        break;
      case 4:
        wx.navigateTo({
          url: `/pages/common/webview/index?url=${redirect_url.replace(
            "?",
            "&"
          )}`,
        });
        break;
    }
  },

  checkMoreCourse() {
    wx.navigateTo({
      url: "/pages/index/subpages/course/index",
    });
  },

  checkMoreLow() {
    wx.navigateTo({
      url: "/pages/index/subpages/low-cate/index",
    });
  },

  checkMoreOpenInfo() {
    wx.navigateTo({
      url: "/pages/index/subpages/open-info/index",
    });
  },

  onPageScroll(e) {
    if (e.scrollTop >= 10 && !this.data.navBarVisible)
      this.setData({ navBarVisible: true });
    else if (e.scrollTop < 10 && this.data.navBarVisible)
      this.setData({ navBarVisible: false });
  },

  async onPullDownRefresh() {
    wx.showLoading({
      title: "加载中...",
    });
    await this.setBanner();
    await this.setCourseList();
    await this.setLowList();
    await this.setThinkList();
    wx.hideLoading();
    wx.stopPullDownRefresh();
  },

  async getCertificate() {
    const { list = [] } = (await indexService.getApplyList(1, 100)) || {};
    list.map((item) => {
      if (item.certificate_status == 1) {
        this.setData({
          certificate: item.url,
        });
      }
    });
  },

  checkCertificate() {
    this.setData({
      certificateModalVisible: true,
    });
  },

  async saveImageToPhotosAlbum() {
    const { path: filePath } = await indexService.getImageInfo(
      this.data.certificate
    );
    wx.saveImageToPhotosAlbum({
      filePath,
      success: () => {
        this.setData({
          certificateModalVisible: false,
        });
        wx.showToast({ title: "成功保存", icon: "success" });
      },
    });
  },

  showMinePopup() {
    checkLogin(() => {
      this.setData({
        minePopupVisible: true,
      });
    });
  },

  hideMinePopup() {
    this.setData({
      minePopupVisible: false,
    });
  },

  onShareAppMessage() {},
});
