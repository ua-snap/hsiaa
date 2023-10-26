<template>
	<div>
		<p>Choose months<br />and view sea ice changes over time for this place.</p>

		<Multiselect
			v-model="months"
			:options="monthNames"
			mode="tags"
			placeholder="Choose months to show on chart"
		/>

		<div id="concentration-plot"></div>
	</div>
</template>

<script setup>
import Multiselect from '@vueform/multiselect'
import Plotly from 'plotly.js-dist-min'
import _ from 'lodash'
import { ref, computed, watch, onMounted } from 'vue'
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'

const atlasStore = useAtlasStore()
const { year, month } = storeToRefs(atlasStore)

// Selected months to display in chart
const months = ref([0])

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

// Range of years for x-axis in chart
var xrange = []
for (let x = 1850; x <= 2021; x++) {
	xrange.push(x)
}

// TODO MOVE TO SHARED LOCATION
const modebarbuttonstoremove = [
	'zoom2d',
	'pan2d',
	'select2d',
	'lasso2d',
	'zoomIn2d',
	'zoomOut2d',
	'autoScale2d',
	'resetScale2d',
	'hoverClosestCartesian',
	'hoverCompareCartesian',
	'hoverClosestPie',
	'hoverClosest3d',
	'hoverClosestGl2d',
	'hoverClosestGeo',
	'toggleHover',
	'toggleSpikelines'
]

// TODO PREMERGE REMOVE REMOVE REMOVE
watch(months, () => {
	updatePlot()
})

const layout = {
	// title: `<b>${title}, ${monthFragment}, 1850-2021</b>`,
	title: 'Cows',
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

const traces = computed(() => {
	let newTraces
	let apiData = Object.values(atlasStore.apiData)
	// Add a series of traces for the season
	console.log('months is', months)
	newTraces = _.map(months, (month) => {
		let y = _.filter(apiData, (value, index) => {
			return index % 12 == month
		})
		return {
			x: xrange,
			y: y,
			type: 'scatter',
			name: months[month.number]
		}
	})
	console.log(newTraces)
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

const plotSettings = {
	responsive: true, // changes the height / width dynamically for charts
	displayModeBar: true, // always show the camera icon
	displaylogo: false,
	modeBarButtonsToRemove: [
		'zoom2d',
		'pan2d',
		'select2d',
		'lasso2d',
		'zoomIn2d',
		'zoomOut2d',
		'autoScale2d',
		'resetScale2d'
	]
}

const updatePlot = function () {
	Plotly.newPlot('concentration-plot', traces.value, layout, plotSettings)
}

onMounted(() => {
	updatePlot()
})
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
