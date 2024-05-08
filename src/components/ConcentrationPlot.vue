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
import { ref, computed, watch, toRaw, onMounted } from 'vue'
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'
import { xrange, plotSettings, MIN_YEAR, MAX_YEAR } from '@/shared.js'

const atlasStore = useAtlasStore()
const { apiData, isLoaded } = storeToRefs(atlasStore)

// Selected months to display in chart
// Default spring, autumn
const months = ref([5, 9])

// 1-indexed to match API return results
const monthNames = {
	1: 'January',
	2: 'February',
	3: 'March',
	4: 'April',
	5: 'May',
	6: 'June',
	7: 'July',
	8: 'August',
	9: 'September',
	10: 'October',
	11: 'November',
	12: 'December'
}

const updatePlot = function () {
	Plotly.react('concentration-plot', traces.value, layout.value, plotSettings)

	// Fire resize event to trigger Plotly responsiveness.
	window.dispatchEvent(new Event('resize'))
}

const layout = computed(() => {
	return {
		title: title.value,
		xaxis: {
			range: [MIN_YEAR, MAX_YEAR],
			fixedrange: true
		},
		yaxis: {
			range: [0, 105],
			fixedrange: true
		},
		legend: { orientation: 'h' },
		autosize: true,
		height: 450,
	}
})

const traces = computed(() => {
	if (apiData) {
		let unwrappedApiData = toRaw(apiData.value)
		let newTraces
		// Add a series of traces for the season
		newTraces = _.map(months.value, (month) => {
			let y = _.filter(unwrappedApiData, (value, index) => {
				// Convert index to numeric month
				let m = parseInt(index.split('-')[1])
				return m % 12 == month
			})
			return {
				x: xrange,
				y: y,
				type: 'scatter',
				name: monthNames[month]
			}
		})
		return newTraces
	}
})

const title = computed(() => {
	let monthFragment = ''
	months.value.forEach((month) => {
		monthFragment += monthNames[month] + ', '
	})
	monthFragment = monthFragment.substring(0, monthFragment.length - 2)
	return `<b>${atlasStore.getPlaceTitle}, ${monthFragment}</b>`
})

onMounted(() => {
	updatePlot()
})

watch([months, apiData], ([newMonths, newData]) => {
	updatePlot()
})
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped>
.multiselect {
  width: 60%;
}
#concentration-plot {
	min-height: 450px;
}
</style>