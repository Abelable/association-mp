import IndexService from '../../../utils/indexService'

class LowService extends IndexService {
  async getLowList(category_id, title) {
    return await this.post({ url: `${this.baseUrl}/api/v1/legal/list`, data: { title, category_id } })
  }

  async toggleLowPraiseStatus(id, action) {
    return await this.post({ url: `${this.baseUrl}/api/v1/legal/like`, data: { id, action } })
  }

  async getLowDetail(id) {
    return await this.get({ url: `${this.baseUrl}/api/v1/legal/detail`, data: { id } })
  }

  async share({ type = 2, article_id = '', legal_id = ''}) {
    return await this.post({ url: `${this.baseUrl}/api/v1/share/mini-share`, data: { type, article_id, legal_id } })
  }
}

export default LowService