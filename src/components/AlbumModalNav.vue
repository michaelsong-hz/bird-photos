<template>
  <div class="album-modal-nav">
    <transition
      v-if="showImageNav === true"
      name="album-modal-nav__transition"
      appear
    >
      <div class="album-modal-nav__bar-mask">
        <div class="album-modal-nav__bar-container">
          <div class="album-modal-nav__bar-element">
            <font-awesome-icon
              @click="handleClose"
              :icon="['fas', 'window-close']"
              size="2x"
            />
          </div>
          <div class="album-modal-nav__bar-element">
            <font-awesome-icon
              @click="$store.commit('toggleShowImageMetadata')"
              :icon="['fas', 'info-circle']"
              size="2x"
            />
          </div>
          <div class="album-modal-nav__bar-element">
            <font-awesome-icon
              @click="handleNavigate(1)"
              :icon="['fas', 'arrow-right']"
              size="2x"
            />
          </div>
          <div class="album-modal-nav__bar-element">
            <font-awesome-icon
              @click="handleNavigate(-1)"
              :icon="['fas', 'arrow-left']"
              size="2x"
            />
          </div>
          <div
            class="album-modal-nav__bar-element album-modal-nav__bar-element-start"
          >
            <font-awesome-icon
              v-if="slideshowActive"
              @click="$store.commit('toggleSlideshowActive')"
              :icon="['fas', 'pause']"
              size="2x"
            />
            <font-awesome-icon
              v-else
              @click="$store.commit('toggleSlideshowActive')"
              :icon="['fas', 'play']"
              size="2x"
            />
          </div>
          <div class="album-modal-nav__bar-element">
            <h2>{{ modalIndex + 1 }} / {{ imageData.length }}</h2>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { mapState } from "vuex";
import { IImageInfo } from "../models/IImageInfo";

@Component({
  components: {},
  computed: mapState([
    "modalIndex",
    "imageData",
    "slideshowActive",
    "modalDirectVisit"
  ])
})
export default class AlbumModal extends Vue {
  @Prop() showImageNav!: boolean;

  modalIndex!: number;
  imageData!: IImageInfo[];
  modalDirectVisit!: boolean;

  handleClose() {
    if (!this.modalDirectVisit) {
      // Go back if this isn't the first page visited
      this.$router.back();
    } else {
      // Replace URL with next page if this is the first page visited
      this.$store.commit("setModalDirectVisit", {
        modalDirectVisit: false
      });
      this.$router.replace(`/albums/${this.$route.params.albumName}`);
    }
  }

  handleNavigate(direction: number) {
    this.$store.commit("navigateModal", {
      direction: direction,
      router: this.$router,
      route: this.$route
    });
  }
}
</script>
