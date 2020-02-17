<template>
  <div>
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Albums</h1>
      </div>
    </section>

    <div class="container">
      <div class="row">
        <AlbumsImage
          v-for="(albumInfo, index) in albumsToRender"
          @click.native="handleNavigate(albumInfo[1])"
          :imageUrl="albumInfo[2]"
          :title="albumInfo[0]"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AlbumsImage from "@/components/AlbumsImage.vue";

@Component({
  components: {
    AlbumsImage
  }
})
export default class AlbumsList extends Vue {
  albumsToRender = [
    [
      "Featured",
      "/albums/featured",
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I8703.jpg`
    ],
    [
      "2020",
      "/albums/2020",
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2020/A26I1420-1.jpg`
    ],
    [
      "2019",
      "/albums/2019",
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I3687.jpg`
    ],
    [
      "2018",
      "/albums/2018",
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I1420.jpg`
    ],
    [
      "2017",
      "/albums/2017",
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/1d88c86ee4cb1ca85f506153885e7335.jpg`
    ],
    [
      "2016",
      "/albums/2016",
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2016/HL2A6053-1.jpg`
    ]
  ];

  async handleNavigate(path: string) {
    // Gets image metadata - filename is path .json without "/albums/"
    let imageData = await fetch(`/imageinfo/${path.substr(8)}.json`)
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
    this.$router.push(path);
  }
}
</script>
