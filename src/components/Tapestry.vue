<template>
  <p class="mt-5 mb-6">
    The chart below also shows sea ice concentration,
    <br />but uses color instead of lines, <br />and shows every month for every year.
  </p>
  <div class="threshold--legend">
    <div class="gradient" aria-hidden="true"></div>
    <ul aria-label="Color scale for the chart below">
      <li class="th--1">0&#37; open water</li>
      <li class="th--50">50&#37;</li>
      <li class="th--100">solid ice 100&#37;</li>
    </ul>
  </div>
  <div id="tapestry" role="img" :aria-label="chartDescription"></div>
  <button type="button" class="button is-link is-outlined mt-3" v-on:click="download">
    <span class="icon" aria-hidden="true"><i class="fas fa-download"></i></span>
    <span>Download chart</span>
  </button>
</template>

<script setup>
import Plotly from 'plotly.js-dist-min'
import _ from 'lodash'
import { computed, watch, toRaw, onMounted } from 'vue'
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'

import { plotSettings, downloadPlot } from '@/shared.js'
const { xrange, MIN_YEAR, MAX_YEAR } = useAtlasStore()

const atlasStore = useAtlasStore()
const { apiData } = storeToRefs(atlasStore)

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// Text alternative for the chart; the CSV link above holds the full values.
const chartDescription = computed(() => {
  return `Heatmap of ${atlasStore.getPlaceTitle}, with one row per year and one column per month, colored from dark blue for open water to pale yellow for solid ice. Download the CSV for the values.`
})

const download = function () {
  downloadPlot('tapestry', `${atlasStore.getPlaceTitle}, monthly`)
}

const layout = computed(() => {
  return {
    title: `<b>${atlasStore.getPlaceTitle}</b>`,
    height: 1500,
    dragmode: false,
    legend: { orientation: 'h' },
    yaxis: {
      type: 'category',
      fixedrange: true,
      tick0: MIN_YEAR,
      dtick: 5
    },
    xaxis: {
      side: 'top',
      tickmode: 'array',
      tickvals: months,
      fixedRange: true,
      ticktext: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    }
  }
})

const traces = computed(() => {
  if (apiData) {
    let unwrappedApiData = toRaw(apiData.value)
    unwrappedApiData = Object.values(unwrappedApiData)

    const x = months
    const y = xrange
    const z = []

    xrange.forEach((year) => {
      const row = []
      months.forEach((month) => {
        const dataIndex = (year - MIN_YEAR) * 12 + (month - 1)
        const concentration = unwrappedApiData[dataIndex]

        if (concentration === undefined) {
          row.push(null)
        } else {
          row.push(unwrappedApiData[dataIndex])
        }
      })
      z.push(row)
    })

    const trace = [
      {
        x: x,
        y: y,
        z: z,
        type: 'heatmap',
        colorscale: 'YlGnBu',
        zmin: 0,
        zmax: 100,
        hovertemplate:
          'Month: %{x}<br>Year: %{y}<br>Concentration Percentage: %{z}%<extra></extra>',
        hoverongaps: false
      }
    ]

    return trace
  }
})

const updatePlot = function () {
  Plotly.react('tapestry', traces.value, layout.value, plotSettings)

  // Fire resize event to trigger Plotly responsiveness.
  window.dispatchEvent(new Event('resize'))
}

onMounted(() => {
  updatePlot()
})

watch(apiData, (newData) => {
  updatePlot()
})
</script>

<style lang="scss" scoped>
// Labels sit below the gradient in dark text, since white text over the
// middle of the scale doesn't meet contrast.
.threshold--legend {
  font-size: 1.1rem;
  font-family: sans-serif;
  margin: 1rem auto;
  max-width: 30rem;

  .gradient {
    height: 1.5rem;
    background-image: linear-gradient(
      to right,
      rgba(8, 29, 88, 255),
      rgba(37, 52, 148, 255),
      rgba(34, 94, 168, 255),
      rgba(29, 145, 192, 255),
      rgba(65, 182, 196, 255),
      rgba(127, 205, 187, 255),
      rgba(199, 233, 180, 255),
      rgba(237, 248, 217, 255)
    );
  }
  ul {
    display: flex;
    margin: 0;
    padding: 0;
    font-weight: 700;
    li {
      flex: 1 1 0;
      margin: 0;
      padding: 0.25rem 0;
      color: #112951;
    }
    li.th--1 {
      text-align: left;
    }
    li.th--50 {
      text-align: center;
    }
    li.th--100 {
      text-align: right;
    }
  }
}
</style>
