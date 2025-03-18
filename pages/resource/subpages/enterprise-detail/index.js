import ResourceService from "../../utils/resourceService";

const resourceService = new ResourceService();

Page({
  data: {
    banner: [],
    info: {}
  },

  onLoad({ id }) {
    this.id = id;
    this.setInfo();
  },

  async setInfo() {
    const { banner, company_name, ...info } =
      await resourceService.getEnterpriseDetail(this.id);
    wx.setNavigationBarTitle({
      title: company_name
    });
    this.setData({ banner: JSON.parse(banner), info });
  },

  navToConsulting() {
    wx.navigateTo({
      url: "../consulting/index"
    });
  },

  checkMp() {
    wx.navigateToMiniProgram({
      appId: this.data.info.mp_app_id
    })
  }
});
