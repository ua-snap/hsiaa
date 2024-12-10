<template>
  <table class="map--legend">
    <tbody>
      <tr>
        <td class="conc--1">0&ndash;30&nbsp;%</td>
        <td class="conc--2">31&ndash;40&nbsp;%</td>
        <td class="conc--3">41&ndash;50&nbsp;%</td>
        <td class="conc--4">51&ndash;60&nbsp;%</td>
        <td class="conc--5">61&ndash;70&nbsp;%</td>
        <td class="conc--6">71&ndash;80&nbsp;%</td>
        <td class="conc--7">81&ndash;90&nbsp;%</td>
        <td class="conc--8">91&ndash;100&nbsp;%</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.map--legend {
  font-family: sans-serif;
  background-color: #fff;
  margin: 0 auto;
  width: 100%;
  tbody tr {
    color: #fff;
    font-weight: 700;
    text-align: center;
    & td {
      font-size: 0.7rem;
      padding: 0.25rem;
      &.conc--1 {
        width: 33%;
        background-color: rgba(8, 29, 88, 255) !important;
      }
      &.conc--2 {
        background-color: rgba(37, 52, 148, 255) !important;
      }
      &.conc--3 {
        background-color: rgba(34, 94, 168, 255) !important;
      }
      &.conc--4 {
        background-color: rgba(29, 145, 192, 255) !important;
        text-shadow: 0 0 3px #000;
      }
      &.conc--5 {
        background-color: rgba(65, 182, 196, 255) !important;
        text-shadow: 0 0 3px #000;
      }
      &.conc--6 {
        background-color: rgba(127, 205, 187, 255) !important;
        color: rgba(8, 29, 88, 255);
      }
      &.conc--7 {
        background-color: rgba(199, 233, 180, 255) !important;
        color: rgba(8, 29, 88, 255);
      }
      &.conc--8 {
        background-color: rgba(237, 248, 217, 255) !important;
        color: rgba(8, 29, 88, 255);
      }
    }
  }
}
</style>
