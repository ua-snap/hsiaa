<template>
  <h3>Sea Ice Concentration, {{ displayDate }}</h3>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAtlasStore } from '@/stores/atlas'
import { computed } from 'vue'
import moment from 'moment'

const atlasStore = useAtlasStore()
const { year, month } = storeToRefs(atlasStore)

const displayDate = computed(() => {
  var dateObj = moment({ day: 1, month: month.value, year: year.value })
  return dateObj.format('MMMM YYYY')
})
</script>
