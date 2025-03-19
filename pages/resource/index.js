import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { store } from "../../store/index";
import * as echarts from "../../components/ec-canvas/echarts";
import geoJson from "./utils/mapData";
import ResourceService from "./utils/resourceService";

const resourceService = new ResourceService();
const { statusBarHeight } = getApp().globalData;

const cityOptions = [
  { id: 1, name: "杭州市" },
  { id: 2, name: "宁波市" },
  { id: 3, name: "温州市" },
  { id: 4, name: "绍兴市" },
  { id: 5, name: "湖州市" },
  { id: 6, name: "嘉兴市" },
  { id: 7, name: "金华市" },
  { id: 8, name: "衢州市" },
  { id: 9, name: "台州市" },
  { id: 10, name: "丽水市" },
  { id: 11, name: "舟山市" }
];
let mapIndustryList = [];

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(chart);

  echarts.registerMap("zhejiang", geoJson); // 修改为浙江省

  // 计算蓝色渐变色（根据 value 值）
  function getBlueGradient(value) {
    const minColor = [200, 230, 255]; // 浅蓝色（RGB）
    const maxColor = [0, 80, 180]; // 深蓝色（RGB）

    const minValue = 20; // 最低值
    const maxValue = 100; // 最高值

    const ratio = (value - minValue) / (maxValue - minValue);
    const r = Math.round(minColor[0] + ratio * (maxColor[0] - minColor[0]));
    const g = Math.round(minColor[1] + ratio * (maxColor[1] - minColor[1]));
    const b = Math.round(minColor[2] + ratio * (maxColor[2] - minColor[2]));

    return `rgb(${r}, ${g}, ${b})`;
  }

  const data = [
    { name: "杭州市", value: 100 },
    { name: "宁波市", value: 80 },
    { name: "温州市", value: 60 },
    { name: "嘉兴市", value: 40 },
    { name: "湖州市", value: 50 },
    { name: "绍兴市", value: 30 },
    { name: "金华市", value: 20 },
    { name: "衢州市", value: 25 },
    { name: "舟山市", value: 35 },
    { name: "台州市", value: 45 },
    { name: "丽水市", value: 55 }
  ];

  const selectedColor = "#FFD700"; // 统一选中颜色（黄色）

  // 生成带颜色的数据，并设置杭州市默认选中
  const coloredData = data.map(item => ({
    ...item,
    itemStyle: {
      areaColor:
        item.name === "杭州市" ? selectedColor : getBlueGradient(item.value)
    },
    selected: item.name === "杭州市" // 默认选中杭州市
  }));

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}",
      triggerOn: "none" // 禁用鼠标悬浮时的数据弹窗
    },

    series: [
      {
        type: "map",
        mapType: "zhejiang", // 修改地图类型为浙江
        selectedMode: "single", // 只能选中一个城市，默认为单选
        label: {
          normal: {
            show: true
          },
          emphasis: {
            textStyle: {
              color: "#fff"
            }
          }
        },
        itemStyle: {
          normal: {
            borderColor: "#389BB7",
            areaColor: "#eee" // 默认背景色（避免黑色问题）
          },
          emphasis: {
            areaColor: selectedColor, // 选中后变成黄色
            borderWidth: 2
          }
        },
        animation: false,
        data: coloredData
      }
    ]
  };

  chart.setOption(option);

  chart.on("click", function (params) {
    // console.log("chart_params", params.name);

    const curCityIdx = mapIndustryList.findIndex(
      item => item.city_name === params.name
    );
    store.seCurCityIdx(curCityIdx);

    // 更新选中状态，确保点击后变黄
    coloredData.forEach(item => {
      item.itemStyle.areaColor =
        item.name === params.name ? selectedColor : getBlueGradient(item.value);
      item.selected = item.name === params.name;
    });

    chart.setOption({ series: [{ data: coloredData }] });
  });

  return chart;
}

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ["curCityIdx"]
  },

  data: {
    statusBarHeight,
    curMenuIdx: 0,
    keywords: "",
    subMenuList: [],
    curSubMenuIdx: 0,
    categoryPickerModalVisible: false,
    enterpriseList: [],
    enterpriseListFinished: false,
    ec: {
      onInit: initChart
    },
    industryList: []
  },

  methods: {
    async onLoad() {
      await this.setSubMenuList();
      this.setEnterpriseList(true);
      this.setIndustryList();
    },

    setKeywords(e) {
      this.setData({
        keywords: e.detail.value
      });
    },

    search() {
      const { keywords } = this.data;
      if (!keywords) {
        return;
      }
      this.setEnterpriseList(true);
    },

    cancelSearch() {
      this.setData({
        keywords: ""
      });
      this.setEnterpriseList(true);
    },

    async setSubMenuList() {
      const list = await resourceService.getEnterpriseCategoryList();
      this.setData({ subMenuList: [{ id: 0, name: "全部" }, ...list] });
    },

    async setEnterpriseList(init = false) {
      if (init) {
        this.page = 0;
        this.setData({ enterpriseListFinished: false });
      }
      const { subMenuList, curSubMenuIdx, keywords, enterpriseList } =
        this.data;
      const list = await resourceService.getEnterpriseList({
        category_id: subMenuList[curSubMenuIdx].id,
        company_name: keywords,
        page: ++this.page
      });
      this.setData({
        enterpriseList: init ? list : [...enterpriseList, ...list]
      });
      if (!list.length) {
        this.setData({ enterpriseListFinished: true });
      }
    },

    async setIndustryList() {
      const industryList = await resourceService.getIndustryList();
      mapIndustryList = industryList.map(item => ({
        ...item,
        city_name: cityOptions.find(_item => _item.id === +item.city_id).name
      }));
      this.setData({
        industryList: mapIndustryList
      });
    },

    selectMenu(e) {
      const curMenuIdx = e.currentTarget.dataset.index;
      this.setData({ curMenuIdx });
    },

    selectSubMenu(e) {
      const curSubMenuIdx = e.currentTarget.dataset.index;
      this.setData({ curSubMenuIdx });
      this.setEnterpriseList(true);
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

    async onPullDownRefresh() {
      if (this.data.curMenuIdx === 0) {
        await this.setSubMenuList();
        this.setEnterpriseList(true);
      }
      wx.stopPullDownRefresh();
    },

    onReachBottom() {
      if (this.data.curMenuIdx === 0) {
        this.setEnterpriseList();
      }
    },

    checkEnterpriseDetail(e) {
      const { id } = e.currentTarget.dataset;
      const url = `./subpages/enterprise-detail/index?id=${id}`;
      wx.navigateTo({ url });
    }
  }
});
