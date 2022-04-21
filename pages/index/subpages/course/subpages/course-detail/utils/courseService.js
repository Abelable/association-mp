import IndexService from '../../../../../utils/indexService'

class CourseService extends IndexService {
  async getCourseDetail(id) {
    return await this.get({ url: `${this.baseUrl}/api/v1/class-room/detail`, data: { id } })
  }
}

export default CourseService
