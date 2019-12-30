<template>
  <transition name="album-image-modal__modal">
    <div class="album-image-modal__modal-mask">
      <div
        class="album-image-modal__modal-container"
        @mouseover="showImageNav = true"
        @mouseleave="showImageNav = false"
      >
        <transition name="album-image-modal__modal" appear>
          <div
            v-if="showImageNav === true"
            class="album-image-modal__modal-nav-mask"
          >
            <div class="album-image-modal__modal-nav-container">
              <div class="album-image-modal__modal-nav-element">
                <font-awesome-icon
                  @click="close"
                  :icon="['fas', 'window-close']"
                  size="2x"
                />
              </div>
              <div class="album-image-modal__modal-nav-element">
                <font-awesome-icon
                  @click="showMetaData = !showMetaData"
                  :icon="['fas', 'info-circle']"
                  size="2x"
                />
              </div>
            </div>
          </div>
        </transition>

        <div class="album-image-modal__modal-image" ref="a">
          <slot name="image" />
        </div>
      </div>
      <transition name="album-image-modal-metadata__wrapper" appear>
        <AlbumImageModalMetadata
          v-if="showMetaData === true"
          :imageMetaData="imageMetaData"
        />
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

import AlbumImageModalMetadata from "@/components/AlbumImageModalMetadata.vue";

declare var EXIF: any;

@Component({
  components: { AlbumImageModalMetadata }
})
export default class AlbumImageModal extends Vue {
  @Prop({ default: false }) imageLoaded!: boolean;
  private showMetaData = true;
  private showImageNav = false;

  imageMetaData: any = {
    date: "",
    time: "",
    exposureTimeDenominator: 0,
    exposureTimeNumerator: 0,
    fNumberDenominator: 0,
    fNumberNumerator: 0
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
      let photoDateTime = EXIF.getTag(displayedImage, "DateTimeOriginal").split(
        " "
      );

      this.imageMetaData = {
        date: photoDateTime[0],
        time: photoDateTime[1],
        exposureTimeNumerator: EXIF.getTag(displayedImage, "ExposureTime")
          .numerator,
        exposureTimeDenominator: EXIF.getTag(displayedImage, "ExposureTime")
          .denominator,
        fNumberNumerator: EXIF.getTag(displayedImage, "FNumber").numerator,
        fNumberDenominator: EXIF.getTag(displayedImage, "FNumber").denominator
      };
    });
  }
}
</script>
