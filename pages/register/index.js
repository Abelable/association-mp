import checkLogin from '../../utils/checkLogin'
import RegisterService from './utils/registerService'

const registerService = new RegisterService()
const { statusBarHeight } = getApp().globalData

Page({
  data: {
    statusBarHeight,
    companyName: '', 
    websiteUrl: '', 
    ICP: '', 
    staffCount: '',
    tradeCommodity: '', 
    tradeCount: '', 
    tradeAmount: '', 
    name: '', 
    jobTitle: '', 
    politicalStatus: '', 
    tel: '', 
    email: '', 
    contacterName: '', 
    contacterJobTitle: '', 
    contacterTel: '', 
    licenseImg: '',
    memberCount: '', 
    operatorCount: '',
    fileList: []
  },

  setCompanyName(e) {
    this.companyName = e.detail.value
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
  setWebsiteType(e) {
    this.websiteType = e.detail.value.join()
  },
  setStaffCount(e) {
    this.staffCount = e.detail.value
  },
  setTradeCommodity(e) {
    this.tradeCommodity = e.detail.value
  },
  setMemberCount(e) {
    this.memberCount = e.detail.value
  },
  setOperatorCount(e) {
    this.operatorCount = e.detail.value
  },
  setTradeCount(e) {
    this.tradeCount = e.detail.value
  },
  setTradeAmount(e) {
    this.tradeAmount = e.detail.value
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
  setTel(e) {
    this.tel = e.detail.value
  },
  setEmail(e) {
    this.email = e.detail.value
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

  deleteFile(e) {
    const { index } = e.detail
    let { fileList } = this.data
    fileList.splice(index, 1)
    this.setData({ fileList })
  },

  async uploadLicense() {
    const { tempFilePaths } = await registerService.chooseImage(1)
    const licenseImg = await registerService.uploadImg(tempFilePaths[0])
    this.setData({ licenseImg })
  },

  async submit() {
    checkLogin(() => {
      const { companyName, websiteUrl, ICP, companyType, websiteType, tradeCommodity, tradeCount, tradeAmount, name, jobTitle, politicalStatus, tel, email, contacterName, contacterJobTitle, contacterTel } = this
      const { fileList } = this.data
      
      if (!companyName) {
        wx.showToast({ title: '请输入企业名称', icon: 'none' })
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
      if (!websiteType) {
        wx.showToast({ title: '请选择网站电子商务类型', icon: 'none' })
        return
      }
      if (!staffCount) {
        wx.showToast({ title: '请输入员工人数和党员人数', icon: 'none' })
        return
      }
      if (!tradeCommodity) {
        wx.showToast({ title: '请输入交易商品（服务）', icon: 'none' })
        return
      }
      if (!tradeCount) {
        wx.showToast({ title: '请输入上年交易笔数', icon: 'none' })
        return
      }
      if (!tradeAmount) {
        wx.showToast({ title: '请输入上年交易额', icon: 'none' })
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
      if (!tel) {
        wx.showToast({ title: '请输入负责人手机号', icon: 'none' })
        return
      }
      if (!email) {
        wx.showToast({ title: '请输入负责人邮箱', icon: 'none' })
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
      if (!contacterTel) {
        wx.showToast({ title: '请输入联系人手机号', icon: 'none' })
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

      const content = { companyName, websiteUrl, ICP, companyType, websiteType, staffCount, tradeCommodity, tradeCount, tradeAmount, name, jobTitle, politicalStatus, tel, email, contacterName, contacterJobTitle, contacterTel, licenseImg: licenseImgs.join(), memberCount: this.memberCount || 0, operatorCount: this.operatorCount || 0 }
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
      websiteUrl: '', 
      ICP: '', 
      staffCount: '',
      tradeCommodity: '', 
      tradeCount: '', 
      tradeAmount: '', 
      name: '', 
      jobTitle: '', 
      politicalStatus: '', 
      tel: '', 
      email: '', 
      contacterName: '', 
      contacterJobTitle: '', 
      contacterTel: '', 
      licenseImg: '',
      memberCount: '', 
      operatorCount: '',
      fileList: []
    })
  }
})
