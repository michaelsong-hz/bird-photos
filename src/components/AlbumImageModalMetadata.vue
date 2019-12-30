<template>
  <div class="album-image-modal-metadata__container">
    <div v-if="imageMetaData['date'] === ''">
      <div
        class="album-image-modal-metadata__container-spinner spinner-grow"
        role="status"
        align="center"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <p>Loading Metadata</p>
    </div>
    <div class="album-image-modal-metadata__container-contents" v-else>
      <div class="album-image-modal-metadata__container-element">
        <h4>Date</h4>
        <p>{{ imageMetaData["date"] }}</p>
      </div>
      <div class="album-image-modal-metadata__container-element">
        <h4>Time</h4>
        <p>{{ imageMetaData["time"] }}</p>
      </div>
      <div class="album-image-modal-metadata__container-element">
        <h4>Aperture</h4>
        <p>
          ƒ/{{ imageMetaData["fNumberNumerator"] }}.{{
            imageMetaData["fNumberDenominator"]
          }}
        </p>
      </div>
      <div class="album-image-modal-metadata__container-element">
        <h4>Exposure</h4>
        <p>
          {{ imageMetaData["exposureTimeNumerator"] }}/{{
            imageMetaData["exposureTimeDenominator"]
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class AlbumImageModalMetadata extends Vue {
  @Prop() imageMetaData!: object;
}
</script>
