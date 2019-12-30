<template>
  <transition name="album-modal__modal" appear>
    <div class="album-modal__modal-mask">
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
          :rightNavDisabled="rightNavDisabled"
          :leftNavDisabled="leftNavDisabled"
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
  private leftNavDisabled = false;
  private rightNavDisabled = false;

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
    this.computeNavStatus();
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

  handleNavigate(direction: number) {
    if (
      !(
        (this.rightNavDisabled && direction === 1) ||
        (this.leftNavDisabled && direction === -1)
      )
    ) {
      this.$emit("navigate", direction);
    }
  }

  computeNavStatus() {
    this.leftNavDisabled = false;
    this.rightNavDisabled = false;
    if (this.currentIndex === 0) {
      this.leftNavDisabled = true;
    }
    if (this.currentIndex === this.albumLength - 1) {
      this.rightNavDisabled = true;
    }
  }
}
</script>
