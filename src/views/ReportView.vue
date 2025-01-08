<template>
  <section class="section has-text-centered" id="report">
    <div class="container">
      <BackButton />
      <ReportTitle />
      <MiniMap />
      <LoadingBlock />
      <InvalidPlace v-bind:class="{ 'is-hidden': validMapPixel }" />
      <Report v-bind:class="{ 'is-hidden': !validMapPixel }" :lat="props.lat" :lng="props.lng" />
    </div>
  </section>
</template>

<script setup>
import ReportTitle from '../components/ReportTitle.vue'
import LoadingBlock from '../components/LoadingBlock.vue'
import InvalidPlace from '../components/InvalidPlace.vue'
import Report from '../components/Report.vue'
import BackButton from '../components/BackButton.vue'
import MiniMap from '../components/MiniMap.vue'
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'
const atlasStore = useAtlasStore()
const { validMapPixel } = storeToRefs(atlasStore)

const props = defineProps(['lat', 'lng'])
</script>
