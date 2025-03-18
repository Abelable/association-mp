import BaseService from "../../../service/baseService";

class ActivityService extends BaseService {
  async getActivityCategoryList() {
    return await this.get({
      url: `${this.baseUrl}/api/v1/activity-category/list`
    });
  }

  async getActivityList({categoryId, title = '', page, page_size = 10}) {
    return await this.get({
      url: `${this.baseUrl}/api/v1/activity/list`,
      data: { categoryId, title, page, page_size },
      loadingTitle: "加载中..."
    });
  }
}

export default ActivityService;
