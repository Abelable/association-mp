import BaseService from "../../../service/baseService";

class IndexService extends BaseService {
  async getBanner() {
    return await this.get({
      url: `${this.baseUrl}/api/v1/article/banner-list`
    });
  }

  async getCourseList({ category_id = "", title = "", page, page_size = 10 }) {
    return await this.get({
      url: `${this.baseUrl}/api/v1/class-room/list`,
      data: { category_id, title, page, page_size },
      loadingTitle: "加载中..."
    });
  }

  async getThinkList(page, page_size = 10, name = "", field = "") {
    return await this.get({
      url: `${this.baseUrl}/api/v1/wisdom-library/list`,
      data: { page, page_size, name, field }
    });
  }

  async checkArticle(class_id, article_id) {
    return await this.post({
      url: `${this.baseUrl}/api/v1/article/article-look`,
      data: { class_id, article_id }
    });
  }

  async getOpenInfoList(page, page_size = 10) {
    return await this.get({
      url: `${this.baseUrl}/api/v1/open-info/list`,
      data: { page, page_size }
    });
  }

  async getCourseCategoryList() {
    return await this.get({
      url: `${this.baseUrl}/api/v1/class-room-category/list`,
      loadingTitle: "加载中..."
    });
  }

  async submitCourseApply(content, success) { 
    return await this.post({
      url: `${this.baseUrl}/api/v1/class-room-apply/save`,
      data: { content },
      success
    });
  }
}

export default IndexService;
