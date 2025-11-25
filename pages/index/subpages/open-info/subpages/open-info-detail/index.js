import checkLogin from "../../../../../../utils/checkLogin";
import OpenInfoService from "../../utils/openInfoService";

const openInfoService = new OpenInfoService();

Page({
  data: {
    info: null,
    posterInfo: null,
    sharePopupVisible: false,
    posterModalVisible: false
  },

  onLoad(options) {
    const { id, scene } = options;
    const decodedScene = scene ? decodeURIComponent(scene) : "";
    this.id = id || decodedScene.split("-")[0];
    this.setInfo();
    wx.showLoading({ title: "加载中..." });
  },

  async setInfo() {
    const info = await openInfoService.getOpenInfoDetail(this.id);
    this.setData({ info });
  },

  load() {
    wx.hideLoading();
  },

  async toggleCollect() {
    checkLogin(() => {
      const { id, is_collect } = this.data.info;
      const status = is_collect == 1 ? 0 : 1;
      this.setData({
        ["info.is_collect"]: status
      });
      openInfoService.toggleOpenInfoCollectStatus(id, status);
    });
  },

  async togglePraise() {
    checkLogin(() => {
      const { id, is_like } = this.data.info;
      const status = is_like == 1 ? 0 : 1;
      this.setData({
        ["info.is_like"]: status
      });
      openInfoService.toggleOpenInfoPraiseStatus(id, status);
    });
  },

  showSharePopup() {
    checkLogin(() => {
      this.setData({
        sharePopupVisible: true
      });
      this.setPosterInfo();
    });
  },

  async setPosterInfo() {
    let { posterBgUrl, posterAvatarUrl } = getApp().globalData;
    if (!posterBgUrl) {
      const { path } = await openInfoService.getImageInfo(
        "https://img.ubo.vip/mp/association/bg.png"
      );
      posterBgUrl = path;
      getApp().globalData.posterBgUrl = path;
    }
    if (!posterAvatarUrl) {
      const { path } = await openInfoService.getImageInfo(
        wx.getStorageSync("userInfo").avatarUrl
      );
      posterAvatarUrl = path;
      getApp().globalData.posterAvatarUrl = path;
    }

    const { id, cover: image, title } = this.data.info;
    const { path: cover } = await openInfoService.getImageInfo(image);
    const { app_code } = await openInfoService.share({ type: 2, legal_id: id });
    const { path: qrCode } = await openInfoService.getImageInfo(app_code);

    const posterInfo = {
      bgUrl: posterBgUrl,
      avatarUrl: posterAvatarUrl,
      nickName: wx.getStorageSync("userInfo").nickName,
      cover,
      title,
      qrCode
    };
    this.setData({ posterInfo });
  },

  hideSharePopup() {
    this.setData({
      sharePopupVisible: false
    });
  },

  showPosterModal() {
    if (!this.data.posterInfo) {
      wx.showLoading({ title: "海报生成中... " });
      setTimeout(() => {
        this.showPosterModal();
      }, 1000);
    } else {
      wx.hideLoading();
      this.setData({
        sharePopupVisible: false,
        posterModalVisible: true
      });
    }
  },

  hidePosterModal() {
    this.setData({
      posterModalVisible: false
    });
  },

  onShareAppMessage() {
    const { image, title } = this.data.info;
    const imageUrl = `${image}?x-oss-process=image/resize,m_fill,h_180,w_180`;
    const path = `/pages/index/subpages/low/subpages/low-detail/index?id=${this.id}`;
    return { path, title, imageUrl };
  }
});
