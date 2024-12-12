<template>
  <div class="report--invalid" v-bind:class="{ 'is-hidden': validMapPixel }">
    <p class="is-size-5 mb-6">
      Sorry, the place you click on the map doesn&rsquo;t show any sea ice data.
      <br />This can be for a few different reasons: the point is too far south and never has sea
      ice, it&rsquo;s on land, or it&rsquo;s outside of the extent of this dataset.
    </p>
    <p>
      <a v-on:click.prevent.stop="foldoutActive = false" href="#"
        >Go back and pick another place on the map</a
      >.
    </p>
  </div>
</template>

<script setup>
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'
const atlasStore = useAtlasStore()
const { validMapPixel } = storeToRefs(atlasStore)
</script>
