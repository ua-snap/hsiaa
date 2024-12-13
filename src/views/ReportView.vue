<template>
  <section class="section has-text-centered">
    <div class="container">
      <BackButton />
      <ReportTitle v-bind:class="{ 'is-hidden': !validMapPixel }" />
      <LoadingBlock />
      <InvalidPlace />
      <Report v-bind:class="{ 'is-hidden': !validMapPixel }" />
    </div>
  </section>
</template>

<script setup>
import ReportTitle from '../components/ReportTitle.vue'
import LoadingBlock from '../components/LoadingBlock.vue'
import InvalidPlace from '../components/InvalidPlace.vue'
import Report from '../components/Report.vue'
import BackButton from '../components/BackButton.vue'
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
const atlasStore = useAtlasStore()
const { validMapPixel } = storeToRefs(atlasStore)

// This will parse/set the lat/lng if it's being supplied via URL.
// TBD << reconstituting this from URL via rewrite/traps
const props = defineProps(['lat', 'lng'])

onBeforeMount(() => {
  if (props.lat && props.lng) {
    const latNum = parseFloat(props.lat)
    const lngNum = parseFloat(props.lng)
    atlasStore.setLatLngFromObject({ lat: latNum, lng: lngNum })
    atlasStore.fetch()
  }
})
</script>
