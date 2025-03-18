import ResourceService from "../../utils/resourceService";

const resourceService = new ResourceService();

Page({
  onLoad({ id }) {
    this.id = id;
  },

  setName(e) {
    this.name = e.detail.value;
  },

  setMobile(e) {
    this.mobile = e.detail.value;
  },

  setCompanyName(e) {
    this.companyName = e.detail.value;
  },

  setContent(e) {
    this.content = e.detail.value;
  },

  submit() {
    if (!this.name) {
      wx.showToast({
        title: "请输入您的姓名",
        icon: "none"
      });
      return;
    }
    if (!this.mobile) {
      wx.showToast({
        title: "请输入您的手机号",
        icon: "none"
      });
      return;
    }
    if (!this.companyName) {
      wx.showToast({
        title: "请输入您的单位名称",
        icon: "none"
      });
      return;
    }
    if (!this.content) {
      wx.showToast({
        title: "请输入您想咨询的内容",
        icon: "none"
      });
      return;
    }

    resourceService.submitConsulting(
      this.id,
      this.name,
      this.mobile,
      this.companyName,
      this.content,
      () => {
        wx.showToast({
          title: "提交成功",
          icon: "none"
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 2000);
      }
    );
  }
});
