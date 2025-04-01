import checkLogin from "../../utils/checkLogin";
import RegisterService from "./utils/registerService";

const registerService = new RegisterService();
const { statusBarHeight } = getApp().globalData;

const categoryOptions = [
  {
    text: "计算机应用类平台",
    value: 1,
    subOptions: [
      { text: "SAAS系统", value: 11 },
      { text: "创新技术", value: 12 },
      { text: "大数据", value: 13 },
      { text: "工业互联网", value: 14 },
      { text: "技术服务", value: 15 },
      { text: "开发工具", value: 16 },
      { text: "行业综合服务", value: 17 },
      { text: "云计算", value: 18 },
      { text: "综合类", value: 19 },
    ],
  },
  {
    text: "网络销售类平台",
    value: 2,
    subOptions: [
      { text: "MCN机构", value: 21 },
      { text: "跨境", value: 22 },
      { text: "农业", value: 23 },
      { text: "商品交易", value: 24 },
      { text: "专业商品", value: 25 },
      { text: "综合类", value: 26 },
    ],
  },
  {
    text: "生活服务类平台",
    value: 3,
    subOptions: [
      { text: "交通出行", value: 31 },
      { text: "教育培训", value: 32 },
      { text: "配送服务", value: 33 },
      { text: "人才服务", value: 34 },
      { text: "生活服务", value: 35 },
      { text: "市场服务", value: 36 },
      { text: "文化旅游", value: 37 },
      { text: "医疗健康", value: 38 },
      { text: "运输物流", value: 39 },
    ],
  },
  {
    text: "社交娱乐类平台",
    value: 4,
    subOptions: [
      { text: "社交", value: 41 },
      { text: "视频直播", value: 42 },
      { text: "综合类", value: 43 },
    ],
  },
  {
    text: "金融服务类平台",
    value: 5,
    subOptions: [
      { text: "消费金融", value: 51 },
      { text: "证券投资", value: 52 },
      { text: "综合类", value: 53 },
    ],
  },
  {
    text: "信息资讯类平台",
    value: 6,
    subOptions: [
      { text: "内容生成", value: 61 },
      { text: "视听资讯", value: 62 },
      { text: "搜索引擎", value: 63 },
      { text: "新闻门户", value: 64 },
    ],
  },
];

Page({
  data: {
    statusBarHeight,
    categoryOptions,
    curCategoryIdx: -1,
    companyName: "",
    companyShortName: "",
    region: [],
    websiteUrl: "",
    ICP: "",
    staffCount: "",
    gangCount: "",
    userCount: "",
    merchantCount: "",
    tradeAmount: "",
    revenue: "",
    taxAmount: "",
    name: "",
    contacterName: "",
    contacterJobTitle: "",
    contacterTel: "",
    licenseImg: "",
    fileList: [],
    logoList: [],
    minePopupVisible: false,
  },

  setCompanyName(e) {
    this.companyName = e.detail.value;
  },

  setCompanyShortName(e) {
    this.companyShortName = e.detail.value;
  },

  bindRegionChange(e) {
    const { value, code } = e.detail;
    this.address = {
      province: value[0],
      city: value[1],
      area: value[2],
      region: [code[2].slice(0, 2), code[2].slice(0, 4), code[2]],
    };
    this.setData({
      region: value,
    });
  },

  setWebsiteUrl(e) {
    this.websiteUrl = e.detail.value;
  },

  setICP(e) {
    this.ICP = e.detail.value;
  },

  setCompanyType(e) {
    this.companyType = Number(e.detail.value);
    const curCategoryIdx = categoryOptions.findIndex(
      (item) => item.value === this.companyType
    );
    this.setData({ curCategoryIdx });
  },

  setCompanySubType(e) {
    this.companySubType = e.detail.value.join();
  },

  setStaffCount(e) {
    this.staffCount = e.detail.value;
  },

  setGangCount(e) {
    this.gangCount = e.detail.value;
  },

  setUserCount(e) {
    this.userCount = e.detail.value;
  },

  setMerchantCount(e) {
    this.merchantCount = e.detail.value;
  },

  setTradeAmount(e) {
    this.tradeAmount = e.detail.value;
  },

  setTaxAmount(e) {
    this.taxAmount = e.detail.value;
  },

  setRevenue(e) {
    this.revenue = e.detail.value;
  },

  setContacterName(e) {
    this.contacterName = e.detail.value;
  },

  setContacterJobTitle(e) {
    this.contacterJobTitle = e.detail.value;
  },

  setContacterTel(e) {
    this.contacterTel = e.detail.value;
  },

  async afterRead(e) {
    const { file } = e.detail;
    const licenseImg = await registerService.uploadImg(file.url);
    this.setData({
      fileList: [...this.data.fileList, { ...file, url: licenseImg }],
    });
  },

  async afterLogoRead(e) {
    await this.initCanvas();
    this.roundRect(0, 0, 64, 64, { width: 8, color: "#00B4E1" });

    const { url } = e.detail.file;
    const { width, height } = await registerService.getImageInfo(url);
    if (width === height) {
      await this.drawImage(url, 4, 4, 56, 56);
    } else if (width > height) {
      const _height = (56 * height) / width;
      const _y = 4 + (56 - _height) / 2;
      await this.drawImage(url, 4, _y, 56, _height);
    } else {
      const _width = (56 * width) / height;
      const _x = 4 + (56 - _width) / 2;
      await this.drawImage(url, _x, 4, _width, 56);
    }

    wx.canvasToTempFilePath(
      {
        canvas: this.canvas,
        success: async (res) => {
          const logoImg = await registerService.uploadImg(res.tempFilePath);
          this.setData({ logoList: [{ ...e.detail.file, url: logoImg }] });
        },
      },
      this
    );
  },

  initCanvas() {
    return new Promise((resolve) => {
      this.createSelectorQuery()
        .select("#logo-canvas")
        .fields({ node: true, size: true })
        .exec((res) => {
          if (res && res.length) {
            this.canvas = res[0].node;
            const renderWidth = res[0].width;
            const renderHeight = res[0].height;
            this.ctx = this.canvas.getContext("2d");
            const dpr = wx.getSystemInfoSync().pixelRatio;
            this.canvas.width = renderWidth * dpr;
            this.canvas.height = renderHeight * dpr;
            this.ctx.scale(dpr, dpr);
            resolve();
          }
        });
    });
  },

  async roundRect(x, y, w, h, border = null) {
    this.ctx.save();

    let { color, width } = border;
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color;

    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + w, y);
    this.ctx.lineTo(x + w, y + h);
    this.ctx.lineTo(x, y + h);
    this.ctx.lineTo(x, y);

    this.ctx.stroke();
    this.ctx.restore();
  },

  drawImage(src, x, y, w, h) {
    return new Promise((resolve) => {
      const image = this.canvas.createImage();
      image.src = src;
      image.onload = () => {
        this.ctx.drawImage(image, x, y, w, h);
        resolve();
      };
    });
  },

  deleteFile(e) {
    const { index } = e.detail;
    let { fileList } = this.data;
    fileList.splice(index, 1);
    this.setData({ fileList });
  },

  deleteLogo() {
    this.setData({ logoList: [] });
  },

  async uploadLicense() {
    const { tempFilePaths } = await registerService.chooseImage(1);
    const licenseImg = await registerService.uploadImg(tempFilePaths[0]);
    this.setData({ licenseImg });
  },

  async submit() {
    checkLogin(() => {
      const {
        companyName,
        companyShortName,
        address,
        websiteUrl,
        ICP,
        companyType,
        companySubType,
        staffCount,
        gangCount,
        userCount,
        merchantCount,
        tradeAmount,
        revenue,
        taxAmount,
        contacterName,
        contacterJobTitle,
        contacterTel,
      } = this;
      const { fileList, logoList, curCategoryIdx } = this.data;

      if (!logoList.length) {
        wx.showToast({ title: "请上传企业logo", icon: "none" });
        return;
      }
      if (!companyName) {
        wx.showToast({ title: "请输入企业名称", icon: "none" });
        return;
      }
      if (!companyShortName) {
        wx.showToast({ title: "请输入企业简称", icon: "none" });
        return;
      }
      if (!address) {
        wx.showToast({ title: "请选择企业所在地区", icon: "none" });
        return;
      }
      if (!companyType) {
        wx.showToast({ title: "请选择企业类型", icon: "none" });
        return;
      }
      if (categoryOptions[curCategoryIdx].subOptions && !companySubType) {
        wx.showToast({ title: "请选择企业二级类型", icon: "none" });
        return;
      }
      if (!tradeAmount) {
        wx.showToast({ title: "请输入上年度GMV", icon: "none" });
        return;
      }
      if (!revenue) {
        wx.showToast({ title: "请输入上年度应收", icon: "none" });
        return;
      }
      if (!taxAmount) {
        wx.showToast({ title: "请输入上年度纳税额", icon: "none" });
        return;
      }
      if (!staffCount) {
        wx.showToast({ title: "请输入员工人数", icon: "none" });
        return;
      }
      if (!gangCount) {
        wx.showToast({ title: "请输入党员人数", icon: "none" });
        return;
      }
      if (!contacterName) {
        wx.showToast({ title: "请输入联系人姓名", icon: "none" });
        return;
      }
      if (!contacterJobTitle) {
        wx.showToast({ title: "请输入联系人职务", icon: "none" });
        return;
      }
      if (!contacterTel || !/^1[3456789]\d{9}$/.test(this.contacterTel)) {
        wx.showToast({ title: "请输入正确的工作联系方式", icon: "none" });
        return;
      }

      if (!fileList.length) {
        wx.showToast({ title: "请上传企业营业执照或副本", icon: "none" });
        return;
      }

      const licenseImgs = [];
      fileList.forEach((item) => {
        licenseImgs.push(item.url);
      });

      const content = {
        companyName,
        companyShortName,
        address: JSON.stringify(address),
        websiteUrl,
        ICP,
        companyType,
        companySubType,
        staffCount,
        gangCount,
        userCount,
        merchantCount,
        tradeAmount,
        revenue,
        taxAmount,
        contacterName,
        contacterJobTitle,
        contacterTel,
        licenseImg: licenseImgs.join(),
        logoImg: logoList.length ? logoList[0].url : "",
      };
      registerService.submitApply(
        content,
        () => {
          wx.showToast({ title: "提交成功", icon: "none" });
          this.resetData();
        },
        () => {
          wx.showToast({ title: "提交失败，请重试", icon: "none" });
        }
      );
    });
  },

  resetData() {
    this.setData({
      companyName: "",
      companyShortName: "",
      websiteUrl: "",
      ICP: "",
      staffCount: "",
      gangCount: "",
      userCount: "",
      merchantCount: "",
      tradeAmount: "",
      revenue: "",
      taxAmount: "",
      contacterName: "",
      contacterJobTitle: "",
      contacterTel: "",
      licenseImg: "",
      fileList: [],
      logoList: [],
      region: [],
    });
  },

  showMinePopup() {
    checkLogin(() => {
      this.setData({
        minePopupVisible: true,
      });
    });
  },

  hideMinePopup() {
    this.setData({
      minePopupVisible: false,
    });
  },
});
