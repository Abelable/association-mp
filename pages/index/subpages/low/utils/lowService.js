import IndexService from '../../../utils/indexService'

class LowService extends IndexService {
  async toggleLowCollectStatus(id, action) {
    return await this.post({ url: `${this.baseUrl}/api/v1/legal/collect1`, data: { id, action } })
  }

  async toggleLowPraiseStatus(id, action) {
    return await this.post({ url: `${this.baseUrl}/api/v1/legal/like1`, data: { id, action } })
  }

  async getLowDetail(id) {
    return await this.get({ url: `${this.baseUrl}/api/v1/legal/detail1`, data: { id } })
  }
}

export default LowService