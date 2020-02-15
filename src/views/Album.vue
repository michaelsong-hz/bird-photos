<template>
  <main class="album-view" role="main">
    <AlbumModal v-if="modalIndex !== -1" />

    <section class="jumbotron text-center mb-2">
      <div class="container">
        <h1 class="display-5">{{ albumTitle }} Album</h1>
        <!-- <p class="lead text-muted">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          venenatis placerat erat eget commodo. Maecenas non mi ipsum. Morbi
          pulvinar egestas dolor, sagittis ultricies ex facilisis at. Donec
          facilisis ligula eget ultricies posuere. Aliquam dignissim, arcu non
          tempor posuere, neque nulla imperdiet lectus, sit amet semper ipsum
          ligula id ipsum. Morbi sagittis erat vitae auctor scelerisque.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas.
        </p> -->
      </div>
    </section>

    <div class="album pb-5 bg-light">
      <div class="container album-view__container">
        <div class="row" v-if="imageData">
          <AlbumImage
            v-for="(imageDatum, index) in imageData"
            @click.native="handleModalOpen(index)"
            :imageUrl="getImageUrlWrapper(imageDatum)"
            :key="index"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

import AlbumImage from "@/components/AlbumImage.vue";
import AlbumModal from "@/components/AlbumModal.vue";
import { getImageUrl } from "@/utils/Utils";
import { ImageTypes } from "@/utils/Constants";
import { IImageInfo } from "../models/IImageInfo";

@Component({
  components: { AlbumImage, AlbumModal },
  computed: mapState(["modalIndex", "imageData"])
})
export default class Album extends Vue {
  private modalIndex!: number;
  private imageData!: IImageInfo[];

  private albumTitle = "";

  async beforeCreate() {
    // Retrieve image URLs and Metadata from JSON file for this album
    let imageData = await fetch(
      `/imageinfo/${this.$route.params.albumName}.json`
    )
      .then(response => {
        if (response.status !== 200) {
          return;
        }
        return response.json();
      })
      .catch(err => {});
    this.$store.commit("setImageData", {
      imageData: imageData
    });

    // Set the album and page title
    let albumTitle: string = this.$route.params.albumName;
    albumTitle = albumTitle.charAt(0).toUpperCase() + albumTitle.slice(1);
    this.albumTitle = albumTitle;
    document.title = `Dr Song's Portfolio - ${albumTitle} Album`;

    // If directly visiting an image in the album
    if ("modalIndex" in this.$route.params) {
      let modalIndex = parseInt(this.$route.params.modalIndex) - 1;
      this.$store.commit("openModal", {
        modalIndex: modalIndex
      });
      this.$store.commit("setModalDirectVisit", {
        modalDirectVisit: true
      });
    }
  }

  // Handles required changes when using forward/back buttons to open and close the modal
  // within the Album component as it doesn't re-render due to being the same component.
  @Watch("$route")
  onSameComponentRouteChange(to: any, from: any) {
    // If opening modal
    if ("modalIndex" in to.params && !("modalIndex" in from.params)) {
      let modalIndex = to.params.modalIndex - 1;

      this.$store.commit("openModal", {
        modalIndex: modalIndex
      });
    }
    // If closing modal
    else if ("modalIndex" in from.params && !("modalIndex" in to.params)) {
      this.$store.commit("closeModal");
    }
  }

  handleModalOpen(modalIndex: number) {
    this.$router.push(
      `/albums/${this.$route.params.albumName}/slideshow/${modalIndex + 1}`
    );
  }

  getImageUrlWrapper(imageDatum: IImageInfo) {
    return getImageUrl(ImageTypes.Thumbnails, imageDatum.url);
  }
}
</script>
