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

  async getEnterpriseDetail(id) {
    return await this.get({
      url: `${this.baseUrl}/api/v1/enter-apply/detail`,
      data: { id },
      loadingTitle: "加载中..."
    });
  }

  async submitConsulting(enterprise_id, name, mobile, company_name, content, success) { 
    return await this.post({
      url: `${this.baseUrl}/api/v1/enterprise-consulting/save`,
      data: { enterprise_id, name, mobile, company_name, content },
      success
    });
  }

  async getIndustryList() {
    return await this.get({
      url: `${this.baseUrl}/api/v1/industry/list`,
      loadingTitle: "加载中..."
    });
  }
}

export default ResourceService;
