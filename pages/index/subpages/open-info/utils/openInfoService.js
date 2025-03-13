import IndexService from "../../../utils/indexService";

class OpenInfoService extends IndexService {
  async toggleOpenInfoCollectStatus(id, action) {
    return await this.post({
      url: `${this.baseUrl}/api/v1/open-info/collect`,
      data: { id, action }
    });
  }

  async toggleOpenInfoPraiseStatus(id, action) {
    return await this.post({
      url: `${this.baseUrl}/api/v1/open-info/like`,
      data: { id, action }
    });
  }

  async getOpenInfoDetail(id) {
    return await this.get({
      url: `${this.baseUrl}/api/v1/open-info/detail`,
      data: { id }
    });
  }
}

export default OpenInfoService;
