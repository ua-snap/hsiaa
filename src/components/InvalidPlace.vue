<template>
  <div class="report--invalid" v-bind:class="{ 'is-hidden': validMapPixel }">
    <p class="is-size-5 mb-6">
      Sorry, but the place you clicked on the map doesn&rsquo;t have any data! <br />This means it
      was either on land or otherwise outside of the dataset itself. <br />Zooming in on the map can
      make it easier to choose a location.
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
