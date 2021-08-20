import checkLogin from '../../utils/checkLogin'
import RegisterService from './utils/registerService'

const registerService = new RegisterService()
const { statusBarHeight } = getApp().globalData

Page({
  data: {
    statusBarHeight,
    companyName: '', 
    abbreviation: '', 
    address: '', 
    postCode: '', 
    websiteUrl: '', 
    averageAge: '', 
    creditCode: '', 
    ICP: '', 
    tradeCommodity: '', 
    tradeCount: '', 
    tradeAmount: '', 
    name: '', 
    gender: '', 
    jobTitle: '', 
    identityCode: '', 
    education: '', 
    politicalStatus: '', 
    tel: '', 
    email: '', 
    contacterName: '', 
    contacterJobTitle: '', 
    contacterTel: '', 
    contacterEmail: '', 
    licenseImg: '',
    memberCount: '', 
    operatorCount: ''
  },

  setCompanyName(e) {
    this.companyName = e.detail.value
  },
  setAbbreviation(e) {
    this.abbreviation = e.detail.value
  },
  setAddress(e) {
    this.address = e.detail.value
  },
  setPostCode(e) {
    this.postCode = e.detail.value
  },
  setWebsiteUrl(e) {
    this.websiteUrl = e.detail.value
  },
  setAverageAge(e) {
    this.averageAge = e.detail.value
  },
  setCreditCode(e) {
    this.creditCode = e.detail.value
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
  setGender(e) {
    this.gender = e.detail.value
  },
  setJobTitle(e) {
    this.jobTitle = e.detail.value
  },
  setIdentityCode(e) {
    this.identityCode = e.detail.value
  },
  setEducation(e) {
    this.education = e.detail.value
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
  setContacterEmail(e) {
    this.contacterEmail = e.detail.value
  },

  async uploadLicense() {
    const { tempFilePaths } = await registerService.chooseImage(1)
    const licenseImg = await registerService.uploadImg(tempFilePaths[0])
    this.setData({ licenseImg })
  },

  async submit() {
    checkLogin(() => {
      const { companyName, abbreviation, address, postCode, websiteUrl, averageAge, creditCode, ICP, companyType, websiteType, tradeCommodity, tradeCount, tradeAmount, name, gender, jobTitle, identityCode, education, politicalStatus, tel, email, contacterName, contacterJobTitle, contacterTel, contacterEmail } = this
      
      if (!companyName) {
        wx.showToast({ title: '请输入企业名称', icon: 'none' })
        return
      }
      if (!abbreviation) {
        wx.showToast({ title: '请输入企业简称', icon: 'none' })
        return
      }
      if (!address) {
        wx.showToast({ title: '请输入企业地址', icon: 'none' })
        return
      }
      if (!postCode) {
        wx.showToast({ title: '请输入邮政编码', icon: 'none' })
        return
      }
      if (!websiteUrl) {
        wx.showToast({ title: '请输入网站（网店）网址', icon: 'none' })
        return
      }
      if (!averageAge) {
        wx.showToast({ title: '请输入企业员工平均年龄', icon: 'none' })
        return
      }
      if (!creditCode) {
        wx.showToast({ title: '请输入统一社会信用代码', icon: 'none' })
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
      if (!gender) {
        wx.showToast({ title: '请输入负责人性别', icon: 'none' })
        return
      }
      if (!jobTitle) {
        wx.showToast({ title: '请输入负责人职务', icon: 'none' })
        return
      }
      if (!identityCode) {
        wx.showToast({ title: '请输入负责人身份证号', icon: 'none' })
        return
      }
      if (!education) {
        wx.showToast({ title: '请输入负责人学历', icon: 'none' })
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
      if (!contacterEmail) {
        wx.showToast({ title: '请输入联系人邮箱', icon: 'none' })
        return
      }
      if (!this.data.licenseImg) {
        wx.showToast({ title: '请上传企业营业执照或副本', icon: 'none' })
        return
      }

      const content = { companyName, abbreviation, address, postCode, websiteUrl, averageAge, creditCode, ICP, companyType, websiteType, tradeCommodity, tradeCount, tradeAmount, name, gender, jobTitle, identityCode, education, politicalStatus, tel, email, contacterName, contacterJobTitle, contacterTel, contacterEmail, licenseImg: this.data.licenseImg, memberCount: this.memberCount || 0, operatorCount: this.operatorCount || 0 }
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
      abbreviation: '', 
      address: '', 
      postCode: '', 
      websiteUrl: '', 
      averageAge: '', 
      creditCode: '', 
      ICP: '', 
      tradeCommodity: '', 
      tradeCount: '', 
      tradeAmount: '', 
      name: '', 
      gender: '', 
      jobTitle: '', 
      identityCode: '', 
      education: '', 
      politicalStatus: '', 
      tel: '', 
      email: '', 
      contacterName: '', 
      contacterJobTitle: '', 
      contacterTel: '', 
      contacterEmail: '', 
      licenseImg: '',
      memberCount: '', 
      operatorCount: ''
    })
  }
})
