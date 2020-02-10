<template>
  <div class="album-modal-nav">
    <transition
      v-if="showImageNav === true"
      name="album-modal-nav__transition"
      appear
    >
      <div class="album-modal-nav__bar-mask">
        <div class="album-modal-nav__bar-container">
          <div class="album-modal-nav__bar-element">
            <font-awesome-icon
              @click="handleClose"
              :icon="['fas', 'window-close']"
              size="2x"
            />
          </div>
          <div class="album-modal-nav__bar-element">
            <font-awesome-icon
              @click="$store.commit('toggleShowImageMetadata')"
              :icon="['fas', 'info-circle']"
              size="2x"
            />
          </div>
          <div class="album-modal-nav__bar-element">
            <font-awesome-icon
              @click="handleNavigate(1)"
              :icon="['fas', 'arrow-right']"
              size="2x"
            />
          </div>
          <div class="album-modal-nav__bar-element">
            <font-awesome-icon
              @click="handleNavigate(-1)"
              :icon="['fas', 'arrow-left']"
              size="2x"
            />
          </div>
          <div
            class="album-modal-nav__bar-element album-modal-nav__bar-element-start"
          >
            <font-awesome-icon
              v-if="slideshowActive"
              @click="$store.commit('toggleSlideshowActive')"
              :icon="['fas', 'pause']"
              size="2x"
            />
            <font-awesome-icon
              v-else
              @click="$store.commit('toggleSlideshowActive')"
              :icon="['fas', 'play']"
              size="2x"
            />
          </div>
          <div class="album-modal-nav__bar-element">
            <h2>{{ modalIndex + 1 }} / {{ albumLength }}</h2>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  components: {},
  computed: mapState(["modalIndex", "albumLength", "slideshowActive"])
})
export default class AlbumModal extends Vue {
  @Prop() showImageNav!: boolean;

  albumLength!: number;
  modalIndex!: number;

  mounted() {
    window.addEventListener("keydown", e => {
      var key = e.which || e.keyCode;
      if (key === 37) {
        this.handleNavigate(-1);
      } else if (key === 39) {
        this.handleNavigate(1);
      }
    });
  }

  handleClose() {
    this.$router.push(`/albums/${this.$route.params.albumName}`);
  }

  // TODO: Shared function with AlbumModal.vue, could emit up instead
  handleNavigate(direction: number) {
    console.log("nav", direction);
    this.$router.replace(
      `/albums/${this.$route.params.albumName}/slideshow/${this.calculateIndex(
        this.modalIndex,
        direction
      ) + 1}`
    );
  }

  // TODO: This is the same function as in Album.vue
  calculateIndex(currentIndex: number, increment: number) {
    if (currentIndex + increment <= -1) {
      return this.albumLength - 1;
    } else if (currentIndex + increment >= this.albumLength) {
      return 0;
    } else {
      return currentIndex + increment;
    }
  }
}
</script>
