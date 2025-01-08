<template>
  <div class="slider-wrapper">
    <VueSlider
      v-model="selectedYear"
      :max="MAX_YEAR"
      min="1850"
      :marks="marks"
      v-on:change="debouncedUpdate"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import _ from 'lodash'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import { useAtlasStore } from '@/stores/atlas'
const { setYear, MIN_YEAR, MAX_YEAR } = useAtlasStore()

let marks = ref([MIN_YEAR, 1875, 1900, 1925, 1950, 1975, 2000, MAX_YEAR.value])

let selectedYear = MIN_YEAR

// This watches for any changes to the MAX_YEAR value and updates the slider accordingly
watch(MAX_YEAR, (newMaxYear) => {
  marks.value = [MIN_YEAR, 1875, 1900, 1925, 1950, 1975, 2000, MAX_YEAR]
})

const debouncedUpdate = _.debounce((year) => {
  setYear(year)
}, 200)
</script>
