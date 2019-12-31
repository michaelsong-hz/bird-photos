<template>
  <div class="albums">
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Albums</h1>
        <p class="lead text-muted">
          A list of albums for your viewing pleasure.
        </p>
      </div>
    </section>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <AlbumImage
            v-for="(albumInfo, index) in albumsToRender"
            @click.native="handleNavigate(albumInfo[1])"
            :imageUrl="albumInfo[2]"
            :title="albumInfo[0]"
            :key="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AlbumImage from "@/components/AlbumImage.vue";

@Component({
  components: { AlbumImage }
})
export default class Albums extends Vue {
  albumsToRender = [
    [
      "Featured Album",
      "/albums/featured",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Featured/A26I1728.jpg"
    ],
    [
      "Eagle Album",
      "/albums/eagle",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/A26I0755.jpg"
    ],
    [
      "Canada Album",
      "/albums/canada",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Canada/20190908_LakingGarden_-368.jpg"
    ]
  ];

  handleNavigate(path: string) {
    this.$router.push(path);
  }
}
</script>
