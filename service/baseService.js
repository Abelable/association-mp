import { cleanObject } from "../utils/util";
import Base from "./base/index";
import api from "./base/api";

class BaseService extends Base {
  async uploadImg(filePath) {
    wx.showLoading({ title: "图片上传中..." });
    const _filePath = `data:image/jpeg;base64,${wx
      .getFileSystemManager()
      .readFileSync(filePath, "base64")}`;
    const res = await api.request({
      url: "https://mms.youboi.com/api/v4/user/material",
      method: "POST",
      data: {
        "file[content]": _filePath,
        wxmini: -1,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    wx.hideLoading();
    if (res.statusCode === 200 && res.data.code === 1001)
      return res.data.data[0];
  }

  async login(code) {
    return await this.post({
      url: `${this.baseUrl}/api/v1/mini-wx/openid`,
      data: { code },
    });
  }

  async bindUserInfo({ nickName, avatarUrl, gender, city, province, country }) {
    return await this.post({
      url: `${this.baseUrl}/api/v1/mini-wx/bind`,
      data: { nickName, avatarUrl, gender, city, province, country },
    });
  }

  async share({
    type = 1,
    article_id = "",
    class_room_id = "",
    legal_id = "",
    wisdom_library_id = "",
  }) {
    return await this.post({
      url: `${this.baseUrl}/api/v1/share/mini-share`,
      data: { type, article_id, class_room_id, legal_id, wisdom_library_id },
    });
  }

  async getApplyList(page, page_size = 10) {
    return await this.get({
      url: `${this.baseUrl}/api/v1/enter-apply/list-apply`,
      data: { page, page_size },
      loadingTitle: "加载中...",
    });
  }

  async getClassCollectList(keywords, page, page_size = 10) {
    return await this.get({
      url: `${this.baseUrl}/api/v1/class-room/collect-list`,
      data: { keywords, page, page_size },
    });
  }

  async getLowCollectList(keywords, page, page_size = 10) {
    return await this.get({
      url: `${this.baseUrl}/api/v1/legal/collect-list1`,
      data: { keywords, page, page_size },
    });
  }

  async getThinkCollectList(keywords, page, page_size = 10) {
    return await this.get({
      url: `${this.baseUrl}/api/v1/wisdom-library/collect-list`,
      data: { keywords, page, page_size },
    });
  }

  async getLowCategoryList({ pid = 0, page, page_size = 1000 }) {
    return await this.get({
      url: `${this.baseUrl}/api/v1/legal/category-list1`,
      data: {
        pid,
        page,
        page_size,
      },
    });
  }

  async getLowList({
    keywords,
    category_id,
    sub_category_id,
    page,
    page_size = 10,
  }) {
    return await this.get({
      url: `${this.baseUrl}/api/v1/legal/list1`,
      data: cleanObject({
        keywords,
        category_id,
        sub_category_id,
        page,
        page_size,
      }),
    });
  }
}

export default BaseService;
