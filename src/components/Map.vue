<template>
	<div id="map"></div>
</template>

<script setup>
import _ from 'lodash'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import p4l from 'proj4leaflet'
import MapLegend from './MapLegend.vue'
import { onMounted } from 'vue'
import moment from 'moment'

const VUE_APP_SNAP_API_URL = 'https://earthmaps.io'
const VUE_APP_WMS_URL = 'https://maps.earthmaps.io/rasdaman/ows'

// Leaflet map objects
var map
var layer // currently active layer

// Move to store
var year = 1950
var month = 0

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
	updateAtlas()
})

// Convert an integer (0 - end of data series)
// into two strings: one for display,
// and the other for the WMS request.
const getDateFromInteger = function (year, month) {
	var dateObj = moment({ day: 1, month: month, year: year })
	return {
		display: dateObj.format('MMMM YYYY'),
		wms: '"' + dateObj.format('YYYY-MM-DDT00:00:00.000[Z]') + '"'
	}
}

const updateAtlas = function () {
	var dates = getDateFromInteger(year, month)
	console.log(dates)
	// this.displayDate = dates.display
	if (layer) {
		map.removeLayer(layer)
	}
	layer = L.tileLayer.wms(
		VUE_APP_WMS_URL + '?',
		_.extend(baseLayerOptions, {
			layers: ['hsia_arctic_production'],
			styles: 'hsia',
			version: '1.3.0',
			time: dates.wms
		})
	)
	map.addLayer(layer)
}

const getBaseMapAndLayers = function () {
	var baseLayer = new L.tileLayer.wms('https://gs.mapventure.org/geoserver/wms', {
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
