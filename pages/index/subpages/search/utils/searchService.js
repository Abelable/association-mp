import IndexService from '../../../utils/indexService'

class SearchService extends IndexService {
  async search(type, word) {
    return await this.post({ url: `${this.baseUrl}/api/v1/search/list`, data: { type, word } })
  }
}

export default SearchService
