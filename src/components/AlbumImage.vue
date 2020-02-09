<template>
  <div class="col-4 p-lg-3 p-md-2 p-sm-2 p-1">
    <div class="card album-image__holder">
      <img class="card-img" alt="bird image" :src="getImageUrl()" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class AlbumImage extends Vue {
  @Prop() imageUrl!: string;

  getImageUrl() {
    console.log(`${process.env.VUE_APP_IMAGE_HOST}${this.imageUrl}`);
    return `${process.env.VUE_APP_IMAGE_HOST}${this.imageUrl}`;
  }
}
</script>
