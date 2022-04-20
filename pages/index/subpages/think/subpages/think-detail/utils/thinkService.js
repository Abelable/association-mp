import IndexService from '../../../../../utils/indexService'

class LowService extends IndexService {
  async getThinkDetail(id) {
    return await this.get({ url: `${this.baseUrl}/api/v1/wisdom-library/detail`, data: { id } })
  }
}

export default LowService