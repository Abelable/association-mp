import BaseService from '../../../service/baseService'

class IndexService extends BaseService {
  async getBanner() {
    return await this.get({ url: `${this.baseUrl}/api/v1/article/banner-list` })
  }

  async getCategory() {
    return await this.get({ url: `${this.baseUrl}/api/v1/article/category-list` })
  }

  async getNewsList(class_id, page, page_size = 5) {
    return await this.get({ url: `${this.baseUrl}/api/v1/article/article-list`, data: { class_id, page, page_size }, loadingTitle: '加载中...' })
  }

  async checkArticle(class_id, article_id) {
    return await this.post({ url: `${this.baseUrl}/api/v1/article/article-look`, data: { class_id, article_id } })
  }
}

export default IndexService
