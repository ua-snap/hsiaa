<template>
  <div id="map"></div>
</template>

<script setup>
import _ from 'lodash'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import p4l from 'proj4leaflet'
import MapLegend from './MapLegend.vue'
import { onMounted, watch } from 'vue'
import moment from 'moment'
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'
import router from '@/router/index'
import mask from '@/mask'

const atlasStore = useAtlasStore()
const { year, month, lat, lng } = storeToRefs(atlasStore)

// Leaflet map objects
var map
var layer // currently active layer

const baseLayerOptions = {
  transparent: true,
  srs: 'EPSG:3572',
  format: 'image/png',
  version: '1.3.0',
  continuousWorld: true // needed for non-3857 projs
}

onMounted(() => {
  map = L.map('map', getBaseMapAndLayers())

  // Create a pane for the mask layer to sit on top of the data layer
  map.createPane('maskPane')
  map.getPane('maskPane').style.zIndex = 650

  L.tileLayer
    .wms('https://gs.earthmaps.io/geoserver/wms', {
      layers: ['hsia_mask'],
      format: 'image/png',
      transparent: true,
      version: '1.3.0',
      pane: 'maskPane'
    })
    .addTo(map)

  new L.Control.Zoom({ position: 'topright' }).addTo(map)
  L.geoJSON(mask, {
    onEachFeature: function (feature, layer) {
      layer.on('click', handleMapClick)
    },
    style: {
      opacity: 0.0,
      fillOpacity: 0.0
    }
  }).addTo(map)
  updateAtlas()
  map.invalidateSize()

  // This ensures that when the map is shown, it will clear the previous report data
  // including community name, lat, lon, and data.
  atlasStore.clearReport()
})

watch([year, month], () => {
  updateAtlas()
})

const handleMapClick = function (event) {
  atlasStore.setLatLngFromObject(event.latlng)
  router.push({
    name: 'report',
    params: {
      lat: lat.value,
      lng: lng.value
    }
  })
}

// Converts year/month into an appropriate WMS string
const getWmsDateFormat = function (year, month) {
  var dateObj = moment({ day: 1, month: month, year: year })
  return '"' + dateObj.format('YYYY-MM-DDT00:00:00.000[Z]') + '"'
}

const updateAtlas = function () {
  if (layer) {
    map.removeLayer(layer)
  }
  layer = L.tileLayer.wms(
    import.meta.env.VITE_WMS_URL + '?',
    _.extend(baseLayerOptions, {
      layers: ['hsia_arctic_production'],
      styles: 'hsia',
      version: '1.3.0',
      time: getWmsDateFormat(year.value, month.value)
    })
  )
  map.addLayer(layer)
}

let resolutions = [4096, 2048, 1024, 512, 256, 128, 64]
let center = L.latLng(68, -150)
let zoom = 0
// Projection definition.
var proj = new L.Proj.CRS(
  'EPSG:3572',
  '+proj=laea +lat_0=90 +lon_0=-150 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs',
  {
    resolutions: resolutions,
    origin: [-4889334.802954878, -4889334.802954878]
  }
)

const getBaseMapAndLayers = function () {
  const baseLayer = new L.tileLayer.wms('https://gs.earthmaps.io/geoserver/wms', {
    transparent: true,
    srs: 'EPSG:3572',
    format: 'image/png',
    version: '1.3.0',
    continuousWorld: true, // needed for non-3857 projs
    layers: ['arctic_osm_3572']
  })
  // EPSG:3572 has strange bounds. These values were chosen in another of our projects and
  // seem to work well here as well.
  let southWest = L.latLng(20, -15)
  let northEast = L.latLng(20, 165)

  // Set viscosity to maximum because the map produces (harmless) JavaScript
  // errors if you drag too far outside the maxBounds. This prevents errors
  // vertically but not horizontally, but might be as good as it gets for
  // the EPSG:3572 projection.
  let viscosity = 1.0

  // Map base configuration
  const bounds = L.latLngBounds(southWest, northEast)

  // Map base configuration
  let layerConfig = {
    zoom: zoom,
    zoomSnap: 0.1,
    minZoom: 0,
    maxZoom: resolutions.length,
    scrollWheelZoom: false,
    crs: proj,
    center: center,
    zoomControl: false,
    doubleClickZoom: false,
    attributionControl: false,
    layers: [baseLayer],
    maxBounds: bounds,
    maxBoundsViscosity: viscosity
  }

  return layerConfig
}
</script>

<style lang="scss" scoped>
#map {
  height: 90vh;
}
</style>
