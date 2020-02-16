import Vue from "vue";
import Vuex from "vuex";

import { ImageTypes } from "@/utils/Constants";
import { calculateIndex, getImageUrl } from "@/utils/Utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modalIndex: -1,
    modalImageLoaded: false, // TODO: Maybe this could be in local state instead?
    slideshowActive: false,
    showImageMetadata: false,
    imageData: [],
    modalDirectVisit: false
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
      const router = payload.router;
      let modalIndex = calculateIndex(
        state.modalIndex,
        payload.direction,
        state.imageData.length
      );
      state.modalIndex = modalIndex;
      router.replace(
        `/albums/${payload.route.params.albumName}/slideshow/${modalIndex + 1}`
      );
      state.modalImageLoaded = false;
    },
    openModal(state, payload) {
      state.modalIndex = payload.modalIndex;
      state.modalImageLoaded = false;
      state.slideshowActive = false;
    },
    closeModal(state) {
      state.modalIndex = -1;
      state.modalImageLoaded = false;
      state.slideshowActive = false;
    },
    modalImageHasLoaded(state) {
      state.modalImageLoaded = true;
    },
    setImageData(state, payload) {
      state.imageData = payload.imageData;
    },
    setModalDirectVisit(state, payload) {
      state.modalDirectVisit = payload.modalDirectVisit;
    }
  },
  getters: {
    nextModalImage: (state: any) => {
      return getImageUrl(
        ImageTypes.Images,
        state.imageData[
          calculateIndex(state.modalIndex, 1, state.imageData.length)
        ].url
      );
    }
  },
  actions: {},
  modules: {}
});
