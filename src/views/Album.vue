<template>
  <main role="main">
    <AlbumModal
      v-if="modalIndex !== -1"
      @close="
        modalIndex = -1;
        modalImageLoaded = false;
      "
      @navigate="handleNavigate"
      :imageLoaded="modalImageLoaded"
      :currentIndex="modalIndex"
      :albumLength="imagesToRender[albumToRender].length"
    >
      <!-- Add "crossorigin='anonymous'" to solve Chrome CORS error https://stackoverflow.com/a/47359958 -->
      <img
        slot="image"
        id="slot-image"
        :src="imageToLoad"
        @load="modalImageLoaded = true"
        crossorigin="anonymous"
      />
    </AlbumModal>

    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">{{ albumTitle }} Album</h1>
        <p class="lead text-muted">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          venenatis placerat erat eget commodo. Maecenas non mi ipsum. Morbi
          pulvinar egestas dolor, sagittis ultricies ex facilisis at. Donec
          facilisis ligula eget ultricies posuere. Aliquam dignissim, arcu non
          tempor posuere, neque nulla imperdiet lectus, sit amet semper ipsum
          ligula id ipsum. Morbi sagittis erat vitae auctor scelerisque.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas.
        </p>
      </div>
    </section>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row" v-if="albumToRender">
          <AlbumImage
            v-for="(imageUrl, index) in imagesToRender[albumToRender]"
            @click.native="modalIndex = index"
            :imageUrl="imageUrl"
            :key="index"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import AlbumImage from "@/components/AlbumImage.vue";
import AlbumModal from "@/components/AlbumModal.vue";

@Component({
  components: { AlbumImage, AlbumModal }
})
export default class Album extends Vue {
  private albumToRender = "";
  private albumTitle = "";
  private modalIndex: number = -1;
  private modalImageLoaded: boolean = false;

  private imagesToRender: any = {
    eagle: [
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/A26I0755.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/A26I0755.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/A26I0755.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Eagle/20190908_LakingGarden_-368.jpg",
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
      let albumTitle: string = this.$route.params.albumName;
      albumTitle = albumTitle.charAt(0).toUpperCase() + albumTitle.slice(1);
      this.albumTitle = albumTitle;

      document.title = `Dr Song's Portfolio - ${albumTitle} Album`;
    }
  }

  mounted() {
    let exifScript = document.createElement("script");
    exifScript.setAttribute("src", "https://cdn.jsdelivr.net/npm/exif-js");
    document.head.appendChild(exifScript);
  }

  get imageToLoad() {
    return this.imagesToRender[this.albumToRender][this.modalIndex].replace(
      "/thumbnails/",
      "/images/"
    );
  }

  handleNavigate(direction: number) {
    // Hack to re-initialize EXIF.js by reloading the component,
    // otherwise EXIF.js always shows old EXIF data
    this.modalImageLoaded = false;
    let tempModalIndex = this.modalIndex;

    this.modalIndex = -1;
    setTimeout(() => {
      this.modalIndex = tempModalIndex + direction;
    }, 1);
  }
}
</script>
