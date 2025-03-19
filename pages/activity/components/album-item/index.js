const cityOptions = [
  { id: 1, name: "杭州" },
  { id: 2, name: "宁波" },
  { id: 3, name: "温州" },
  { id: 4, name: "绍兴" },
  { id: 5, name: "湖州" },
  { id: 6, name: "嘉兴" },
  { id: 7, name: "金华" },
  { id: 8, name: "衢州" },
  { id: 9, name: "台州" },
  { id: 10, name: "丽水" },
  { id: 11, name: "舟山" },
];

Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    info: {
      type: Object,
      observer(info) {
        const { city_id, photo_list } = info || {};
        const cityName = cityOptions.find(item => item.id === +city_id).name
        const photoList = JSON.parse(photo_list)
        this.setData({ cityName, photoList });
      }
    }
  },

  data: {
    cityName: "",
    photoList: []
  },

  methods: {
    checkAlbum() {
      const { id } = this.properties.info;
      const url = `/pages/activity/subpages/album-detail/index?id=${id}`;
      wx.navigateTo({ url });
    }
  }
});
