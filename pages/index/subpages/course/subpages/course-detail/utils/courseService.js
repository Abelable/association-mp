import IndexService from '../../../../../utils/indexService'

class CourseService extends IndexService {
  async toggleLowPraiseStatus(id, action) {
    return await this.post({ url: `${this.baseUrl}/api/v1/legal/like`, data: { id, action } })
  }

  async getLowDetail(id) {
    return await this.get({ url: `${this.baseUrl}/api/v1/legal/detail`, data: { id } })
  }
}

export default CourseService
