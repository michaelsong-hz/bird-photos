<template>
  <div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img
        class="card-img-top"
        data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail"
        alt="Card image cap"
        :src="image_url"
      />
      <div class="card-body">
        <p class="card-text">
          ayy lmao
        </p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              v-on:click="testAws"
            >
              Display
            </button>
            <button type="button" class="btn btn-sm btn-outline-secondary">
              Edit
            </button>
          </div>
          <small class="text-muted">9 mins</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class AlbumImage extends Vue {
  @Prop() image_url!: string;

  testAws() {
    console.log(this.image_url);
    console.log("testing");
  }
}
</script>
