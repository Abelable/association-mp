import { configure, observable, action } from "mobx-miniprogram";

configure({ enforceActions: "observed" }); // 不允许在动作外部修改状态

export const store = observable({
  curCityIdx: 0,

  seCurCityIdx: action(function (index) {
    this.curCityIdx = index;
  }),
});
