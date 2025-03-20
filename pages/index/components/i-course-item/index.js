import { formatNumber } from "../../../../utils/util";

Component({
  properties: {
    item: {
      type: Object,
      observer(info) {
        const { duration, is_try, try_time } = info || {};

        const minute = formatNumber(Math.floor(duration / 60));
        const second = formatNumber(duration % 60);
        this.setData({
          duration: `${minute}:${second}`
        });

        if (is_try == 1 && duration - try_time <= 0) {
          this.setData({ isFinished: true });
        }
      }
    }
  },

  data: {
    duration: "",
    isFinished: false,
    courseVisible: false
  },

  lifetimes: {
    attached() {
      const { envVersion } = wx.getAccountInfoSync().miniProgram || {};
      if (envVersion === "release") {
        this.setData({ courseVisible: true });
      }
    }
  },

  methods: {
    navTo() {
      wx.navigateTo({
        url: `/pages/index/subpages/course/subpages/course-detail/index?id=${this.properties.item.id}`
      });
    }
  }
});
