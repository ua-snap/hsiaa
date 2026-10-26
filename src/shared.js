// Keep only the PNG export (camera) button, always visible so it can take focus.
export const plotSettings = (filename) => ({
  responsive: true, // changes the height / width dynamically for charts
  displayModeBar: true,
  displaylogo: false,
  modeBarButtons: [['toImage']],
  toImageButtonOptions: { format: 'png', filename }
})

// Plotly's mode bar buttons are <a> elements without href, so make them
// tabbable and operable by keyboard. Call after every Plotly.react().
export const makeChartAccessible = function (elementId, description) {
  const el = document.getElementById(elementId)
  if (!el) return

  // The label goes on the chart image; role="img" on the outer div would hide the buttons.
  const svgContainer = el.querySelector('.svg-container')
  if (svgContainer) {
    svgContainer.setAttribute('role', 'img')
    svgContainer.setAttribute('aria-label', description)
  }

  el.querySelectorAll('.modebar-btn').forEach((btn) => {
    btn.setAttribute('role', 'button')
    btn.setAttribute('tabindex', '0')
    btn.setAttribute('aria-label', 'Download chart as PNG')
    if (!btn.dataset.keyboardReady) {
      btn.dataset.keyboardReady = 'true'
      btn.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          btn.click()
        }
      })
    }
  })
}
