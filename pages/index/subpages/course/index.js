import IndexService from '../../utils/indexService'

Page({
  data: {
    courseList: [],
  },

  async onLoad(options) {
    const { id, title } = options
    wx.setNavigationBarTitle({ title })
    this.id = id
    this.title = title
  },

  onLoad() {
    this.setCourseList(true)
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
