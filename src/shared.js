import axios from 'axios'

export const MIN_YEAR = 1850
export let MAX_YEAR
export let MAX_MONTH

export let xrange = []
export async function getMaxYearAndMonth() {
  try {
    let queryUrl = import.meta.env.VITE_SNAP_API_URL + `/seaice/enddate/`
    let enddate = await axios.get(queryUrl, { timeout: 60000 }).catch((err) => {
      console.error(err)
    })
    enddate = enddate.data
    MAX_YEAR = Number(enddate['year'])
    // Sets max month to 0-11 range rather than 1-12
    MAX_MONTH = Number(enddate['month'] - 1)

    for (let x = MIN_YEAR; x <= MAX_YEAR; x++) {
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
