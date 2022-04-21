import IndexService from '../../../../../utils/indexService'

class CourseService extends IndexService {
  async getCourseDetail(id) {
    return await this.get({ url: `${this.baseUrl}/api/v1/class-room/detail`, data: { id } })
  }

  async checkPwd(id, password, success, fail) {
    return await this.post({ url: `${this.baseUrl}/api/v1/class-room/keep-watch`, data: { id, password }, success, fail })
  }
}

export default CourseService
