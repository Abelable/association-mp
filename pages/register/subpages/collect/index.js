import RegisterService from "../../utils/registerService";
import { debounce, formatTime } from "../../../../utils/util";

const registerService = new RegisterService();

Page({
  data: {
    curMenuIdx: 0,
    keywords: "",
    classList: [],
    lowList: [],
    thinkList: [],
  },

  onLoad() {
    this.setList(true);
  },

  setKeywords: debounce(function (e) {
    console.log(e);
    const keywords = e.detail.value;
    this.setData({ keywords });
  }),

  clearKeywords() {
    this.setData({ keywords: "" });
  },

  selectMenu(e) {
    const curMenuIdx = Number(e.currentTarget.dataset.index);
    this.setData({ curMenuIdx }, () => {
      const { classList, lowList, thinkList } = this.data;
      if (
        (curMenuIdx === 0 && !classList.length) ||
        (curMenuIdx === 1 && !lowList.length) ||
        (curMenuIdx === 2 && !thinkList.length)
      ) {
        this.setList(true);
      }
    });
  },

  setList(init = false) {
    switch (this.data.curMenuIdx) {
      case 0:
        this.setClassList(init);
        break;
      case 1:
        this.setLowList(init);
        break;
      case 2:
        this.setThinkList(init);
        break;
    }
  },

  async setClassList(init = false) {
    const { keywords, classList } = this.data;
    if (init) this.classPage = 0;
    const { list = [] } =
      (await registerService.getClassCollectList(keywords, ++this.classPage)) ||
      {};
    this.setData({
      classList: init ? list : [...classList, ...list],
    });
  },

  async setLowList(init = false) {
    const { keywords, lowList } = this.data;
    if (init) this.lowPage = 0;
    const { list = [] } =
      (await registerService.getLowCollectList(keywords, ++this.lowPage)) || {};
    this.setData({
      lowList: init ? list : [...lowList, ...list],
    });
  },

  async setThinkList(init = false) {
    const { keywords, thinkList } = this.data;
    if (init) this.thinkPage = 0;
    const { list = [] } =
      (await registerService.getThinkCollectList(keywords, ++this.thinkPage)) ||
      {};
    this.setData({
      thinkList: init ? list : [...thinkList, ...list],
    });
  },

  checkCertificate(e) {
    this.setData({
      certificate: e.currentTarget.dataset.url,
      certificateModalVisible: true,
    });
  },

  async saveImageToPhotosAlbum() {
    const { path: filePath } = await registerService.getImageInfo(
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

  check(e) {
    wx.navigateTo({
      url: `../record-detail/index?id=${e.currentTarget.dataset.id}`,
    });
  },

  onPullDownRefresh() {
    this.setList(true);
    wx.stopPullDownRefresh();
  },

  onReachBottom() {
    this.setList();
  },

  checkClassDetail(e) {
    const url = `/pages/index/subpages/course/subpages/course-detail/index?id=${e.currentTarget.dataset.id}`;
    wx.navigateTo({ url });
  },

  checkLowDetail(e) {
    const url = `/pages/index/subpages/low/subpages/low-detail/index?id=${e.currentTarget.dataset.id}`;
    wx.navigateTo({ url });
  },

  checkThinkDetail(e) {
    const url = `/pages/index/subpages/think/subpages/think-detail/index?id=${e.currentTarget.dataset.id}`;
    wx.navigateTo({ url });
  },
});
