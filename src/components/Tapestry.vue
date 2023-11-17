<template>
  <p>
    The chart below also shows sea ice concentration,
    <br />but uses color instead of lines, <br />and shows every month for every year.
  </p>
  <table class="threshold--legend">
    <tbody>
      <tr>
        <td class="th--1">0&#37; open water</td>
        <td class="th--50">50&#37;</td>
        <td class="th--100">solid ice 100&#37;</td>
      </tr>
    </tbody>
  </table>
  <div id="tapestry"></div>
</template>

<script setup>
import Plotly from 'plotly.js-dist-min'
import _ from 'lodash'
import { computed, watch, toRaw } from 'vue'
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'
import { xrange, plotSettings } from '@/shared.js'

const atlasStore = useAtlasStore()
const { apiData } = storeToRefs(atlasStore)

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const layout = computed(() => {
  return {
    title: `<b>${atlasStore.getPlaceTitle}</b>`,
    height: 1500,
    legend: { orientation: 'h' },
    yaxis: {
      type: 'category',
      fixedrange: true,
      tick0: 1850,
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
    var xVals = []
    var yVals = []

    xrange.forEach((year) => {
      months.forEach((month) => {
        let dataIndex = (year - 1850) * 12 + (month - 1)
        // Loop as many times as the %conc to fake the "histogram!"
        for (let i = 1; i <= unwrappedApiData[dataIndex]; ++i) {
          xVals.push(month)
          yVals.push(year)
        }
      })
    })
    let trace = [
      {
        x: xVals,
        y: yVals,
        hovertemplate:
          'Month: %{x}</br></br>Year: %{y}</br>Concentration Percentage: %{z}%<extra></extra>',
        type: 'histogram2d',
        autocolorscale: false,
        colorscale: 'YlGnBu',
        zmin: 0,
        zmax: 100
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

watch(apiData, (newData) => {
  updatePlot()
})
</script>

<style lang="scss" scoped>
table.threshold--legend {
  font-family: sans-serif;
  margin: 1rem auto;
  max-width: 50rem;
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

  thead {
    td {
      font-size: 1rem;
      font-weight: 700;
    }
  }
  tbody {
    font-weight: 700;
    tr {
      td {
        width: 33%;
        padding: 0.25rem;
      }
      td.th--1 {
        color: #fff;
        text-align: left;
      }
      td.th--50 {
        color: #fff;
        text-align: center;
        text-shadow: 0 0 3px #000;
      }
      td.th--100 {
        text-align: right;
      }
    }
  }
}
</style>
