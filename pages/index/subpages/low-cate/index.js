import IndexService from "../../utils/indexService";

const indexService = new IndexService();

Page({
  data: {
    menuList: [],
    curMenuIdx: 0,
    subMenuList: [],
    curSubMenuIdx: 0,
    keywords: "",
    lowList: [],
    refresherTriggered: false,
  },

  async onLoad() {
    await this.setMenuList();
    await this.setSubMenuList();
    this.setLowList(true);
  },

  selectMenu(e) {
    const curMenuIdx = Number(e.currentTarget.dataset.index);
    this.setData({ curMenuIdx }, async () => {
      await this.setSubMenuList();
      this.setLowList(true);
    });
  },

  selectSubMenu(e) {
    const curSubMenuIdx = Number(e.currentTarget.dataset.index);
    this.setData({ curSubMenuIdx }, () => {
      this.setLowList(true);
    });
  },

  async setMenuList() {
    const menuList = (await indexService.getLowCategoryList({ page: 1 })) || [];
    this.setData({ menuList });
  },

  async setSubMenuList() {
    const { menuList, curMenuIdx } = this.data;
    const subMenuList =
      (await indexService.getLowCategoryList({
        pid: menuList[curMenuIdx].id,
        page: 1,
      })) || [];
    this.setData({ subMenuList });
  },

  async setLowList(init = false) {
    if (init) this.page = 0;
    const {
      keywords,
      menuList,
      curMenuIdx,
      subMenuList,
      curSubMenuIdx,
      lowList,
    } = this.data;
    const list = await indexService.getLowList({
      keywords,
      category_id: menuList[curMenuIdx].id,
      sub_category_id: subMenuList[curSubMenuIdx].id,
      page: ++this.page,
    });
    this.setData({ lowList: init ? list : [...lowList, ...list] });
  },

  async refresh() {
    this.setData({ refresherTriggered: true });
    await this.setLowList(true);
    this.setData({ refresherTriggered: false });
  },

  loadMore() {
    console.log("loadMore");
    this.setLowList();
  },

  checkDetail(e) {
    const url = `/pages/index/subpages/low/subpages/low-detail/index?id=${e.currentTarget.dataset.id}`;
    wx.navigateTo({ url });
  },
});
