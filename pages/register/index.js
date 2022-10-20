import checkLogin from '../../utils/checkLogin'
import RegisterService from './utils/registerService'

const registerService = new RegisterService()
const { statusBarHeight } = getApp().globalData

Page({
  data: {
    statusBarHeight,
    companyName: '', 
    companyShortName: '', 
    websiteUrl: '', 
    ICP: '', 
    staffCount: '',
    gangCount: '',
    tradeAmount: '',
    revenue: '',
    name: '', 
    jobTitle: '', 
    politicalStatus: '', 
    contacterName: '', 
    contacterJobTitle: '', 
    contacterTel: '', 
    licenseImg: '',
    fileList: [],
    logoList: [],
  },

  navToRecord() {
    checkLogin(() => {
      wx.navigateTo({ url: './subpages/record/index' })
    })
  },

  setCompanyName(e) {
    this.companyName = e.detail.value
  },
  setCompanyShortName(e) {
    this.companyShortName = e.detail.value
  },
  setWebsiteUrl(e) {
    this.websiteUrl = e.detail.value
  },
  setICP(e) {
    this.ICP = e.detail.value
  },
  setCompanyType(e) {
    this.companyType = e.detail.value.join()
  },
  setStaffCount(e) {
    this.staffCount = e.detail.value
  },
  setGangCount(e) {
    this.gangCount = e.detail.value
  },
  setTradeAmount(e) {
    this.tradeAmount = e.detail.value
  },
  setRevenue(e) {
    this.revenue = e.detail.value
  },
  setName(e) {
    this.name = e.detail.value
  },
  setJobTitle(e) {
    this.jobTitle = e.detail.value
  },
  setpPliticalStatus(e) {
    this.politicalStatus = e.detail.value
  },
  setContacterName(e) {
    this.contacterName = e.detail.value
  },
  setContacterJobTitle(e) {
    this.contacterJobTitle = e.detail.value
  },
  setContacterTel(e) {
    this.contacterTel = e.detail.value
  },

  async afterRead(e) {
    const { file } = e.detail
    const licenseImg = await registerService.uploadImg(file.url)
    this.setData({
      fileList: [...this.data.fileList, { ...file, url: licenseImg }]
    })
  },

  async afterLogoRead(e) {
    const { file } = e.detail
    const logoImg = await registerService.uploadImg(file.url)
    this.setData({
      logoList: [{ ...file, url: logoImg }]
    })
  },

  deleteFile(e) {
    const { index } = e.detail
    let { fileList } = this.data
    fileList.splice(index, 1)
    this.setData({ fileList })
  },

  deleteLogo() {
    this.setData({ logoList: [] })
  },

  async uploadLicense() {
    const { tempFilePaths } = await registerService.chooseImage(1)
    const licenseImg = await registerService.uploadImg(tempFilePaths[0])
    this.setData({ licenseImg })
  },

  async submit() {
    checkLogin(() => {
      const { companyName, companyShortName, websiteUrl, ICP, companyType, staffCount, gangCount, tradeAmount, revenue, name, jobTitle, politicalStatus, contacterName, contacterJobTitle, contacterTel } = this
      const { fileList, logoList } = this.data
      
      if (!companyName) {
        wx.showToast({ title: '请输入企业名称', icon: 'none' })
        return
      }
      if (!companyShortName) {
        wx.showToast({ title: '请输入企业简称', icon: 'none' })
        return
      }
      if (!websiteUrl) {
        wx.showToast({ title: '网站（app）名称', icon: 'none' })
        return
      }
      if (!ICP) {
        wx.showToast({ title: '请输入ICP备案号', icon: 'none' })
        return
      }
      if (!companyType) {
        wx.showToast({ title: '请选择企业类型', icon: 'none' })
        return
      }
      if (!tradeAmount) {
        wx.showToast({ title: '请输入上年度GMV', icon: 'none' })
        return
      }
      if (!revenue) {
        wx.showToast({ title: '请输入上年度应收', icon: 'none' })
        return
      }
      if (!staffCount) {
        wx.showToast({ title: '请输入员工人数', icon: 'none' })
        return
      }
      if (!gangCount) {
        wx.showToast({ title: '请输入党员人数', icon: 'none' })
        return
      }
      if (!name) {
        wx.showToast({ title: '请输入负责人姓名', icon: 'none' })
        return
      }
      if (!jobTitle) {
        wx.showToast({ title: '请输入负责人职务', icon: 'none' })
        return
      }
      if (!politicalStatus) {
        wx.showToast({ title: '请输入负责人政治面貌', icon: 'none' })
        return
      }
      if (!contacterName) {
        wx.showToast({ title: '请输入联系人姓名', icon: 'none' })
        return
      }
      if (!contacterJobTitle) {
        wx.showToast({ title: '请输入联系人职务', icon: 'none' })
        return
      }
      if (!contacterTel || !(/^1[3456789]\d{9}$/.test(this.contacterTel))) {
        wx.showToast({ title: '请输入正确的工作联系方式', icon: 'none' })
        return
      }

      if (!fileList.length) {
        wx.showToast({ title: '请上传企业营业执照或副本', icon: 'none' })
        return
      }

      const licenseImgs = []
      fileList.forEach(item => {
        licenseImgs.push(item.url)
      })

      const content = { companyName, companyShortName, websiteUrl, ICP, companyType, staffCount, gangCount, tradeAmount, revenue, name, jobTitle, politicalStatus, contacterName, contacterJobTitle, contacterTel, licenseImg: licenseImgs.join(), logoImg: logoList.length ? logoList[0].url : '' }
      registerService.submitApply(content, () => {
        wx.showToast({ title: '提交成功', icon: 'none' })
        this.resetData()
      }, () => {
        wx.showToast({ title: '提交失败，请重试', icon: 'none' })
      })
    })
  },

  resetData() {
    this.setData({
      companyName: '',
      companyShortName: '',
      websiteUrl: '', 
      ICP: '', 
      staffCount: '',
      gangCount: '',
      tradeAmount: '',
      revenue: '',
      name: '', 
      jobTitle: '', 
      politicalStatus: '', 
      contacterName: '', 
      contacterJobTitle: '', 
      contacterTel: '', 
      licenseImg: '',
      fileList: [],
      logoList: []
    })
  }
})
