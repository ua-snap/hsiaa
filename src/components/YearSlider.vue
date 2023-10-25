<template>
	<div class="slider-wrapper">
		<VueSlider
			v-model="selectedDate"
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

let selectedDate = 1850
const marks = [1850, 1875, 1900, 1925, 1950, 1975, 2000, 2021]

const debouncedUpdate = _.debounce((year) => {
	setYear(year)
}, 200)

</script>
