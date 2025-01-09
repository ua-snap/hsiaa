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
import { storeToRefs } from 'pinia'
const atlasStore = useAtlasStore()
const { MIN_YEAR, MAX_YEAR } = storeToRefs(atlasStore)
const { setYear } = useAtlasStore()

let marks = ref([MIN_YEAR.value, 1875, 1900, 1925, 1950, 1975, 2000, MAX_YEAR.value])

let selectedYear = MIN_YEAR.value

// This watches for any changes to the MAX_YEAR value and updates the slider accordingly
watch(MAX_YEAR, (newMaxYear) => {
  marks.value = [MIN_YEAR.value, 1875, 1900, 1925, 1950, 1975, 2000, MAX_YEAR.value]
})

const debouncedUpdate = _.debounce((year) => {
  setYear(year)
}, 200)
</script>
