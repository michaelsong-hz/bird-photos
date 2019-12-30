<template>
  <div class="col-md-4">
    <div class="mb-4 box-shadow album-image__holder">
      <img
        class="card-img"
        alt="bird image"
        :src="imageUrl"
        @click="showModal = true"
      />
    </div>

    <AlbumImageModal
      v-if="showModal"
      @close="showModal = false"
      :imageLoaded="childImageLoaded"
    >
      <!-- Add "crossorigin='anonymous'" to solve Chrome CORS error https://stackoverflow.com/a/47359958 -->
      <img
        slot="image"
        id="slot-image"
        :src="fullImageUrl"
        @load="childImageLoaded = true"
        crossorigin="anonymous"
      />
    </AlbumImageModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import AlbumImageModal from "@/components/AlbumImageModal.vue";

@Component({
  components: {
    AlbumImageModal
  }
})
export default class AlbumImage extends Vue {
  @Prop() imageUrl!: string;
  fullImageUrl: string = "";
  showModal = false;
  childImageLoaded = false;

  created() {
    // Add "?cacheblock=true" hack to solve Chrome CORS error https://stackoverflow.com/a/50840500
    this.fullImageUrl =
      this.imageUrl.replace("/thumbnails/", "/images/") + "?cacheblock=true";
  }

  mounted() {
    let exifScript = document.createElement("script");
    exifScript.setAttribute("src", "https://cdn.jsdelivr.net/npm/exif-js");
    document.head.appendChild(exifScript);
  }
}
</script>
