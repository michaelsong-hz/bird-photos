<template>
  <transition name="album-modal__modal" appear>
    <div class="album-modal__modal-mask" v-hammer:swipe="handleSwipe">
      <div
        class="album-modal__modal-container"
        @mouseover="showImageNav = true"
        @mouseleave="showImageNav = false"
      >
        <AlbumModalNav
          :showImageNav="showImageNav"
          @close="$emit('close')"
          @toggleShowMetadata="showMetaData = !showMetaData"
          @navigate="handleNavigate"
          :albumLength="albumLength"
          :currentIndex="currentIndex"
        />

        <div class="album-modal__modal-image" ref="a">
          <slot name="image" />
        </div>
      </div>
      <transition
        :name="disableAnimations ? '' : 'album-modal-metadata__wrapper'"
        appear
      >
        <AlbumModalMetadata
          v-if="showModalMetadata === true"
          :imageMetaData="imageMetaData"
        />
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

declare var EXIF: any;

@Component({
  components: { AlbumModalNav, AlbumModalMetadata },
  computed: mapState(["showModalMetadata"])
})
export default class AlbumModal extends Vue {
  @Prop({ default: false }) imageLoaded!: boolean;
  @Prop({ default: false }) disableTransitions!: boolean;
  @Prop({ default: false }) disableAnimations!: boolean;
  @Prop() albumLength!: number;
  @Prop() currentIndex!: number;

  private showMetaData = false;
  private showImageNav = false;

  imageMetaData: any = {
    date: "",
    exposureTimeDenominator: 0,
    exposureTimeNumerator: 0,
    fNumber: "0.0",
    ISO: 0
  };

  close() {
    this.$emit("close");
  }

  mounted() {
    try {
      // Gets image metadata for already cached images
      this.getImageMetadata();
      // eslint-disable-next-line no-empty
    } catch (error) {}

    // Backup to try getting metadata again if empty as EXIF lib is unreliable
    setTimeout(() => {
      if (this.imageMetaData["date"] === "") {
        try {
          // Gets image metadata for already cached images
          this.getImageMetadata();
          // eslint-disable-next-line no-empty
        } catch (error) {}
      }
    }, 2000);
  }

  @Watch("imageLoaded")
  onImageLoadChange(val: boolean, oldVal: boolean) {
    // Waits for image to finish loading before getting image metadata
    if (val === true) {
      this.getImageMetadata();
    }
  }

  getImageMetadata() {
    var displayedImage = document.getElementById("slot-image");
    EXIF.getData(displayedImage, () => {
      let date = EXIF.getTag(displayedImage, "DateTimeOriginal").split(" ")[0];
      date = date.replace(/:/g, "/");

      let fNumber =
        EXIF.getTag(displayedImage, "FNumber").numerator /
        EXIF.getTag(displayedImage, "FNumber").denominator;
      fNumber = Math.round(fNumber * 10) / 10;

      this.imageMetaData = {
        date: date,
        exposureTimeNumerator: EXIF.getTag(displayedImage, "ExposureTime")
          .numerator,
        exposureTimeDenominator: EXIF.getTag(displayedImage, "ExposureTime")
          .denominator,
        fNumber: fNumber.toFixed(1),
        ISO: EXIF.getTag(displayedImage, "ISOSpeedRatings")
      };
    });
  }

  handleNavigate(direction: number) {
    this.$emit("navigate", direction);
  }

  handleSwipe(direction: any) {
    if (direction.direction === 4) {
      this.handleNavigate(-1);
    } else if (direction.direction === 2) {
      this.handleNavigate(1);
    }
  }
}
</script>
