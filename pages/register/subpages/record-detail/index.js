import RegisterService from '../../utils/registerService'

const registerService = new RegisterService()
const { statusBarHeight } = getApp().globalData

Page({
  data: {
    statusBarHeight,
    status: 0,
    rejectMark: '',
    companyName: '', 
    websiteUrl: '', 
    ICP: '', 
    companyTypeOptions: [{ id: 1, name: '第三方平台', checked: false }, { id: 2, name: '自营平台', checked: false }, { id: 3, name: '非平台', checked: false }],
    companyType: [],
    websiteTypeOptions: [{ id: 4, name: 'B2B', checked: false }, { id: 5, name: 'B2C', checked: false }, { id: 6, name: 'C2C', checked: false }, { id: 7, name: 'G2C', checked: false }, { id: 8, name: '其他', checked: false }],
    websiteType: [],
    staffCount: '',
    gangCount: '',
    tradeCommodity: '', 
    memberCount: '', 
    operatorCount: '',
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
    fileList: []
  },

  onLoad(options) {
    this.setInfo(options.id)
    this.applyId = options.id
  },

  async setInfo(id) {
    const { is_deal, reject_mark, apply_content_json = [] } = await registerService.getApplyDetail(id) || {}
    let companyName, 
        websiteUrl, 
        ICP, 
        
        staffCount,
        gangCount,
        tradeCommodity, 
        memberCount, 
        operatorCount,
        tradeCount, 
        tradeAmount, 
        name, 
        jobTitle, 
        politicalStatus, 
        tel, 
        email, 
        contacterName, 
        contacterJobTitle, 
        contacterTel
    let companyType = [],
        websiteType = [],    
        fileList = []
    apply_content_json.map(item => {
      switch (item.name) {
        case 'company_name':
          companyName = item.value
          break

        case 'website_url':
          websiteUrl = item.value
          break

        case 'ICP':
          ICP = item.value
          break

        case 'company_type':
          if (item.value) {
            companyType = item.value.split(',')
            companyType.forEach(item => {
              switch (item) {
                case '第三方平台':
                  this.setData({
                    ['companyTypeOptions[0].checked']: true
                  })
                  break

                case '自营平台':
                  this.setData({
                    ['companyTypeOptions[1].checked']: true
                  })
                  break

                case '非平台':
                  this.setData({
                    ['companyTypeOptions[2].checked']: true
                  })
                  break
              }
            })
          }
          break
        
        case 'website_type':
          if (item.value) {
            websiteType = item.value.split(',')
            websiteType.forEach(item => {
              switch (item) {
                case 'B2B':
                  this.setData({
                    ['websiteTypeOptions[0].checked']: true
                  })
                  break

                case 'B2C':
                  this.setData({
                    ['websiteTypeOptions[1].checked']: true
                  })
                  break

                case 'C2C':
                  this.setData({
                    ['websiteTypeOptions[2].checked']: true
                  })
                  break

                case 'G2C':
                  this.setData({
                    ['websiteTypeOptions[3].checked']: true
                  })
                  break

                case '其他':
                  this.setData({
                    ['websiteTypeOptions[4].checked']: true
                  })
                  break
              }
            })
          }
          break

        case 'staff_count':
          staffCount = item.value
          break

        case 'gang_count':
          gangCount = item.value
          break

        case 'trade_commodity':
          tradeCommodity = item.value
          break
        
        case 'member_count':
          memberCount = item.value
          break

        case 'operator_count':
          operatorCount = item.value
          break

        case 'trade_count':
          tradeCount = item.value
          break

        case 'trade_amount':
          tradeAmount = item.value
          break
        
        case '_name':
          name = item.value
          break

        case 'job_title':
          jobTitle = item.value
          break

        case 'political_status':
          politicalStatus = item.value
          break

        case '_mobile':
          tel = item.value
          break
        
        case '_email':
          email = item.value
          break
        
        case 'contacter_name':
          contacterName = item.value
          break

        case 'contacter_job_title':
          contacterJobTitle = item.value
          break

        case 'contacter_mobile':
          contacterTel = item.value
          break

        case 'license':
          if (item.value) {
            fileList = item.value.split(',')
          }
          break
      }
    })
    this.setData({
      status: is_deal,
      rejectMark: reject_mark,
      companyName, 
      websiteUrl, 
      ICP, 
      companyType,
      websiteType,
      staffCount,
      gangCount,
      tradeCommodity, 
      memberCount, 
      operatorCount,
      tradeCount, 
      tradeAmount, 
      name, 
      jobTitle, 
      politicalStatus, 
      tel, 
      email, 
      contacterName, 
      contacterJobTitle, 
      contacterTel,
      fileList
    })
  },

  navBack() {
    wx.navigateBack()
  },

  setCompanyName(e) {
    this._debounce(() => {
      this.setData({
        companyName: e.detail.value
      })
    })
  },
  setWebsiteUrl(e) {
    this._debounce(() => {
      this.setData({
        websiteUrl: e.detail.value
      })
    })
  },
  setICP(e) {
    this._debounce(() => {
      this.setData({
        ICP: e.detail.value
      })
    })
  },
  setCompanyType(e) {
    this._debounce(() => {
      this.setData({
        companyType: e.detail.value
      })
    })
  },
  setWebsiteType(e) {
    this._debounce(() => {
      this.setData({
        websiteType: e.detail.value
      })
    })
  },
  setStaffCount(e) {
    this._debounce(() => {
      this.setData({
        staffCount: e.detail.value
      })
    })
  },
  setGangCount(e) {
    this._debounce(() => {
      this.setData({
        gangCount: e.detail.value
      })
    })
  },
  setTradeCommodity(e) {
    this._debounce(() => {
      this.setData({
        tradeCommodity: e.detail.value
      })
    })
  },
  setMemberCount(e) {
    this._debounce(() => {
      this.setData({
        memberCount: e.detail.value
      })
    })
  },
  setOperatorCount(e) {
    this._debounce(() => {
      this.setData({
        operatorCount: e.detail.value
      })
    })
  },
  setTradeCount(e) {
    this._debounce(() => {
      this.setData({
        tradeCount: e.detail.value
      })
    })
  },
  setTradeAmount(e) {
    this._debounce(() => {
      this.setData({
        tradeAmount: e.detail.value
      })
    })
  },
  setName(e) {
    this._debounce(() => {
      this.setData({
        name: e.detail.value
      })
    })
  },
  setJobTitle(e) {
    this._debounce(() => {
      this.setData({
        jobTitle: e.detail.value
      })
    })
  },
  setPoliticalStatus(e) {
    this._debounce(() => {
      this.setData({
        politicalStatus: e.detail.value
      })
    })
  },
  setTel(e) {
    this._debounce(() => {
      this.setData({
        tel: e.detail.value
      })
    })
  },
  setEmail(e) {
    this._debounce(() => {
      this.setData({
        email: e.detail.value
      })
    })
  },
  setContacterName(e) {
    this._debounce(() => {
      this.setData({
        contacterName: e.detail.value
      })
    })
  },
  setContacterJobTitle(e) {
    this._debounce(() => {
      this.setData({
        contacterJobTitle: e.detail.value
      })
    })
  },
  setContacterTel(e) {
    this._debounce(() => {
      this.setData({
        contacterTel: e.detail.value
      })
    })
  },

  _debounce(fn) {
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(fn, 300)
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
    const { companyName, websiteUrl, ICP, companyType, websiteType, staffCount, gangCount, tradeCommodity, tradeCount, tradeAmount, name, jobTitle, politicalStatus, tel, email, contacterName, contacterJobTitle, contacterTel, fileList } = this.data

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
    if (!companyType.length) {
      wx.showToast({ title: '请选择企业类型', icon: 'none' })
      return
    }
    if (!websiteType.length) {
      wx.showToast({ title: '请选择网站电子商务类型', icon: 'none' })
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

    const content = { companyName, websiteUrl, ICP, companyType: companyType.join(), websiteType: websiteType.join(), staffCount, gangCount, tradeCommodity, tradeCount, tradeAmount, name, jobTitle, politicalStatus, tel, email, contacterName, contacterJobTitle, contacterTel, licenseImg: licenseImgs.join(), memberCount: this.memberCount || 0, operatorCount: this.operatorCount || 0 }
    registerService.submitApply(
      content, 
      () => {
        wx.showToast({ 
          title: '提交成功', 
          icon: 'none',
          complete: () => {
            wx.navigateBack()
          }
        })
      }, 
      () => {
        wx.showToast({ title: '提交失败，请重试', icon: 'none' })
      },
      this.applyId
    )
  }
})
