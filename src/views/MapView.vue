<template>
  <main>
    <div>
      <h5 id="place" class="mt-5 pt-3 pb-0 mb-0">To begin, choose a community or click on the map.</h5>
      <div class="controls">
        <CommunityPicker class="is-hidden-portrait m-5" />
      </div>
      <div class="map--wrapper is-hidden-mobile">
        <div class="map--overlay-wrapper p-4">
          <MapTitle class="is-size-4 has-text-weight-bold mb-1" />
          <YearSlider class="mb-6 px-3" />
          <div class="pb-3">
            <MonthSelectors class="month-selectors mb-1 pr-4" />
            <p class="hint pt-3">Use slider above to change year</p>
          </div>
          <MapLegend class="is-hidden-mobile" />
        </div>
        <Map />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.controls {
  text-align: center;
}
.map--wrapper {
  position: relative;
}

.map--overlay-wrapper {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  top: 0;
  left: 0;
  padding: 0 1rem 1rem 1rem;
  z-index: 10000;
  width: 50vw;
}

.month-selectors {
  display: inline-block;
}

.hint {
  display: inline-block;
  vertical-align: middle;
  font-family: sans-serif;
}
h5 {
  text-align: center;
  font-weight: 700;
  font-size: 1.5rem;
}
</style>

<script setup>
import Map from '../components/Map.vue'
import MapLegend from '../components/MapLegend.vue'
import MapTitle from '../components/MapTitle.vue'
import MonthSelectors from '../components/MonthSelectors.vue'
import YearSlider from '../components/YearSlider.vue'
import CommunityPicker from '../components/CommunityPicker.vue'
</script>
