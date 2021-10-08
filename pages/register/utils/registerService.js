import api from '../../../service/base/api'
import BaseService from '../../../service/baseService'

class RegisterService extends BaseService {
  async uploadImg(filePath) {
    wx.showLoading({ title: '图片上传中...' })
    const _filePath = `data:image/jpeg;base64,${wx.getFileSystemManager().readFileSync(filePath, "base64")}`
    const res = await api.request({ 
      url: 'https://mms.youboi.com/api/v4/user/material',
      method: 'POST', 
      data: { 'file[content]': _filePath },
      header: { 
        "content-type": 'application/x-www-form-urlencoded',
        "token": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJhdWQiOiJodHRwczpcL1wvd3d3LnlvdWJvMi5jbiIsInN1YiI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJleHAiOjE2MzQ0NjExMDUsInVzZXJfaWQiOjk3MzI5NTV9.mJKe945G5bxVNFL7FeWys7V7ouSYtfho921a81Y4w64'
      }
    })
    wx.hideLoading()
    if (res.statusCode === 200 && res.data.code === 1001) return res.data.data[0]
  }

  async submitApply(content, success, fail, id = '') {
    const { companyName, websiteUrl, ICP, companyType, websiteType, staffCount, gangCount, tradeCommodity, tradeCount, tradeAmount, name, jobTitle, politicalStatus, tel, email, contacterName, contacterJobTitle, contacterTel, licenseImg, memberCount, operatorCount } = content
    const applyContent = [
      { "title": '企业名称', "name": 'company_name', "value": companyName },
      { "title": '网站（app）名称', "name": 'website_url', "value": websiteUrl },
      { "title": 'ICP备案号', "name": 'ICP', "value": ICP },
      { "title": '企业类型', "name": 'company_type', "value": companyType },
      { "title": '网站电子商务类型', "name": 'website_type', "value": websiteType },
      { "title": '员工人数', "name": 'staff_count', "value": staffCount },
      { "title": '党员人数', "name": 'gang_count', "value": gangCount },
      { "title": '交易商品（服务）', "name": 'trade_commodity', "value": tradeCommodity },
      { "title": '上年交易笔数', "name": 'trade_count', "value": tradeCount },
      { "title": '上年交易额', "name": 'trade_amount', "value": tradeAmount },
      { "title": '负责人姓名', "name": '_name', "value": name },
      { "title": '职务', "name": 'job_title', "value": jobTitle },
      { "title": '政治面貌', "name": 'political_status', "value": politicalStatus },
      { "title": '手机号', "name": '_mobile', "value": tel },
      { "title": '邮箱', "name": '_email', "value": email },
      { "title": '协会联系人姓名', "name": 'contacter_name', "value": contacterName },
      { "title": '协会联系人职务', "name": 'contacter_job_title', "value": contacterJobTitle },
      { "title": '协会联系人手机号', "name": 'contacter_mobile', "value": contacterTel },
      { "title": '企业营业执照或副本', "name": 'license', "value": licenseImg },
      { "title": '注册会员数量', "name": 'member_count', "value": memberCount },
      { "title": '平台网站内经营者数量', "name": 'operator_count', "value": operatorCount }
    ]
    if (id) {
      return await this.post({ url: `${this.baseUrl}/api/v1/enter-apply/update-apply`, data: { title: '入会申请', id, apply_content_json: JSON.stringify(applyContent) }, loadingTitle: '提交中...', success, fail })
    } else {
      return await this.post({ url: `${this.baseUrl}/api/v1/enter-apply/apply`, data: { title: '入会申请', apply_content_json: JSON.stringify(applyContent) }, loadingTitle: '提交中...', success, fail })
    }
  }

  async getApplyList(page, page_size = 10) {
    return await this.get({ url: `${this.baseUrl}/api/v1/enter-apply/list-apply`, data: { page, page_size }, loadingTitle: '加载中...' })
  }

  async getApplyDetail(id) {
    return await this.get({ url: `${this.baseUrl}/api/v1/enter-apply/info-apply`, data: { id }, loadingTitle: '加载中...' })
  }
}

export default RegisterService
