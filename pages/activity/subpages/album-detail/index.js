import ActivityService from "../../utils/activityService";

const activityService = new ActivityService();

const { statusBarHeight } = getApp().globalData;

Page({
  data: {
    statusBarHeight,
    photoList: []
  },

  onLoad({ id }) {
    this.id = id;
    this.setPhotoList()
  },

  async setPhotoList() {
    const { photo_list } =
      (await activityService.getAlbumDetail(this.id)) || {};
    const photoList = JSON.parse(photo_list);
    this.setData({ photoList });
  },

  previewImage(e) {
    const { current } = e.currentTarget.dataset;
    const urls = this.data.photoList;
    wx.previewImage({ current, urls });
  }
});
