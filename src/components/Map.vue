<template>
	<div class="map--section--wrapper">
		<div class="map--direct-wrapper" v-bind:class="{ sidelined: foldoutActive }">
			<div class="map--wrapper">
				<div class="map--overlay-wrapper">
					<!-- Slider wrapper! -->
					

					<div
						class="report--show-current-button button is-link"
						v-on:click="foldoutActive = true"
						v-bind:class="{ hidden: !validMapPixel }"
					>
						<span class="text"> Show report for selected location </span>
						<span class="icon is-large">
							<i class="fas fa-arrow-right"></i>
						</span>
					</div>
					
				</div>
				
				<div id="map--main"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import p4l from 'proj4leaflet'
import MapLegend from './MapLegend.vue'
import { onMounted } from 'vue'

// Leaflet map object
var map

onMounted(() => {
	map = L.map('map--main', getBaseMapAndLayers())
	new L.Control.Zoom({ position: 'topright' }).addTo(map)
})

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
.map--section--wrapper {
	.map--wrapper {
		border: 1px solid red;
		height: 90vh;
		position: relative;

		#map--main {
			height: 90vh;
		}

		.map--overlay-wrapper {
			position: absolute;
			background-color: rgba(255, 255, 255, 0.8);
			top: 0;
			left: 0;
			padding: 0 1rem 1rem 1rem;
			z-index: 10000;
			width: 50vw;

			
			.report--show-current-button {
				box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
				margin-bottom: 1rem;
				&.hidden {
					display: none;
				}
			}
		}

		.location--drop-down {
			background-color: white;
			position: absolute;
			top: 1.5rem;
			right: 1.5rem;
			z-index: 10000;
			box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
		}

		.slider-wrapper {
			margin: 1rem auto 0;
			padding: 1rem;

			p.date--display--date {
				margin: -1rem 0 0 -0.5rem;
				font-size: 1.75rem;
				font-weight: 700;
			}

			.slider-wrapper--button-wrapper {
				margin: 2rem -1rem 0;
				.button {
					margin-right: 1rem;
					& i.fas {
						display: inline-block;

						&.fa-arrow-alt-circle-left {
							margin-right: 0.5rem;
						}
						&.fa-arrow-alt-circle-right {
							margin-left: 0.5rem;
						}
					}
				}
			}
		}
	}
}
</style>
