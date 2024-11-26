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

const getBaseMapAndLayers = function () {
  var baseLayer = new L.tileLayer.wms('https://gs.earthmaps.io/geoserver/wms', {
    transparent: true,
    srs: 'EPSG:3572',
    format: 'image/png',
    version: '1.3.0',
    continuousWorld: true, // needed for non-3857 projs
    layers: ['arctic_osm_3572']
  })

  // Projection definition.
  var proj = new L.Proj.CRS(
    'EPSG:3572',
    '+proj=laea +lat_0=90 +lon_0=-150 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs',
    {
      resolutions: [4096, 2048, 1024, 512, 256, 128, 64],
      origin: [-4889334.802954878, -4889334.802954878]
    }
  )

  // trust me 🥦🥦🥦🥦
  // Without this (= pi/2), proj4js returns an undefined
  // value for tiles requested at the North Pole and
  // it causes a runtime exception.
  proj.projection._proj.oProj.phi0 = 1.5708

  // Map base configuration
  var config = {
    zoom: 0,
    minZoom: 0,
    maxZoom: 5,
    center: [67, -170],
    scrollWheelZoom: false,
    crs: proj,
    continuousWorld: true,
    worldCopyJump: false,
    zoomControl: false,
    doubleClickZoom: false,
    attributionControl: false,
    layers: [baseLayer]
  }

  return config
}
</script>

<style lang="scss" scoped>
#map {
  height: 90vh;
}
</style>
