import Plotly from 'plotly.js-dist-min'

export const plotSettings = {
  responsive: true, // changes the height / width dynamically for charts
  // The Plotly mode bar isn't keyboard accessible, so charts get their own
  // "Download chart" button instead (see downloadPlot below).
  displayModeBar: false
}

// Save a Plotly chart as a PNG, at the size it's currently drawn.
export const downloadPlot = function (elementId, filename) {
  const el = document.getElementById(elementId)
  return Plotly.downloadImage(el, {
    format: 'png',
    filename: filename,
    width: el.offsetWidth,
    height: el.offsetHeight
  })
}
