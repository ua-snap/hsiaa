<template>
	<div class="slider-wrapper">
		<Slider
			v-model="selectedDate"
			:min="1850"
			:max="2021"
			:marks="marks"
			:tooltip-placement="'bottom'"
		/>
	</div>
</template>

<script setup>
import Slider from 'vue3-slider'

let selectedDate = 1850
let marks = [1850, 1875, 1900, 1925, 1950, 1975, 2000, 2021]
</script>
