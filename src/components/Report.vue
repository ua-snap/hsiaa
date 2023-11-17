<template>
  <div class="content is-size-5">
    <p>
      These charts show two different ways of seeing changes<br />in sea ice concentration over
      time.
    </p>
    <p>
      Click the
      <CameraIcon/>
      icon in the upper-right of each chart to download it.
    </p>
    <p>
      Or,
      <a :href="downloadButtonData">download data for this place (CSV).</a>
    </p>
    <div v-if="isLoaded">
      <ConcentrationPlot/>
      <Tapestry/>
    </div>
    <div v-else>
      <LoadingBlock/>
    </div>
  </div>
</template>

<script setup>
import CameraIcon from './CameraIcon.vue'
import ConcentrationPlot from './ConcentrationPlot.vue'
import Tapestry from './Tapestry.vue'
import LoadingBlock from './LoadingBlock.vue'
import { useAtlasStore } from '@/stores/atlas'
import { onBeforeMount, watch } from 'vue'
import { storeToRefs } from 'pinia'
const atlasStore = useAtlasStore()
const { isLoaded } = storeToRefs(atlasStore)

onBeforeMount(() => {
  atlasStore.fetch()
})
</script>