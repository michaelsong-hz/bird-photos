<template>
  <div class="about">
    <h1>Albums</h1>
    <ul>
      <li><a href="/albums/eagle">Eagle Album</a></li>
      <li><a href="/albums/canada">Canada Album</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Album extends Vue {}
</script>
