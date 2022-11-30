import Base from './base/index'

class BaseService extends Base {
  async login(code) {
    return await this.post({ url: `${this.baseUrl}/api/v1/mini-wx/openid`, data: { code } })
  }

  async bindUserInfo({ nickName, avatarUrl, gender, city, province, country }) {
    return await this.post({ url: `${this.baseUrl}/api/v1/mini-wx/bind`, data: { nickName, avatarUrl, gender, city, province, country } })
  }

  async share({ type = 1, article_id = '', class_room_id = '', legal_id = '', wisdom_library_id = '' }) {
    return await this.post({ url: `${this.baseUrl}/api/v1/share/mini-share`, data: { type, article_id, class_room_id, legal_id, wisdom_library_id } })
  }

  async getApplyList(page, page_size = 10) {
    return await this.get({ url: `${this.baseUrl}/api/v1/enter-apply/list-apply`, data: { page, page_size }, loadingTitle: '加载中...' })
  }
}

export default BaseService
