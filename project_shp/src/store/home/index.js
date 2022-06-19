import { reqCateList } from "@/api";
const state = {
  // state的默认初始值 类型应该与接口返回值一致
  cateList: [],
};
const mutations = {
  CATELIST(state, catelist) {
    state.cateList = catelist;
  },
};

const actions = {
  async cateList({ commit }) {
    let res = await reqCateList();
    commit("CATELIST", res.data);
    // console.log(res);
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
