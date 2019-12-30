import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showModalMetadata: false
  },
  mutations: {
    toggleShowModelMetadata(state, payload) {
      state.showModalMetadata = !state.showModalMetadata;
    }
  },
  actions: {},
  modules: {}
});
