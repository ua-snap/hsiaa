<template>
  <div class="has-text-centered">
    <BackButton/>
    <ReportTitle v-bind:class="{ 'is-hidden': !validMapPixel }" />
    <LoadingBlock/>
    <InvalidPlace/>
    <Report v-bind:class="{ 'is-hidden': !validMapPixel }" />
  </div>
</template>

<script setup>
import ReportTitle from '../components/ReportTitle.vue'  
import LoadingBlock from '../components/LoadingBlock.vue'  
import InvalidPlace from '../components/InvalidPlace.vue'  
import Report from '../components/Report.vue'
import BackButton from '../components/BackButton.vue'
import { defineProps } from 'vue'
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'
const atlasStore = useAtlasStore()
const { validMapPixel } = storeToRefs(atlasStore)

// This will parse/set the lat/lng if it's being supplied via URL.
// TBD << reconstituting this from URL via rewrite/traps
const props = defineProps(['lat', 'lng'])

</script>