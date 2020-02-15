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
            :src="getImageUrlWrapper()"
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
import { mapState, mapGetters } from "vuex";

import AlbumModalNav from "@/components/AlbumModalNav.vue";
import AlbumModalMetadata from "@/components/AlbumModalMetadata.vue";
import { getImageUrl } from "@/utils/Utils";
import { ImageTypes } from "@/utils/Constants";
import { IImageInfo } from "../models/IImageInfo";

import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

@Component({
  components: { AlbumModalNav, AlbumModalMetadata },
  computed: {
    ...mapState([
      "modalIndex",
      "modalImageLoaded",
      "slideshowActive",
      "showImageMetadata",
      "imageData"
    ]),
    ...mapGetters(["nextModalImage"])
  }
})
export default class AlbumModal extends Vue {
  private modalIndex!: number;
  private modalImageLoaded!: boolean;
  private slideshowActive!: boolean;
  private showImageMetadata!: boolean;
  private imageData!: IImageInfo[];
  private nextModalImage!: string;

  private showImageNav = false;
  private showImageNavTimeout!: number;
  private slideshowTimeout!: number;

  mounted() {
    if (!this.slideshowActive) {
      this.handleShowImageNav();
    }

    // Disable page scrolling except for in the modal
    let albumModal = document.querySelector("#album-modal");
    if (albumModal) {
      disableBodyScroll(albumModal);
    }

    window.addEventListener("keydown", this.handleKeyboardNavigate);
  }

  beforeDestroy() {
    clearTimeout(this.slideshowTimeout);
    clearAllBodyScrollLocks();
    window.removeEventListener("keydown", this.handleKeyboardNavigate);
  }

  getImageUrlWrapper() {
    return getImageUrl(ImageTypes.Images, this.imageData[this.modalIndex].url);
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
        nextImg.src = this.nextModalImage;
      }, 800);
    }
  }

  handleNavigate(direction: number) {
    this.$store.commit("navigateModal", {
      direction: direction,
      router: this.$router,
      route: this.$route
    });
  }

  handleKeyboardNavigate(e: any) {
    var key = e.which || e.keyCode;
    if (key === 37) {
      this.handleNavigate(-1);
    } else if (key === 39) {
      this.handleNavigate(1);
    }
  }

  handleSwipe(direction: any) {
    if (direction.direction === 4) {
      this.handleNavigate(-1);
    } else if (direction.direction === 2) {
      this.handleNavigate(1);
    }
  }

  // When the slideshow is started or stopped
  @Watch("slideshowActive")
  onSlideshowActiveChange(val: boolean, oldVal: boolean) {
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
}
</script>
