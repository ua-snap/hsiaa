<template>
  <main>
    <section class="section has-text-centered" id="report">
      <div class="container">
        <BackButton />
        <ReportTitle />
        <MiniMap />
        <p class="is-sr-only" role="status">{{ statusMessage }}</p>
        <LoadingBlock />
        <InvalidPlace v-bind:class="{ 'is-hidden': validMapPixel }" />
        <Report v-bind:class="{ 'is-hidden': !validMapPixel }" :lat="props.lat" :lng="props.lng" />
        <BackButton />
      </div>
    </section>
  </main>
</template>

<script setup>
import ReportTitle from '../components/ReportTitle.vue'
import LoadingBlock from '../components/LoadingBlock.vue'
import InvalidPlace from '../components/InvalidPlace.vue'
import Report from '../components/Report.vue'
import BackButton from '../components/BackButton.vue'
import MiniMap from '../components/MiniMap.vue'
import { computed, watchEffect, onUnmounted } from 'vue'
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'
const atlasStore = useAtlasStore()
const { validMapPixel, isLoaded, getPlaceTitle } = storeToRefs(atlasStore)

const props = defineProps(['lat', 'lng'])

const SITE_TITLE = 'Historical Sea Ice Atlas'

// Announced by screen readers as the report loads.
const statusMessage = computed(() => {
  if (!isLoaded.value) {
    return 'Loading data for this place.'
  }
  if (!validMapPixel.value) {
    return 'This sea ice dataset doesn’t show any recorded sea ice in this place.'
  }
  return 'Sea ice charts for this place have loaded.'
})

watchEffect(() => {
  document.title = `${getPlaceTitle.value} | ${SITE_TITLE}`
})

onUnmounted(() => {
  document.title = SITE_TITLE
})
</script>
