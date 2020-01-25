<template>
  <div>
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Albums</h1>
      </div>
    </section>

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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AlbumImage from "@/components/AlbumImage.vue";

@Component({
  components: {
    AlbumImage
  }
})
export default class AlbumsList extends Vue {
  albumsToRender = [
    [
      "Featured Album",
      "/albums/featured",
      "https://bird-created.s3.amazonaws.com/images/albums/Featured/A26I8703-2.jpg"
    ],
    [
      "2020 Album",
      "/albums/2020",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2020/A26I1420-1.jpg"
    ],
    [
      "2019 Album",
      "/albums/2019",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/A26I3687.jpg"
    ],
    [
      "2018 Album",
      "/albums/2018",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I1420.jpg"
    ],
    [
      "2017 Album",
      "/albums/2017",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/1d88c86ee4cb1ca85f506153885e7335.jpg"
    ],
    [
      "2016 Album",
      "/albums/2016",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2016/HL2A6053-1.jpg"
    ]
  ];

  handleNavigate(path: string) {
    this.$router.push(path);
  }
}
</script>
