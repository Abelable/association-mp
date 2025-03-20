import IndexService from '../../../../utils/indexService'

const indexService = new IndexService()

Page({
  setContent(e) {
    this.content = e.detail.value;
  },

  submit() {
    if (!this.content) {
      wx.showToast({
        title: "请输入您想学习的课程内容",
        icon: "none"
      });
      return;
    }

    indexService.submitCourseApply(
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
})
