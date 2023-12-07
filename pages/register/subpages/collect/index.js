import RegisterService from "../../utils/registerService";
import { formatTime } from "../../../../utils/util";

const registerService = new RegisterService();

Page({
  data: {
    list: [
      1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3,
    ],
  },

  onLoad() {
    // this.setList(true)
  },

  async setList(init = false) {
    if (init) this.page = 0;
    const { list = [] } =
      (await registerService.getApplyList(++this.page)) || {};
    list.map((item) => {
      item.time = formatTime(item.created_at);
    });
    this.setData({
      list: init ? list : [...this.data.list, ...list],
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
    // this.setList(true);
    wx.stopPullDownRefresh();
  },

  onReachBottom() {
    // this.setList();
  },
});
