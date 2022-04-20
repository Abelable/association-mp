import IndexService from '../../../../../utils/indexService'

class LowService extends IndexService {
  async getThinkDetail(id) {
    return await this.get({ url: `${this.baseUrl}/api/v1/legal/detail`, data: { id } })
  }

  async shareThink({ type = 2, article_id = '', legal_id = ''}) {
    return await this.post({ url: `${this.baseUrl}/api/v1/share/mini-share`, data: { type, article_id, legal_id } })
  }
}

export default LowService