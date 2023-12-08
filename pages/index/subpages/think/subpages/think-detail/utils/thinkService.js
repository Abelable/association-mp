import IndexService from '../../../../../utils/indexService'

class ThinkService extends IndexService {
  async getThinkDetail(id) {
    return await this.get({ url: `${this.baseUrl}/api/v1/wisdom-library/detail`, data: { id } })
  }

  async toggleThinkCollectStatus(id, action) {
    return await this.post({ url: `${this.baseUrl}/api/v1/wisdom-library/collect`, data: { id, action } })
  }

  async toggleThinkPraiseStatus(id, action) {
    return await this.post({ url: `${this.baseUrl}/api/v1/wisdom-library/like`, data: { id, action } })
  }
}

export default ThinkService
