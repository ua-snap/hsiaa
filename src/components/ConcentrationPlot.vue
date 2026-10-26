<template>
  <p>Choose months<br />and view sea ice changes over time for this place.</p>
  <Multiselect
    v-model="months"
    :options="monthNames"
    mode="tags"
    placeholder="Choose months to show on chart"
    :aria="multiselectAria"
    :can-clear="false"
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

import { plotSettings, makeChartAccessible } from '@/shared.js'
const { xrange, MIN_YEAR, MAX_YEAR } = useAtlasStore()

const atlasStore = useAtlasStore()
const { apiData, isLoaded, community, lat, lng } = storeToRefs(atlasStore)

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

const downloadFilename = computed(() => {
  let placeName = ''
  if (community.value) {
    placeName = `${community.value}`
  } else if (lat.value && lng.value) {
    placeName = `${lat.value}ºN, ${lng.value}ºE`
  }
  return `Sea Ice Concentration, ${placeName}, 1850-${MAX_YEAR}`
})

// The library adds aria-placeholder and aria-multiselectable to its combobox,
// which aren't allowed on that role; nulling them here removes them.
const multiselectAria = {
  'aria-label': 'Choose months to show on chart',
  'aria-placeholder': null,
  'aria-multiselectable': null
}

// Text alternative for the chart; the CSV link above holds the full values.
const chartDescription = computed(() => {
  const monthList = months.value.map((month) => monthNames[month]).join(', ')
  return `Line chart of ${
    atlasStore.getPlaceTitle
  }, showing percent sea ice concentration by year for ${
    monthList || 'no months'
  }. Download the CSV for the values.`
})

// Line styles so months can be told apart without relying on color.
const lineDashes = ['solid', 'dash', 'dot', 'dashdot', 'longdash', 'longdashdot']

const updatePlot = function () {
  Plotly.react(
    'concentration-plot',
    traces.value,
    layout.value,
    plotSettings(downloadFilename.value)
  ).then(() => makeChartAccessible('concentration-plot', chartDescription.value))

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
    height: 450
  }
})

const traces = computed(() => {
  if (apiData.value) {
    let unwrappedApiData = toRaw(apiData.value)
    let newTraces
    // Add a series of traces for the season
    newTraces = _.map(months.value, (month, i) => {
      let y = _.filter(unwrappedApiData, (value, index) => {
        // Convert index to numeric month
        let m = parseInt(index.split('-')[1])
        return m % 13 == month
      })
      return {
        x: xrange,
        y: y,
        type: 'scatter',
        name: monthNames[month],
        line: { dash: lineDashes[i % lineDashes.length] }
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
  // Override the theme's green palette, which fails text, border and focus contrast.
  --ms-border-color: #767676;
  --ms-placeholder-color: #6b7280;
  --ms-caret-color: #4a4a4a;
  --ms-tag-bg: #0023ac;
  --ms-option-bg-selected: #0023ac;
  --ms-option-bg-selected-pointed: #001a80;
  --ms-ring-width: 3px;
  --ms-ring-color: #0023ac;
}
#concentration-plot {
  min-height: 450px;
}
</style>
