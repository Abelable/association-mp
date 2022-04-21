import CourseService from '../../utils/courseService'

Component({
  data: {
    pwd: '',
    isFocus: true,
    errorTips: ''
  },

  properties: {
    courseId: String
  },

  methods: {
    setPwd(e) {
      const pwd = e.detail.value
      const { errorTips, courseId } = this.data
      if (errorTips) this.setData({ errorTips: '' })
      if (pwd.length > 6) return

      this.setData({ pwd })
      if (pwd.length === 6) {
        new CourseService().checkPwd(courseId, pwd, 
          () => this.triggerEvent('pass'),
          err => this.setData({
            errorTips: err.data.data.valid_password[0]
          })
        )
      }
    },

    setFocus() {
      !this.data.isFocus && this.setData({
        isFocus: true
      })
    },

    onFocus() {
      this.setData({
        isFocus: true
      })
    },

    onBlur() {
      this.setData({
        isFocus: false
      })
    },

    hide() {
      this.triggerEvent('hide')
    }
  }
})
