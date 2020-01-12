<template>
  <AlbumsList />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AlbumsList from "@/components/AlbumsList.vue";

@Component({
  components: { AlbumsList }
})
export default class Albums extends Vue {}
</script>
