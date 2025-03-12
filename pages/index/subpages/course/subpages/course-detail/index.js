import checkLogin from "../../../../../../utils/checkLogin";
import CourseService from "./utils/courseService";

const courseService = new CourseService();

Page({
  data: {
    info: null,
    likeStatus: false,
    posterInfo: null,
    limit: false,
    passwordModalVisible: false,
    sharePopupVisible: false,
    posterModalVisible: false,
    courseVisible: false
  },

  onLoad(options) {
    const { envVersion } = wx.getAccountInfoSync().miniProgram || {};
    if (["develop", "release"].includes(envVersion)) {
      this.setData({ courseVisible: true });
    }

    const { id, scene } = options;
    const decodedScene = scene ? decodeURIComponent(scene) : "";
    this.id = id || decodedScene.split("-")[0];
    this.player = wx.createVideoContext("video-player");
    this.setLikeStatus();
    this.setInfo();
    wx.showLoading({ title: "加载中..." });
  },

  setLikeStatus() {
    const list = wx.getStorageSync("courseLikeList") || [];
    if (list.length) {
      const statusItem = list.find(item => item.id === this.id);
      if (statusItem && statusItem.status) {
        this.setData({
          likeStatus: true
        });
      }
    }
  },

  async setInfo() {
    const info = await courseService.getCourseDetail(this.id);
    wx.setNavigationBarTitle({
      title: info.title
    });
    this.setData({
      info,
      limit: !!info.is_try
    });
  },

  load() {
    wx.hideLoading();
  },

  observeVideo(e) {
    const { limit, info } = this.data;
    if (limit && e.detail.currentTime > info.try_time * 60) {
      this.player.exitFullScreen();
      this.player.pause();
      this.showPasswordModal();
    }
  },

  async toggleCollect() {
    checkLogin(() => {
      const { id, is_collect } = this.data.info;
      const status = is_collect == 1 ? 0 : 1;
      this.setData({
        ["info.is_collect"]: status
      });
      courseService.toggleCourseCollectStatus(id, status);
    });
  },

  async togglePraise() {
    checkLogin(() => {
      const { id, is_like } = this.data.info;
      const status = is_like == 1 ? 0 : 1;
      this.setData({
        ["info.is_like"]: status
      });
      courseService.toggleCoursePraiseStatus(id, status);
    });
  },

  showTips() {
    wx.showModal({
      title: "温馨提示",
      showCancel: false,
      content:
        "请您联系：（0571）-12311312           工作时间：工作日 9:00-18:00",
      confirmText: "我知道了",
      confirmColor: "#114CEE"
    });
  },

  showPasswordModal() {
    this.setData({
      passwordModalVisible: true
    });
  },

  romoveLimit() {
    this.setData({
      limit: false,
      passwordModalVisible: false
    });
    this.player.play();
  },

  hidePasswordModal() {
    this.setData({
      passwordModalVisible: false
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
      const { path } = await courseService.getImageInfo(
        "https://img.ubo.vip/mp/association/bg.png"
      );
      posterBgUrl = path;
      getApp().globalData.posterBgUrl = path;
    }
    if (!posterAvatarUrl) {
      const { path } = await courseService.getImageInfo(
        wx.getStorageSync("userInfo").avatarUrl
      );
      posterAvatarUrl = path;
      getApp().globalData.posterAvatarUrl = path;
    }

    const { id, cover_img, title } = this.data.info;
    const { path: cover } = await courseService.getImageInfo(cover_img);
    const { app_code } = await courseService.share({
      type: 4,
      class_room_id: id
    });
    const { path: qrCode } = await courseService.getImageInfo(app_code);

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
    const path = `/pages/index/subpages/course/subpages/course-detail/index?id=${this.id}`;
    return { path, title, imageUrl };
  }
});
