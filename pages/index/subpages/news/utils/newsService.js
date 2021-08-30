import BaseService from '../../../../../service/baseService'

class NewsService extends BaseService {
  async getNewsList(class_id, article_id, last_id, limit = 6) {
    return await this.get({ url: `${this.baseUrl}/api/v1/article/article-info`, data: { class_id, article_id, last_id, limit, action: 1 } })
  }

  async togglePraiseStatus(article_id, type) {
    return await this.post({ url: `${this.baseUrl}/api/v1/article/article-like`, data: { article_id, type } })
  }

  async share(article_id) {
    return await this.post({ url: `${this.baseUrl}/api/v1/share/mini-share`, data: { article_id, type: 1 } })
  }
}

export default NewsService