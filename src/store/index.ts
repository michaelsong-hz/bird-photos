import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modalIndex: -1,
    albumLength: -1,
    nextModalImage: null,
    modalImageLoaded: false, // TODO: Maybe this could be in local state instead?
    slideshowActive: false,
    showImageMetadata: false,
    imageMetadata: {
      date: "",
      fNumber: "",
      exposureTimeNumerator: "",
      exposureTimeDenominator: "",
      ISO: ""
    }
  },
  mutations: {
    toggleShowImageMetadata(state, payload) {
      state.showImageMetadata = !state.showImageMetadata;
    },
    toggleSlideshowActive(state, payload) {
      state.slideshowActive = !state.slideshowActive;
    },
    setSlideshowActive(state, payload) {
      state.slideshowActive = payload;
    },
    navigateModal(state, payload) {
      state.modalIndex = payload.modalIndex;
      state.nextModalImage = payload.nextModalImage;
      state.modalImageLoaded = false;
      state.imageMetadata = payload.imageMetadata;
    },
    openModal(state, payload) {
      state.modalIndex = payload.modalIndex;
      state.albumLength = payload.albumLength;
      state.nextModalImage = payload.nextModalImage;
      state.modalImageLoaded = false;
      state.slideshowActive = false;
      state.imageMetadata = payload.imageMetadata;
    },
    closeModal(state) {
      state.modalIndex = -1;
      // TODO: Could add other cleanup code here
    },
    modalImageHasLoaded(state) {
      state.modalImageLoaded = true;
    }
  },
  actions: {},
  modules: {}
});
