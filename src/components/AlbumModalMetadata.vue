<template>
  <div class="album-modal-metadata__container">
    <div v-if="imageMetaData['date'] === ''">
      <p>No image metadata available</p>
    </div>
    <div class="album-modal-metadata__container-contents" v-else>
      <div class="album-modal-metadata__container-element">
        <h4>Date</h4>
        <p>{{ imageMetaData["date"] }}</p>
      </div>
      <div class="album-modal-metadata__container-element">
        <h4>Aperture</h4>
        <p>ƒ/{{ imageMetaData["fNumber"] }}</p>
      </div>
      <div class="album-modal-metadata__container-element">
        <h4>Exposure</h4>
        <p>
          {{ imageMetaData["exposureTimeNumerator"] }}/{{
            imageMetaData["exposureTimeDenominator"]
          }}
        </p>
      </div>
      <div class="album-modal-metadata__container-element">
        <h4>ISO</h4>
        <p>
          {{ imageMetaData["ISO"] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";
import { mapState } from "vuex";

import { IImageInfo, IImageInfoMeta } from "@/models/IImageInfo.ts";

@Component({
  components: {},
  computed: mapState(["modalIndex", "imageData"])
})
export default class AlbumModalMetadata extends Vue {
  modalIndex!: number;
  imageData!: IImageInfo[];

  imageMetaData = {
    date: "",
    fNumber: "",
    exposureTimeNumerator: "",
    exposureTimeDenominator: "",
    ISO: ""
  };

  created() {
    this.setMetadata(this.imageData[this.modalIndex].metadata);
  }

  @Watch("modalIndex")
  onImageChange(val: number) {
    this.setMetadata(this.imageData[val].metadata);
  }

  setMetadata(metadata: IImageInfoMeta) {
    let fNumber = parseInt(metadata.fNum) / parseInt(metadata.fDen);
    fNumber = Math.round(fNumber * 10) / 10;

    this.imageMetaData.date = metadata.date;
    this.imageMetaData.fNumber = fNumber.toFixed(1);
    this.imageMetaData.exposureTimeNumerator = metadata.eNum;
    this.imageMetaData.exposureTimeDenominator = metadata.eDen;
    this.imageMetaData.ISO = metadata.ISO;
  }
}
</script>
