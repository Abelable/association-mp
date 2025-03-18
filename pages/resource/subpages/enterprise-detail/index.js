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
    const { banner, ...info } = await resourceService.getEnterpriseDetail(
      this.id
    );
    wx.setNavigationBarTitle({
      title: info.company_name
    });
    this.setData({ banner: JSON.parse(banner), info });
  },

  navToConsulting() {
    const url = `../consulting/index?id=${this.id}`
    wx.navigateTo({ url });
  },

  navigation() {
    const {
      company_name: name,
      address_detail: address,
      latitude,
      longitude
    } = this.data.info;
    wx.openLocation({
      latitude: +latitude,
      longitude: +longitude,
      name,
      address
    });
  },

  checkMp() {
    wx.navigateToMiniProgram({
      appId: this.data.info.mp_app_id
    });
  }
});
