<template>
	<div class="slider-wrapper">
		<VueSlider
			v-model="selectedYear"
			max="2021"
			min="1850"
			:marks="marks"
			v-on:change="debouncedUpdate"
		/>
	</div>
</template>

<script setup>
import _ from 'lodash'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import { useAtlasStore } from '@/stores/atlas'
const { setYear } = useAtlasStore()
import { MIN_YEAR, MAX_YEAR } from '@/shared.js'


let selectedYear = MIN_YEAR
const marks = [MIN_YEAR, 1875, 1900, 1925, 1950, 1975, 2000, MAX_YEAR]

const debouncedUpdate = _.debounce((year) => {
	setYear(year)
}, 200)

</script>
