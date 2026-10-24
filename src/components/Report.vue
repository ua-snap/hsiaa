<template>
  <div :class="{ 'is-hidden': isHidden }" v-if="isLoaded">
    <div class="content is-size-4 mt-6">
      <p>
        The charts below show two different ways of seeing changes<br />in sea ice concentration
        over time.
      </p>
    </div>
    <div class="content is-size-5">
      <p>Use the &ldquo;Download chart&rdquo; button below each chart to save it as an image.</p>
      <p>
        Or,
        <a :href="atlasStore.getCsvUrl">download data for this place (CSV)</a>, which contains the
        values shown in both charts.
      </p>

      <ConcentrationPlot />
      <Tapestry />
    </div>
  </div>
</template>

<script setup>
import ConcentrationPlot from './ConcentrationPlot.vue'
import Tapestry from './Tapestry.vue'
import { useAtlasStore } from '@/stores/atlas'
import { onBeforeMount, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
const atlasStore = useAtlasStore()
const { isLoaded } = storeToRefs(atlasStore)

const props = defineProps(['lat', 'lng', 'isHidden'])

onBeforeMount(() => {
  if (props.lat && props.lng) {
    const latNum = parseFloat(props.lat)
    const lngNum = parseFloat(props.lng)
    atlasStore.setLatLngFromObject({ lat: latNum, lng: lngNum })
    atlasStore.fetch()
  }
})

onUnmounted(() => {
  // This ensures that when the report is closed, it will clear the report data
  atlasStore.clearReport()
})
</script>
