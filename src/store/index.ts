import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showModalMetadata: false,
    slideshowActive: false
  },
  mutations: {
    toggleShowModelMetadata(state, payload) {
      state.showModalMetadata = !state.showModalMetadata;
    },
    toggleSlideshowActive(state, payload) {
      state.slideshowActive = !state.slideshowActive;
    },
    setSlideshowActive(state, payload) {
      state.slideshowActive = payload;
    }
  },
  actions: {},
  modules: {}
});
