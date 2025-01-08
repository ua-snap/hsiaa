import axios from 'axios'
import { ref } from 'vue'

export const MIN_YEAR = 1850
export const MAX_YEAR = ref(2022)
export const MAX_MONTH = ref(11)

export let xrange = []

export async function getMaxYearAndMonth() {
  try {
    let queryUrl = import.meta.env.VITE_SNAP_API_URL + `/seaice/enddate/`
    let enddate = await axios.get(queryUrl, { timeout: 60000 }).catch((err) => {
      console.error(err)
    })

    enddate = enddate.data
    MAX_YEAR.value = Number(enddate['year'])
    // Sets max month to 0-11 range rather than 1-12
    MAX_MONTH.value = Number(enddate['month']) - 1

    xrange = []
    for (let x = MIN_YEAR; x <= MAX_YEAR.value; x++) {
      xrange.push(x)
    }
  } catch (error) {
    console.error('Error getting max year and month:', error)
  }
}

getMaxYearAndMonth()

export const plotSettings = {
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
