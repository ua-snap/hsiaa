<template>
  <div class="content is-size-4 mt-6">
    <p>
      The charts below show two different ways of seeing changes<br />in sea ice concentration over
      time.
    </p>
  </div>
  <div class="content is-size-5">
    <p>
      Click the
      <CameraIcon />
      icon in the upper-right of each chart to download it.
    </p>
    <p>
      Or,
      <a :href="downloadButtonData">download data for this place (CSV).</a>
    </p>
    <div v-if="isLoaded">
      <ConcentrationPlot />
      <Tapestry />
    </div>
    <div v-else>
      <LoadingBlock />
    </div>
  </div>
</template>

<script setup>
import CameraIcon from './CameraIcon.vue'
import ConcentrationPlot from './ConcentrationPlot.vue'
import Tapestry from './Tapestry.vue'
import LoadingBlock from './LoadingBlock.vue'
import { useAtlasStore } from '@/stores/atlas'
import { onBeforeMount, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
const atlasStore = useAtlasStore()
const { isLoaded } = storeToRefs(atlasStore)

const props = defineProps(['lat', 'lng'])

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
