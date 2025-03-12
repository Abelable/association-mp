import IndexService from '../../utils/indexService'

Page({
  data: {
    subMenuList: [
      "推荐",
      "培训",
      "助农",
      "党建",
      "AI",
      "制造业",
      "机械",
      "汽车"
    ],
    curSubMenuIdx: 0,
    categoryPickerModalVisible: false,
    courseList: [],
  },

  async onLoad(options) {
    const { id, title } = options
    wx.setNavigationBarTitle({ title })
    this.id = id
    this.title = title

    this.setCourseList(true)
  },

  selectSubMenu(e) {
    const curSubMenuIdx = e.currentTarget.dataset.index;
    this.setData({ curSubMenuIdx });
  },

  showCategoryPickerModal() {
    this.setData({ categoryPickerModalVisible: true });
  },

  confirmCategoryPick(e) {
    const curSubMenuIdx = e.detail;
    this.setData({ curSubMenuIdx, categoryPickerModalVisible: false });
  },

  hideCategoryPickerModal() {
    this.setData({ categoryPickerModalVisible: false });
  },
  
  onPullDownRefresh() {
    this.setCourseList(true)
    wx.stopPullDownRefresh() 
  },

  onReachBottom() {
    this.setCourseList()
  },

  async setCourseList(init= false) {
    if (init) this.page = 0
    const list = await new IndexService().getCourseList(++this.page) || []
    this.setData({
      courseList: init ? list : [...this.data.courseList, ...list]
    })
  }
})
