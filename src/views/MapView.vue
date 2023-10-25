<script setup>
import Map from '../components/Map.vue'
import MapLegend from '../components/MapLegend.vue'
import MonthSelectors from '../components/MonthSelectors.vue'
import DateSlider from '../components/DateSlider.vue'
</script>

<template>
  <main>
    <div class="controls">
      <h3>Sea Ice Concentration, {{ displayDate }}</h3>
      <DateSlider/>
      <MonthSelectors/>
      <span class="hint">Use slider above to change year</span>
      <MapLegend />
    </div>
    <Map />
  </main>
</template>
