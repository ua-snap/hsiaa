<template>
  <div>
    <ReportTitle/>
    <LoadingBlock/>
    <InvalidPlace/>
    <Report/>
  </div>
</template>

<script setup>
import ReportTitle from '../components/ReportTitle.vue'  
import LoadingBlock from '../components/LoadingBlock.vue'  
import InvalidPlace from '../components/InvalidPlace.vue'  
import Report from '../components/Report.vue'
import { defineProps } from 'vue'

// This will parse/set the lat/lng if it's being supplied via URL.
// TBD << reconstituting this from URL via rewrite/traps
const props = defineProps(['lat', 'lng'])

</script>

<style>
</style>
