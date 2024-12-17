<template>
  <div class="report--invalid" v-bind:class="{ 'is-hidden': validMapPixel }">
    <p class="is-size-5 mb-3">
      <strong>Sorry, the place you clicked on the map doesn&rsquo;t show any sea ice data.</strong>
    </p>
    <p class="is-size-5 mb-3 reasons">
      This can be for a few different reasons:<br />it is too far south and never has sea ice,<br />it&rsquo;s
      on land,<br />or it&rsquo;s outside of the extent of this dataset.
    </p>
    <p class="is-size-5 mb-6">Zooming in on the map can make it easier to choose a location.</p>
    <p class="is-size-4">
      <router-link to="/">Go back and pick another place on the map.</router-link>
    </p>
  </div>
</template>

<style lang="scss" scoped>
p.reasons {
  line-height: 1.3;
  font-weight: 400;
}
</style>

<script setup>
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'
const atlasStore = useAtlasStore()
const { validMapPixel } = storeToRefs(atlasStore)
</script>
