import BaseService from "../../../service/baseService";

class ResourceService extends BaseService {
  async getEnterpriseCategoryList() {
    return await this.get({
      url: `${this.baseUrl}/api/v1/enterprise-category/list`
    });
  }

  async getEnterpriseList({ category_id, company_name, page, page_size = 10 }) {
    return await this.get({
      url: `${this.baseUrl}/api/v1/enter-apply/list`,
      data: { category_id, company_name, page, page_size },
      loadingTitle: "加载中..."
    });
  }
}

export default ResourceService;
