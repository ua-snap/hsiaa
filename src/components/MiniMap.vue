<template>
  <div id="mini-map"></div>
</template>

<script setup>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import retinaMarkerIcon from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
// This is necessary to fix the marker icon path issues when the static app is built
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: retinaMarkerIcon,
  shadowUrl: markerShadow
})

import { onMounted } from 'vue'
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'

const atlasStore = useAtlasStore()
const { lat, lng } = storeToRefs(atlasStore)

let map
let marker

onMounted(() => {
  let baseLayer = new L.tileLayer.wms(
    'https://basemap.nationalmap.gov/arcgis/services/USGSTopo/MapServer/WmsServer?',
    {
      transparent: true,
      format: 'image/png',
      version: '1.3.0',
      layers: ['0']
    }
  )

  map = L.map('mini-map', {
    zoomControl: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    dragging: false,
    layers: [baseLayer]
  })
  map.setView([lat.value, lng.value], 4)

  if (marker) {
    map.removeLayer(marker)
  }
  marker = L.marker([lat.value, lng.value]).addTo(map)

  map.invalidateSize()
})
</script>

<style lang="scss" scoped>
#mini-map {
  width: 40%;
  height: 400px;
  margin: 0 auto;
}
</style>
