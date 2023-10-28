// Range of years for x-axis in chart
var xrange = []
for (let x = 1850; x <= 2021; x++) {
	xrange.push(x)
}
export var xrange

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

export const MIN_YEAR = 1850
export const MAX_YEAR = 2021