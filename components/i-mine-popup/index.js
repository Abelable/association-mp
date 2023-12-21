import BaseService from "../../service/baseService";

const baseService = new BaseService();
const { statusBarHeight } = getApp().globalData;
const userInfo = wx.getStorageSync("userInfo");

Component({
  data: {
    statusBarHeight,
    userInfo,
    show: false,
    avatarUrl: "",
    userInfoModalVisible: false,
  },

  lifetimes: {
    attached() {
      setTimeout(() => {
        this.setData({ show: true });
      }, 50);
    },
  },

  methods: {
    showUserInfoModal() {
      this.setData({ userInfoModalVisible: true });
    },

    async onChooseAvatar(e) {
      const avatarUrl = (await baseService.uploadImg(e.detail.avatarUrl)) || "";
      this.setData({ avatarUrl });
    },

    setNickname(e) {
      console.log("setNickname", e);
      this.nickname = e.detail.value;
    },

    async auth() {
      const { userInfo: originalUserInfo, avatarUrl } = this.data;
      if (!avatarUrl) {
        wx.showToast({
          title: "请上传用户头像",
          icon: "none",
        });
        return;
      }
      if (!this.nickname) {
        wx.showToast({
          title: "请输入用户昵称",
          icon: "none",
        });
        return;
      }
      const userInfo = {
        ...originalUserInfo,
        avatarUrl,
        nickName: this.nickname,
      };
      await baseService.bindUserInfo(userInfo);
      this.setData({
        userInfo,
        userInfoModalVisible: false,
      });
      wx.setStorageSync("userInfo", userInfo);
    },

    hideUserInfoModal() {
      this.setData({ userInfoModalVisible: false });
    },

    navToCollect() {
      wx.navigateTo({ url: "/pages/register/subpages/collect/index" });
    },

    navToRecord() {
      wx.navigateTo({ url: "/pages/register/subpages/record/index" });
    },

    hide() {
      this.setData(
        {
          show: false,
        },
        () => {
          setTimeout(() => {
            this.triggerEvent("hide");
          }, 200);
        }
      );
    },

    catchtap() {},
  },
});
