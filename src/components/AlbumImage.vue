<template>
  <div class="col-md-4">
    <div class="mb-4 box-shadow album-image">
      <div class="text-nowrap">
        <h3 v-if="title">{{ title }}</h3>
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
export default class AlbumImage extends Vue {
  @Prop() imageUrl!: string;
  @Prop() title!: string;
}
</script>
