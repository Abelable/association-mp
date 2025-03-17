import BaseService from "../../../service/baseService";

class ResourceService extends BaseService {
  async getEnterpriseCategoryList() {
    return await this.get({
      url: `${this.baseUrl}/api/v1/enterprise-category/list`
    });
  }

  async getEnterpriseList(categoryId, page, page_size = 10) {
    return await this.get({
      url: `${this.baseUrl}/api/v1/enter-apply/list`,
      data: { categoryId, page, page_size }
    });
  }
}

export default ResourceService;
