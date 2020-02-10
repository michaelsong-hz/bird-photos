<template>
  <transition name="album-modal__modal" appear>
    <div
      class="album-modal__modal-mask"
      id="album-modal"
      v-hammer:swipe="handleSwipe"
    >
      <div
        class="album-modal__modal-container"
        @mousedown="handleShowImageNav"
        @mousemove="handleShowImageNav"
        @mouseleave="showImageNav = false"
      >
        <AlbumModalNav :showImageNav="showImageNav" />

        <div class="album-modal__modal-image" ref="a">
          <img
            slot="image"
            id="slot-image"
            :src="imageToLoad"
            @load="$store.commit('modalImageHasLoaded')"
          />
        </div>
      </div>
      <transition name="album-modal-metadata__wrapper" appear>
        <AlbumModalMetadata v-if="showImageMetadata === true" />
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { mapState } from "vuex";

import AlbumModalNav from "@/components/AlbumModalNav.vue";
import AlbumModalMetadata from "@/components/AlbumModalMetadata.vue";

import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

@Component({
  components: { AlbumModalNav, AlbumModalMetadata },
  computed: mapState([
    "modalIndex",
    "albumLength",
    "nextModalImage",
    "modalImageLoaded",
    "slideshowActive",
    "showImageMetadata"
  ])
})
export default class AlbumModal extends Vue {
  @Prop() imageToLoad!: string;

  private modalIndex!: number;
  private albumLength!: number;
  private nextModalImage!: string;
  private modalImageLoaded!: boolean;
  private slideshowActive!: boolean;
  private showImageMetadata!: boolean;

  private showMetaData = false;
  private showImageNav = false;
  private showImageNavTimeout!: number;
  private slideshowTimeout!: number;

  imageMetaData: any = {
    date: "",
    exposureTimeDenominator: 0,
    exposureTimeNumerator: 0,
    fNumber: "0.0",
    ISO: 0
  };

  mounted() {
    if (!this.slideshowActive) {
      this.handleShowImageNav();
    }

    // Disable page scrolling except for in the modal
    let albumModal = document.querySelector("#album-modal");
    if (albumModal) {
      disableBodyScroll(albumModal);
    }
  }

  beforeDestroy() {
    clearAllBodyScrollLocks();
  }

  handleShowImageNav() {
    this.showImageNav = true;
    if (this.showImageNavTimeout) {
      clearTimeout(this.showImageNavTimeout);
    }
    this.showImageNavTimeout = setTimeout(() => {
      this.showImageNav = false;
    }, 3000);
  }

  @Watch("modalImageLoaded")
  onImageLoadChange(val: boolean, oldVal: boolean) {
    // Waits for image to finish loading before pre-loading the next image and executing slideshow timeout
    if (val === true) {
      if (this.slideshowActive) {
        this.setSlideshowTimeout();
      }

      // Preload the next image
      setTimeout(() => {
        let nextImg = new Image();
        nextImg.crossOrigin = "anonymous";
        nextImg.src = this.nextModalImage;
      }, 800);
    }
  }

  handleNavigate(direction: number) {
    this.$router.replace(
      `/albums/${this.$route.params.albumName}/slideshow/${this.calculateIndex(
        this.modalIndex,
        direction
      ) + 1}`
    );
  }

  handleSwipe(direction: any) {
    if (direction.direction === 4) {
      this.handleNavigate(-1);
    } else if (direction.direction === 2) {
      this.handleNavigate(1);
    }
  }

  @Watch("slideshowActive")
  onSlideshowChange(val: boolean, oldVal: boolean) {
    // TODO: I think this needs to be deleted
    if (val === true) {
      this.setSlideshowTimeout();
    } else {
      if (this.slideshowTimeout) {
        clearTimeout(this.slideshowTimeout);
      }
    }
  }

  setSlideshowTimeout() {
    this.slideshowTimeout = setTimeout(() => {
      this.handleNavigate(1);
    }, 5000);
  }

  // TODO: This is the same function as in Album.vue
  calculateIndex(currentIndex: number, increment: number) {
    if (currentIndex + increment <= -1) {
      return this.albumLength - 1;
    } else if (currentIndex + increment >= this.albumLength) {
      return 0;
    } else {
      return currentIndex + increment;
    }
  }
}
</script>
