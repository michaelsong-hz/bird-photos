<template>
  <main class="album-view" role="main">
    <AlbumModal
      v-if="modalIndex !== -1"
      @close="handleModalClose"
      @navigate="handleNavigate"
      :imageLoaded="modalImageLoaded"
      :currentIndex="modalIndex"
      :albumLength="imagesToRender[albumToRender].length"
      :disableAnimations="disableModalAnimations"
      :nextImage="nextImageToLoad"
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
        <div class="row" v-if="albumToRender">
          <AlbumImage
            v-for="(imageUrl, index) in imagesToRender[albumToRender]"
            @click.native="handleModalOpen(index)"
            :imageUrl="imageUrl"
            :key="index"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

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
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/Featured/A26I1728.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I8703.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/Featured/A26I3685-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I3685-2.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I1420.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6705.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2020/A26I9555.jpg`
    ],
    2016: [
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2016/HL2A0658.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2016/HL2A1806.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2016/HL2A6053-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2016/HL2A9925.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2016/HL2A9972.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2016/Home .jpg`
    ],
    2017: [
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/1d88c86ee4cb1ca85f506153885e7335.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/997165962c3e3c97a8a13deeb1964b4b.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I0132.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I0213.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I0422.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I0542.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I0567.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I0792.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I0851.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I0929-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I1079.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I1093.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I1109.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I1376.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I1900.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I1916-Recovered.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I1953.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I1954.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I2304 (2).jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I2370.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I2390.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I2405.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I2593.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I2727.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I2728.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I2966.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I3006.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I3076.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I3208.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I3212.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I3223 (2).jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I3355 (3).jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I3540.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I3580.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I3625 (2).jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I3706.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I4005.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I4108.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I4140.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I4149.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I4157.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I4173.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I4562 (2).jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I4673.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I4957.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I4970.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I4971.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5201.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5208.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5226-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5438.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5439.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5441.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5446.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5447.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5448.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5449.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5450.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5451.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5452.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5679.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5864.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5865.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I5869.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I6331 (2).jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I6337 (2).jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I6611.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I6659.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I6705.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I6718.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I6766.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I6788 (2).jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I6792.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I6793.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I7170 (3).jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I7303.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I7314.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I7645.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I8521.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I8702 (2).JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I9479-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/A26I9997.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/Baby.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/HL2A3475 (2).JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/HL2A3475 - Copy.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/HL2A3475.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/HL2A3480.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/HL2A3636.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/HL2A3657.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/HL2A4943.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/HL2A4948.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/HL2A6158.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/HL2A6250.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/IMG_7418.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/MY__1651.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/MY__1790.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2017/MY__2101.JPG`
    ],
    2018: [
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I0245.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I0388-2.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I0390-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I0391-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I0395-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I0407.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I0508-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I0671 (2).jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I0671.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I1420.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I1423.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I1677.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I2270.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I2471.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I2686-2.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I2760-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I2884.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I3094.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I3196.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I4163.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I4388-3.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I4388.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I4423-2.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I4490-1-2.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I4490-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I4503.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I4771.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I4973-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I5429.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I5873-5.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I5981-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I5989.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6440.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6444.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6445.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6544-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6546-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6548-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6551-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6608.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6641.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6642.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6652.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6705.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6873-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6873.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6879-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6965.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6981.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I6994.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I7020.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I7025.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I7189.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I7204.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I7979.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I8084.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I8227-2.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I8245-2.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I8254.JPG`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I8263-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I8669.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I8790.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I8856.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I9503.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I9585-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A26I9647.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A69I1844.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/A69I6016-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/MEI_5269.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/MEI_5271.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/MEI_5888.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/MEI_6476.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/MEI_6486.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/MY__3567.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/MY__3571.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/MY__3818.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/MY__5628.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/MY__5702.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/MY__6092.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2018/MY__6121.jpg`
    ],
    2019: [
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/20190511_CootsP_0612.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/20190511_CootsP_1193.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/20190908_LakingGarden_-368.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/2019tanager1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I1667.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I1729.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I2023-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I2725.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I2899.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I2901.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I3685-2.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I3687.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I7400.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I8264.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I8703.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I8812-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I8847.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I8886-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/A26I9377.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2019/h.jpg`
    ],
    2020: [
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2020/A26I0005.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2020/A26I0009.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2020/A26I0010.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2020/A26I0011.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2020/A26I0014.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2020/A26I1420-1.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2020/A26I1866.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2020/A26I9555.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2020/A26I9901.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2020/MEI_1879.jpg`,
      `${process.env.VUE_APP_IMAGE_HOST}thumbnails/albums/2020/MEI_1893.jpg`
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

    if ("modalIndex" in this.$route.params) {
      this.modalIndex = parseInt(this.$route.params.modalIndex) - 1;
    }
  }

  // Handles required changes when using forward/back buttons to open and close the modal within the Album component as it doesn't re-render due to being the same component.
  @Watch("$route")
  onSameComponentRouteChange(to: any, from: any) {
    // If opening modal (but not during slideshow)
    if ("modalIndex" in to.params && !("modalIndex" in from.params)) {
      this.$store.commit("setSlideshowActive", false);
      this.modalIndex = to.params.modalIndex - 1;
    }
    // If closing modal
    else if ("modalIndex" in from.params && !("modalIndex" in to.params)) {
      this.modalIndex = -1;
      this.modalImageLoaded = false;
    }
  }

  get imageToLoad() {
    return this.imagesToRender[this.albumToRender][this.modalIndex].replace(
      "/thumbnails/",
      "/images/"
    );
  }

  get nextImageToLoad() {
    return this.imagesToRender[this.albumToRender][
      this.calculateIndex(this.modalIndex, 1)
    ].replace("/thumbnails/", "/images/");
  }

  handleModalOpen(modalIndex: number) {
    this.$store.commit("setSlideshowActive", false);
    this.modalIndex = modalIndex;
    this.$router.push(
      `/albums/${this.$route.params.albumName}/slideshow/${modalIndex + 1}`
    );
  }

  handleModalClose() {
    this.modalIndex = -1;
    this.modalImageLoaded = false;
    this.$router.push(`/albums/${this.$route.params.albumName}`);
  }

  handleNavigate(direction: number) {
    // Hack to re-initialize EXIF.js by reloading the modal,
    // otherwise EXIF.js always shows old EXIF data
    this.disableModalAnimations = true;
    this.modalImageLoaded = false;
    let tempModalIndex = this.modalIndex;

    this.modalIndex = -1;
    setTimeout(() => {
      this.modalIndex = this.calculateIndex(tempModalIndex, direction);
    }, 1);
    setTimeout(() => {
      this.disableModalAnimations = false;
      this.$router.replace(
        `/albums/${this.$route.params.albumName}/slideshow/${this.modalIndex +
          1}`
      );
    }, 1);
  }

  // Prevents index error on @albumToRender by returning the proper index if @increment is added to @currentIndex.
  calculateIndex(currentIndex: number, increment: number) {
    if (currentIndex + increment <= -1) {
      return this.imagesToRender[this.albumToRender].length - 1;
    } else if (
      currentIndex + increment >=
      this.imagesToRender[this.albumToRender].length
    ) {
      return 0;
    } else {
      return currentIndex + increment;
    }
  }
}
</script>
