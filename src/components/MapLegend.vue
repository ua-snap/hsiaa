<template>
  <ul class="map--legend" aria-label="Sea ice concentration color legend">
    <li v-for="(label, i) in labels" :key="label">
      <span class="swatch" :class="`conc--${i + 1}`" aria-hidden="true"></span>
      <span class="label">{{ label }}</span>
    </li>
  </ul>
</template>

<script setup>
const labels = [
  '0–30 %',
  '31–40 %',
  '41–50 %',
  '51–60 %',
  '61–70 %',
  '71–80 %',
  '81–90 %',
  '91–100 %'
]
</script>

<style lang="scss" scoped>
// Labels sit below the swatches in dark text, since text inside the
// mid-blue swatches can't meet 4.5:1 contrast in either white or navy.
.map--legend {
  display: flex;
  font-family: sans-serif;
  background-color: #fff;
  margin: 0 auto;
  width: 100%;
  li {
    flex: 1 1 0;
    min-width: 0;
    &:first-child {
      flex-basis: 33%;
      flex-grow: 0;
    }
  }
  .swatch {
    display: block;
    height: 1rem;
  }
  .label {
    display: block;
    color: #112951;
    font-size: 0.7rem;
    font-weight: 700;
    text-align: center;
    padding: 0.25rem 0.1rem;
  }
  .conc--1 {
    background-color: rgba(8, 29, 88, 255);
  }
  .conc--2 {
    background-color: rgba(37, 52, 148, 255);
  }
  .conc--3 {
    background-color: rgba(34, 94, 168, 255);
  }
  .conc--4 {
    background-color: rgba(29, 145, 192, 255);
  }
  .conc--5 {
    background-color: rgba(65, 182, 196, 255);
  }
  .conc--6 {
    background-color: rgba(127, 205, 187, 255);
  }
  .conc--7 {
    background-color: rgba(199, 233, 180, 255);
  }
  .conc--8 {
    background-color: rgba(237, 248, 217, 255);
  }
}
</style>
