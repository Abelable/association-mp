
Component({ 
  properties: {
    custom: Boolean
  },

  methods: { 
    navigateBack() {
      wx.navigateBack();
    }
  }
})
