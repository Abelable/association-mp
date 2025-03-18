Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    info: {
      type: Object,
      observer(info) {
        const { start_time, end_time } = info || {};
        const currentTimeStamp = Date.parse(new Date()) / 1000;
        let status;
        if (start_time > currentTimeStamp) {
          status = 0;
        } else if (
          start_time < currentTimeStamp &&
          end_time > currentTimeStamp
        ) {
          status = 1;
        } else {
          status = 2;
        }
        this.setData({ status });
      }
    }
  },

  data: {
    status: 0
  },

  methods: {
    checkActivity() {
      const { id } = this.properties.info;
      const url = `/pages/common/webview/index?url=https://wskt.zjseca.com/index.html&id=${id}#/custom_activity`;
      wx.navigateTo({ url });
    }
  }
});
