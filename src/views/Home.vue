<template>
  <div>
    <div class="container">
      <Slider />
    </div>
    <AlbumsList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Slider from "@/components/Slider.vue";
import AlbumsList from "@/components/AlbumsList.vue";

@Component({
  components: { Slider, AlbumsList }
})
export default class Home extends Vue {}
</script>
