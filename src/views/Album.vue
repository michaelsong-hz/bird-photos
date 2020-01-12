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
      :disableAnimations="disableModalAnimations"
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
  private disableModalAnimations: boolean = false;

  private imagesToRender: any = {
    featured: [
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Featured/A26I1728.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Featured/A26I8703-2.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Featured/A26I3685-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Featured/A26I3685.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Featured/A26I7420-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Featured/A26I6705.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/Featured/A26I9555.jpg"
    ],
    2016: [
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2016/HL2A0658.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2016/HL2A1806.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2016/HL2A6053-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2016/HL2A9925.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2016/HL2A9972.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2016/Home .jpg"
    ],
    2017: [
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/1d88c86ee4cb1ca85f506153885e7335.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/997165962c3e3c97a8a13deeb1964b4b.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I0132.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I0213.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I0422.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I0542.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I0567.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I0792.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I0851.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I0929-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I1079.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I1093.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I1109.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I1376.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I1900.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I1916-Recovered.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I1953.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I1954.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I2304 (2).jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I2370.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I2390.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I2405.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I2593.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I2727.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I2728.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I2966.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I3006.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I3076.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I3208.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I3212.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I3223 (2).jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I3355 (3).jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I3540.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I3580.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I3625 (2).jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I3706.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I4005.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I4108.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I4140.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I4149.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I4157.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I4173.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I4562 (2).jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I4673.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I4957.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I4970.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I4971.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5201.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5208.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5226-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5438.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5439.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5441.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5446.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5447.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5448.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5449.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5450.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5451.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5452.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5679.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5864.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5865.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I5869.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I6331 (2).jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I6337 (2).jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I6611.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I6659.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I6705.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I6718.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I6766.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I6788 (2).jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I6792.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I6793.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I7170 (3).jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I7303.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I7314.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I7645.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I8521.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I8702 (2).JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I9479-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/A26I9997.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/Baby.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/HL2A3475 (2).JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/HL2A3475 - Copy.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/HL2A3475.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/HL2A3480.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/HL2A3636.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/HL2A3657.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/HL2A4943.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/HL2A4948.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/HL2A6158.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/HL2A6250.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/IMG_7418.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/MY__1651.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/MY__1790.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2017/MY__2101.JPG"
    ],
    2018: [
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I0245.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I0388-2.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I0390-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I0391-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I0395-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I0407.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I0508-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I0671 (2).jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I0671.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I1420.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I1423.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I1677.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I2270.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I2471.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I2686-2.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I2760-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I2884.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I3094.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I3196.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I4163.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I4388-3.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I4388.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I4423-2.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I4490-1-2.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I4490-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I4503.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I4771.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I4973-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I5429.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I5873-5.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I5981-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I5989.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6440.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6444.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6445.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6544-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6546-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6548-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6551-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6608.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6641.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6642.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6652.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6705.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6873-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6873.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6879-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6965.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6981.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I6994.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I7020.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I7025.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I7189.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I7204.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I7979.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I8084.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I8227-2.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I8245-2.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I8254.JPG",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I8263-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I8669.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I8790.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I8856.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I9503.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I9585-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A26I9647.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A69I1844.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/A69I6016-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/MEI_5269.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/MEI_5271.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/MEI_5888.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/MEI_6476.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/MEI_6486.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/MY__3567.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/MY__3571.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/MY__3818.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/MY__5628.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/MY__5702.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/MY__6092.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2018/MY__6121.jpg"
    ],
    2019: [
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/20190511_CootsP_0612.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/20190511_CootsP_1193.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/20190908_LakingGarden_-368.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/2019tanager1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/A26I1667.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/A26I1729.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/A26I2023-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/A26I2725.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/A26I2899.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/A26I2901.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/A26I3685-2.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/A26I3687.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/A26I7400.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/A26I8264.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/A26I8703.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/A26I8812-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/A26I8847.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/A26I8886-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/A26I9377.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2019/h.jpg"
    ],
    2020: [
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2020/A26I0005.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2020/A26I0009.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2020/A26I0010.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2020/A26I0011.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2020/A26I0014.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2020/A26I1420-1.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2020/A26I1866.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2020/A26I9555.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2020/A26I9901.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2020/MEI_1879.jpg",
      "https://bird-created.s3.amazonaws.com/thumbnails/albums/2020/MEI_1893.jpg"
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
    this.disableModalAnimations = true;
    this.modalImageLoaded = false;
    let tempModalIndex = this.modalIndex;

    this.modalIndex = -1;
    setTimeout(() => {
      this.modalIndex = tempModalIndex + direction;
    }, 1);
    setTimeout(() => {
      this.disableModalAnimations = false;
    }, 1);
  }
}
</script>
