<template>
	<p>Choose months<br />and view sea ice changes over time for this place.</p>
	<Multiselect
		v-model="months"
		:options="monthNames"
		mode="tags"
		placeholder="Choose months to show on chart"
	/>
	<div id="concentration-plot"></div>
</template>

<script setup>
import Multiselect from '@vueform/multiselect'
import Plotly from 'plotly.js-dist-min'
import _ from 'lodash'
import { ref, computed, watch, onMounted } from 'vue'
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'
import { xrange, plotSettings } from '@/shared.js'

const atlasStore = useAtlasStore()

// Selected months to display in chart
const months = ref([5, 9])

const monthNames = {
	0: 'January',
	1: 'February',
	2: 'March',
	3: 'April',
	4: 'May',
	5: 'June',
	6: 'July',
	7: 'August',
	8: 'September',
	9: 'October',
	10: 'November',
	11: 'December'
}

watch(months, () => {
	updatePlot()
})

const layout = computed(() => {
	return {
		// title: `<b>${title}, ${monthFragment}, 1850-2021</b>`,
		title: title.value,
		xaxis: {
			range: [1850, 2021],
			fixedrange: true
		},
		yaxis: {
			range: [0, 105],
			fixedrange: true
		},
		legend: { orientation: 'h' }
	}
})

const traces = computed(() => {
	let newTraces
	// Add a series of traces for the season
	newTraces = _.map(months.value, (month) => {
		let y = _.filter(atlasStore.apiData, (value, index) => {
			return index % 12 == month
		})
		return {
			x: xrange,
			y: y,
			type: 'scatter',
			name: monthNames[month]
		}
	})
	return newTraces
})

const title = computed(() => {
	let monthFragment = ''
	months.value.forEach((month) => {
		monthFragment += monthNames[month] + ', '
	})
	monthFragment = monthFragment.substring(0, monthFragment.length - 2)
	return monthFragment
})

const updatePlot = function () {
	Plotly.newPlot('concentration-plot', traces.value, layout.value, plotSettings)
}

onMounted(() => {
	updatePlot()
})
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
