import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showModalMetadata: false,
    slideshowActive: false,
    modalState: {},
    modalMetadata: {}
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
    },
    setModalState(state, payload) {
      state.modalState = payload;
    },
    setModalMetadata(state, payload) {
      state.modalMetadata = payload;
    }
  },
  actions: {},
  modules: {}
});
