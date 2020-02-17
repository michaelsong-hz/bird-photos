<template>
  <!-- <div class="col-md-4"> -->
  <div class="col-4 p-lg-3 p-md-2 p-sm-2 p-1">
    <div class="card album-image">
      <div v-if="title" class="card-header album-image__header">
        <h3 class="mb-0">{{ title }}</h3>
      </div>
      <div class="album-image__holder">
        <img class="card-img" alt="bird image" :src="imageUrl" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class AlbumsImage extends Vue {
  @Prop() imageUrl!: string;
  @Prop() title!: string;
}
</script>
