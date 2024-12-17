<template>
  <div id="mini-map"></div>
</template>

<script setup>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted } from 'vue'
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'

const atlasStore = useAtlasStore()
const { lat, lng } = storeToRefs(atlasStore)

let map
let marker

onMounted(() => {
  map = L.map('mini-map', {
    crs: proj,
    zoom: 0,
    zoomControl: false,
    doubleClickZoom: false,
    attributionControl: false,
    scrollWheelZoom: false,
    dragging: false
  })

  getBaseMapAndLayers().addTo(map)

  map.setView([lat.value, lng.value], 0)

  if (marker) {
    map.removeLayer(marker)
  }
  marker = L.marker([lat.value, lng.value]).addTo(map)

  map.invalidateSize()
})

let resolutions = [4096, 2048, 1024, 512, 256, 128, 64]

const proj = new L.Proj.CRS(
  'EPSG:3572',
  '+proj=laea +lat_0=90 +lon_0=-150 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs',
  {
    resolutions: resolutions,
    origin: [-4889334.802954878, -4889334.802954878]
  }
)

const getBaseMapAndLayers = function () {
  return L.tileLayer.wms('https://gs.earthmaps.io/geoserver/wms', {
    transparent: true,
    srs: 'EPSG:3572',
    format: 'image/png',
    version: '1.3.0',
    continuousWorld: true,
    layers: ['arctic_osm_3572']
  })
}
</script>

<style lang="scss" scoped>
#mini-map {
  width: 40%;
  height: 400px;
  margin: 0 auto;
}
</style>
