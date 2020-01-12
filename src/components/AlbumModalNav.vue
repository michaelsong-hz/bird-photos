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
              @click="$emit('close')"
              :icon="['fas', 'window-close']"
              size="2x"
            />
          </div>
          <div class="album-modal-nav__bar-element">
            <font-awesome-icon
              @click="$store.commit('toggleShowModelMetadata')"
              :icon="['fas', 'info-circle']"
              size="2x"
            />
          </div>
          <div class="album-modal-nav__bar-element">
            <font-awesome-icon
              @click="navigateRight"
              :icon="['fas', 'arrow-right']"
              size="2x"
            />
          </div>
          <div class="album-modal-nav__bar-element">
            <font-awesome-icon
              @click="navigateLeft"
              :icon="['fas', 'arrow-left']"
              size="2x"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {}
})
export default class AlbumModal extends Vue {
  @Prop() showImageNav!: boolean;

  mounted() {
    window.addEventListener("keydown", e => {
      var key = e.which || e.keyCode;
      if (key === 37) {
        this.navigateLeft();
      } else if (key === 39) {
        this.navigateRight();
      }
    });
  }

  navigateLeft() {
    this.$emit("navigate", -1);
  }

  navigateRight() {
    this.$emit("navigate", 1);
  }
}
</script>
