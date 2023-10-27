<template>
  <div>
    <p>
      These charts show two different ways of seeing changes<br />in sea ice concentration over
      time.
    </p>
    <p class="content is-size-5">
      Click the
      <CameraIcon/>
      icon in the upper-right of each chart to download it.
    </p>
    <p>
      Or,
      <a :href="downloadButtonData">download data for this place (CSV).</a>
    </p>
    <ConcentrationPlot/>
    <Tapestry/>
  </div>
</template>

<script setup>
import CameraIcon from './CameraIcon.vue'
import ConcentrationPlot from './ConcentrationPlot.vue'
import Tapestry from './Tapestry.vue'
</script>