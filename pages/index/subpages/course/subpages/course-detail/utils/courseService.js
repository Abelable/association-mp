import IndexService from '../../../../../utils/indexService'

class CourseService extends IndexService {
  async getCourseDetail(id) {
    return await this.get({ url: `${this.baseUrl}/api/v1/class-room/detail`, data: { id } })
  }

  async toggleCourseCollectStatus(id, action) {
    return await this.post({ url: `${this.baseUrl}/api/v1/class-room/collect`, data: { id, action } })
  }

  async toggleCoursePraiseStatus(id, action) {
    return await this.post({ url: `${this.baseUrl}/api/v1/class-room/like`, data: { id, action } })
  }

  async checkPwd(id, password, success, fail) {
    return await this.post({ url: `${this.baseUrl}/api/v1/class-room/keep-watch`, data: { id, password }, success, fail })
  }
}

export default CourseService
