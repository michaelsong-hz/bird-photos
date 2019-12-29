<template>
  <!-- <div class="album-image-modal"> -->
  <transition name="album-image-modal__modal">
    <div class="album-image-modal__modal-mask">
      <div class="album-image-modal__modal-container">
        <span
          class="album-image-modal__modal-close close"
          @click="$emit('close')"
          >&times;</span
        >

        <div class="album-image-modal__modal-image" ref="a">
          <slot name="image" />
        </div>
      </div>
      <div class="album-image-modal__modal-metadata-container">
        <div v-if="imageMetaData['date'] === ''">
          <div
            class="album-image-modal__modal-metadata-container-spinner spinner-border"
            role="status"
            align="center"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <p>Loading Image Metadata</p>
        </div>
        <div
          class="album-image-modal__modal-metadata-container-contents"
          v-else
        >
          <div class="album-image-modal__modal-metadata-element">
            <h4>Date</h4>
            <p>{{ imageMetaData["date"] }}</p>
          </div>
          <div class="album-image-modal__modal-metadata-element">
            <h4>Time</h4>
            <p>{{ imageMetaData["time"] }}</p>
          </div>
          <div class="album-image-modal__modal-metadata-element">
            <h4>Aperture</h4>
            <p>
              ƒ/{{ imageMetaData["fNumberNumerator"] }}.{{
                imageMetaData["fNumberDenominator"]
              }}
            </p>
          </div>
          <div class="album-image-modal__modal-metadata-element">
            <h4>Exposure</h4>
            <p>
              {{ imageMetaData["exposureTimeNumerator"] }}/{{
                imageMetaData["exposureTimeDenominator"]
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <!-- </div> -->
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

declare var EXIF: any;

@Component({
  components: {}
})
export default class AlbumImageModal extends Vue {
  @Prop({ default: false }) imageLoaded!: boolean;
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
