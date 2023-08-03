<template>
  <div class="slider">
    <b-carousel
      id="carousel-1"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
    >
      <b-carousel-slide
        v-for="(imgUrl, index) in slideImages"
        :img-src="imgUrl"
        :key="index"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Slider extends Vue {
  slideImages = [
    `${process.env.VUE_APP_IMAGE_HOST}images/homepage/A26I1728.jpg`,
    `${process.env.VUE_APP_IMAGE_HOST}images/homepage/A26I8703-2.jpg`,
    `${process.env.VUE_APP_IMAGE_HOST}images/homepage/A26I3685-1.jpg`,
    `${process.env.VUE_APP_IMAGE_HOST}images/homepage/A26I3685.jpg`,
    `${process.env.VUE_APP_IMAGE_HOST}images/homepage/A26I7420-1.jpg`,
    `${process.env.VUE_APP_IMAGE_HOST}images/homepage/A26I6705.jpg`,
    `${process.env.VUE_APP_IMAGE_HOST}images/homepage/A26I4582 copy.jpg`,
    `${process.env.VUE_APP_IMAGE_HOST}images/homepage/A26I9555.jpg`
  ];
}
</script>
