<template>
  <div>
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
        img-src="https://bird-created.s3.amazonaws.com/images/homepage/A26I1728.jpg"
      ></b-carousel-slide>

      <b-carousel-slide
        img-src="https://bird-created.s3.amazonaws.com/images/homepage/A26I8703-2.jpg"
      ></b-carousel-slide>

      <b-carousel-slide
        img-src="https://bird-created.s3.amazonaws.com/images/homepage/A26I3685-1.jpg"
      ></b-carousel-slide>

      <b-carousel-slide
        img-src="https://bird-created.s3.amazonaws.com/images/homepage/A26I2810.jpg"
      ></b-carousel-slide>

      <b-carousel-slide
        img-src="https://bird-created.s3.amazonaws.com/images/homepage/A26I3685.jpg"
      ></b-carousel-slide>

      <b-carousel-slide
        img-src="https://bird-created.s3.amazonaws.com/images/homepage/A26I7420-1.jpg"
      ></b-carousel-slide>

      <!-- <b-carousel-slide
        img-src="https://bird-created.s3.amazonaws.com/images/homepage/20190908_LakingGarden_-368.jpg"
      />

      <b-carousel-slide
        img-src="https://bird-created.s3.amazonaws.com/images/homepage/2019-12-30.jpg"
      /> -->
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped></style>
