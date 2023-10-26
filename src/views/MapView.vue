<template>
  <main>
    <div class="controls">
      <CommunityPicker/>
      <MapTitle/>
      <YearSlider/>
      <MonthSelectors/>
      <span class="hint">Use slider above to change year</span>
      <MapLegend />
    </div>
    <Map />
  </main>
</template>

<script setup>
import Map from '../components/Map.vue'
import MapLegend from '../components/MapLegend.vue'
import MapTitle from '../components/MapTitle.vue'
import MonthSelectors from '../components/MonthSelectors.vue'
import YearSlider from '../components/YearSlider.vue'
import CommunityPicker from '../components/CommunityPicker.vue'
</script>

