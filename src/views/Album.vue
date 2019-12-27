<template>
  <main role="main">
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Album example</h1>
        <p class="lead text-muted">
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don't simply skip over it entirely.
        </p>
        <p>
          <a href="#" class="btn btn-primary my-2">Main call to action</a>
          <a href="#" class="btn btn-secondary my-2">Secondary action</a>
        </p>
      </div>
    </section>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row" v-if="albumToRender">
          <AlbumImage
            v-for="(image_url, index) in someList[albumToRender]"
            :image_url="image_url"
            :key="index"
          />
          <!-- Card(v-for="(card, idx) in viewOptions" :cardProps="card" :key="idx") -->
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import AlbumImage from "@/components/AlbumImage.vue";

@Component({
  components: { AlbumImage }
})
export default class Album extends Vue {
  private albumToRender = "";
  private someList = {
    eagle: [
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/A26I0755.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/A26I0755.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/A26I0755.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/A26I0755.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/A26I0755.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/A26I0755.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/A26I0755.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/A26I0755.jpg"
    ],
    canada: [
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/20190908_LakingGarden_-368.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/20190908_LakingGarden_-368.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/20190908_LakingGarden_-368.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/20190908_LakingGarden_-368.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/20190908_LakingGarden_-368.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/20190908_LakingGarden_-368.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/20190908_LakingGarden_-368.jpg"
    ]
  };

  created() {
    if ("albumName" in this.$route.params) {
      this.albumToRender = this.$route.params.albumName;
      // console.log(this.albumToRender);
    }
  }
}
</script>
