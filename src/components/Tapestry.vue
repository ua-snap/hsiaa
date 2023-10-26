<template>
  <p class="between">
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
  <Plotly
    :data="thresholdChartData"
    :layout="thresholdChartLayout"
    :mode-bar-buttons-to-remove="modebarbuttonstoremove"
    :to-image-button-options="histogramToImageButtonOptions"
    :display-mode-bar="true"
    :displaylogo="false"
  ></Plotly>
</template>
