import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isPc: true
  },
  mutations: {
    setPc(state, value = true) {
      state.isPc = value;
    }
  },
  actions: {},
  modules: {}
});
