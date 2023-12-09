import BaseService from '../../../service/baseService'

class IndexService extends BaseService {
  async getBanner() {
    return await this.get({ url: `${this.baseUrl}/api/v1/article/banner-list` })
  }

  async getCourseList(page, page_size = 10) {
    return await this.get({ url: `${this.baseUrl}/api/v1/class-room/list`, data: { page, page_size } })
  }

  async getLowCateList(page, page_size = 20) {
    return await this.get({ url: `${this.baseUrl}/api/v1/legal/category-list1`, data: { pid: 0, page, page_size } })
  }
  
  async getThinkList(page, page_size = 10, name = '', field = '') {
    return await this.get({ url: `${this.baseUrl}/api/v1/wisdom-library/list`, data: { page, page_size, name, field } })
  }

  async checkArticle(class_id, article_id) {
    return await this.post({ url: `${this.baseUrl}/api/v1/article/article-look`, data: { class_id, article_id } })
  }
}

export default IndexService
