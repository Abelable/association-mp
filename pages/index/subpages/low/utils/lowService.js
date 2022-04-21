import IndexService from '../../../utils/indexService'

class LowService extends IndexService {
  async getLowList(category_id, page, page_size = 10) {
    return await this.get({ url: `${this.baseUrl}/api/v1/legal/list`, data: { category_id, page, page_size } })
  }

  async toggleLowPraiseStatus(id, action) {
    return await this.post({ url: `${this.baseUrl}/api/v1/legal/like`, data: { id, action } })
  }

  async getLowDetail(id) {
    return await this.get({ url: `${this.baseUrl}/api/v1/legal/detail`, data: { id } })
  }
}

export default LowService