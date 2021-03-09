<template>
  <div>
    <header>
      University of Alaska Fairbanks | Alaska Center for Climate Assessment and
      Policy
    </header>
    <section class="lead section">
      <div class="columns is-vcentered">
        <div class="column intro is-half">
          <h1>
            Historical<br />
            Sea Ice Atlas
          </h1>
          <h2>for <span>Alaska</span> &amp; the <span>Arctic</span></h2>
          <h3>1850 to present</h3>
        </div>

        <div class="column splash is-half">
          <img src="@/assets/hsia-splash.jpg" />
        </div>
      </div>
    </section>

    <section class="section lede">
      <div>
        <p class="announce">If</p>
        <p>
          you live in a northern Alaska coastal community<br />
          hunt or fish in a marine environment<br />
          work in shipping or oil and gas<br />
          serve with the Coast Guard<br />
          research Arctic ecosystems<br />
          — OR —<br />
          are simply interested in<br />
          Arctic sea ice data &nbsp; climate change
        </p>
        <p class="announce">This atlas is for you.</p>
      </div>
    </section>
    <section class="section about">
      <div class="centered--wrapper">
        <div class="explainer">
          <h4>
            This Atlas shows sea ice concentration.
          </h4>
        </div>
        <p class="overview">
          View historical sea ice data from the seas around the circumpolar
          North<br />
          and discover how ice concentrations have changed over time.
        </p>
        <p class="overview">
          This Atlas shows snapshots in time, as well as long term patterns.<br />
          It is not designed for forecasting or prediction,<br />
          but can provide historical context for planning efforts.
        </p>
        <div class="explainer">
          <h5>Sea ice concentration = ratio of sea ice to water</h5>
          <p>
            &lt;30% sea ice concentration = ships can travel here. <br />&gt;90%
            = solid ice.
          </p>
          <p>
            <a href="https://nsidc.org/cryosphere/quickfacts/seaice.html"
              >Learn more about sea ice</a
            >
          </p>

          <p class="mobile--warnings landscape">
            <span class="alarm">😓 We&rsquo;re sorry!</span> The interactive map
            doesn&rsquo;t work on a screen this size, but you can still pick a
            community to see visualizations.
          </p>
          <p class="mobile--warnings portrait">
            <span class="alarm">⚠️ Oh no!</span> The interactive tools on this
            site don&rsquo;t work on a phone in portrait mode. Turn your phone
            sideways to pick a community, or try using this site on a computer!
          </p>
        </div>

        <div
          class="location--drop-down"
          v-bind:class="{ hidden: foldoutActive }"
        >
          <p class="start">
            To begin, choose a community or click on the map.
          </p>
          <form>
            <div class="select control is-medium">
              <select v-model="community">
                <option value="">Choose a community&hellip;</option>
                <optgroup
                  v-for="(regions, regionKey) in communities"
                  v-bind:key="regionKey"
                  v-bind:label="regions.name"
                >
                  <option
                    v-for="place in regions.places"
                    v-bind:key="place.name"
                    v-bind:value="place.place"
                    >{{ place.name }}</option
                  >
                </optgroup>
              </select>
            </div>
          </form>
        </div>
      </div>
    </section>
    <section class="section foldout">
      <div class="map--section--wrapper">
        <div
          class="map--direct-wrapper"
          v-bind:class="{ sidelined: foldoutActive }"
        >
          <div class="map--wrapper">
            <div class="map--overlay-wrapper">
              <!-- Slider wrapper! -->
              <div class="slider-wrapper">
                <p class="date--display--date">
                  Sea Ice Concentration, {{ displayDate }}
                </p>
                <vue-slider
                  v-model="selectedDate"
                  :min="1850"
                  :max="2017"
                  :marks="marks"
                  :tooltip-placement="'bottom'"
                />
                <div class="slider-wrapper--button-wrapper">
                  <span v-on:click="decrementMonth" class="button">
                    <i class="fas fa-arrow-alt-circle-left" /><span
                      class="month-indicator"
                      >Past Month</span
                    >
                  </span>
                  <span v-on:click="incrementMonth" class="button">
                    <span class="month-indicator">Next Month</span>
                    <i class="fas fa-arrow-alt-circle-right" />
                  </span>

                  <span class="hint">Use slider above to change year</span>
                </div>
              </div>

              <div
                class="report--show-current-button button is-link"
                v-on:click="foldoutActive = true"
                v-bind:class="{ hidden: !validMapPixel }"
              >
                <span class="text">
                  Show report for selected location
                </span>
                <span class="icon is-large">
                  <i class="fas fa-arrow-right"></i>
                </span>
              </div>
              <table class="map--legend">
                <tbody>
                  <tr>
                    <td class="conc--1">0&ndash;30&nbsp;%</td>
                    <td class="conc--2">31&ndash;40&nbsp;%</td>
                    <td class="conc--3">41&ndash;50&nbsp;%</td>
                    <td class="conc--4">51&ndash;60&nbsp;%</td>
                    <td class="conc--5">61&ndash;70&nbsp;%</td>
                    <td class="conc--6">71&ndash;80&nbsp;%</td>
                    <td class="conc--7">81&ndash;90&nbsp;%</td>
                    <td class="conc--8">91&ndash;100&nbsp;%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div id="map--main"></div>
          </div>
        </div>

        <div
          v-bind:class="{ sidelined: foldoutActive, hidden: foldoutActive }"
          class="report--section"
        >
          <!-- Go back to the map -->
          <div v-on:click="foldoutActive = false" class="button is-link back">
            <span class="icon is-large">
              <i class="fas fa-arrow-left"></i>
            </span>
            <span class="text">
              Back to the map
            </span>
          </div>

          <!-- Loading spinner! -->
          <div
            class="loading-spinner box"
            v-bind:class="{ hidden: reportIsLoaded }"
          >
            <div class="loading-spinner--wrapper">
              <span class="icon is-large">
                <i class="fas fa-spin fa-2x fa-spinner"></i>
              </span>
              <span class="text">
                Loading data for this point, hang on&hellip;
              </span>
            </div>
          </div>

          <!-- Show this section once the data are loaded,
            we'll know then if it's valid or not.
          -->
          <div
            class="report--loaded"
            v-bind:class="{ hidden: !reportIsLoaded }"
          >
            <!-- Notify user of invalid pixel, or hide if it's OK. -->
            <div
              class="report--invalid"
              v-bind:class="{ hidden: validMapPixel }"
            >
              <p class="is-size-5">
                Sorry, but the place you clicked on the map doesn&rsquo;t have
                any data! <br />This means it was either on land or otherwise
                outside of the dataset itself. <br />Zooming in on the map can
                make it easier to choose a location.
              </p>
              <p>
                <a v-on:click.prevent.stop="foldoutActive = false" href="#"
                  >Go back and pick another place on the map</a
                >.
              </p>
            </div>

            <!-- Report wrapper; hide unless there's data. -->
            <div
              class="report--charts"
              v-bind:class="{ hidden: !validMapPixel }"
            >
              <h3 class="title is-4">{{ foldoutTitle }}, 1850&ndash;2017</h3>
              <p class="lead">
                These charts show two different ways of seeing changes<br />in
                sea ice concentration over time.
              </p>
              <p class="content is-size-5 camera-icon">
                Click the
                <span>
                  <svg
                    viewBox="0 0 1000 1000"
                    class="icon"
                    height="1em"
                    width="1em"
                  >
                    <path
                      d="m500 450c-83 0-150-67-150-150 0-83 67-150 150-150 83 0 150 67 150 150 0 83-67 150-150 150z m400 150h-120c-16 0-34 13-39 29l-31 93c-6 15-23 28-40 28h-340c-16 0-34-13-39-28l-31-94c-6-15-23-28-40-28h-120c-55 0-100-45-100-100v-450c0-55 45-100 100-100h800c55 0 100 45 100 100v450c0 55-45 100-100 100z m-400-550c-138 0-250 112-250 250 0 138 112 250 250 250 138 0 250-112 250-250 0-138-112-250-250-250z m365 380c-19 0-35 16-35 35 0 19 16 35 35 35 19 0 35-16 35-35 0-19-16-35-35-35z"
                      transform="matrix(1 0 0 -1 0 850)"
                    ></path>
                  </svg>
                </span>
                icon in the upper-right of each chart to download it.
              </p>
              <p>
                Choose months<br />and view sea ice changes over time for this
                place.
              </p>
              <div class="form--controls">
                <form>
                  <div class="field">
                    <label class="label">Choose months</label>
                    <div class="control">
                      <div class="control--select">
                        <multiselect
                          v-model="selectedMonthOrSeason"
                          :options="multiselectOptions"
                          :multiple="true"
                          :close-on-select="false"
                          :clear-on-select="false"
                          :preserve-search="true"
                          placeholder="Choose months to show on chart"
                          label="month"
                          track-by="number"
                          :preselect-first="false"
                        >
                          <template
                            slot="selection"
                            slot-scope="{ values, search, isOpen }"
                            ><span
                              class="multiselect__single"
                              v-if="values.length &amp;&amp; !isOpen"
                              >{{ values.length }} month(s) selected</span
                            ></template
                          >
                        </multiselect>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <Plotly
                :data="concentrationPlotData"
                :layout="concentrationPlotLayout"
                :mode-bar-buttons-to-remove="modebarbuttonstoremove"
                :to-image-button-options="monthlyToImageButtonOptions"
                :display-mode-bar="true"
                :displaylogo="false"
              ></Plotly>
              <p class="between">
                The chart below also shows sea ice concentration,
                <br />but uses color instead of lines, <br />and shows every
                month for every year.
              </p>
              <table class="threshold--legend">
                <tbody>
                  <tr>
                    <td class="th--1">0&#37; open water</td>
                    <td class="th--50">50&#37;</td>
                    <td class="th--100">solid ice 100&#37;</td>
                  </tr>
                </tbody>
              </table>
              <Plotly
                :data="thresholdChartData"
                :layout="thresholdChartLayout"
                :mode-bar-buttons-to-remove="modebarbuttonstoremove"
                :to-image-button-options="histogramToImageButtonOptions"
                :display-mode-bar="true"
                :displaylogo="false"
              ></Plotly>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="centered--wrapper explainer">
        <h4>
          Other ways to view sea ice data
        </h4>
        <h5 class="closer">
          <a v-bind:href="baseURL + 'Historical-Sea-Ice-Extents-Octobers.pdf'"
            >Download a poster</a
          ><br /><span
            >that shows 170 images of sea ice concentration for October,
            1850&ndash;2017.</span
          >
        </h5>
        <h5>Watch sea ice concentration animations</h5>
      </div>
    </section>
    <section class="section videos">
      <div class="columns">
        <div class="column is-half">
          <h5>Every month, 1850&ndash;2017</h5>
          <iframe
            class="youtube-videos"
            src="https://www.youtube.com/embed/XSa0iGU0uDY"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="column is-half">
          <h5>Monthly playlist, e.g. each January, 1850&ndash;2019</h5>
          <iframe
            class="youtube-videos"
            src="https://www.youtube.com/embed/videoseries?list=PLHlhXw356_VfeMkTxZHrOx_qSf_ZqrSGW"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>

    <section class="section data-sources">
      <div class="centered--wrapper">
        <h4>Data sources used in this Atlas</h4>
        <p>
          Collecting and interpreting sea ice data has always been
          challenging.<br />
          Charting conventions and interpretations of ice concentration have
          changed over time.<br />
          Observing tools&mdash;ships (1800s), airplanes (early 1900s),
          satellites (1970s)&mdash;have evolved as well.<br />
        </p>
        <p>
          Atlas data begin with sea ice observations extrapolated from whaling
          ship log books<br />
          in the Beaufort, Chukchi, and Bering seas starting in 1850.<br />
          Estimates are used to fill gaps in log book data.<br />
          Other data sources are incorporated as they were developed over time.
        </p>
      </div>
      <img src="./assets/SourcesChart.svg" />
      <div class="centered--wrapper">
        <h5>More information on sea ice data sources</h5>
        <p class="disclaimer">
          While the Atlas data captures much of the historical sea ice
          variability,<br />scientific confidence decreases for records further
          in the past.
        </p>
        <p>Find out more by investigating</p>
        <p>
          <a href="https://nsidc.org/sites/nsidc.org/files/G10010_V002.0.pdf"
            >detailed data source descriptions</a
          ><br />
          and<br />
          <a
            href="https://www.tandfonline.com/doi/abs/10.1111/j.1931-0846.2016.12195.x"
            >methodology used to synthesize data sources</a
          ><br />
        </p>
        <h5>Download data for Alaska</h5>
        <p>
          Includes only the Alaska portion of the Historical Sea Ice Atlas,<br />
          compiled from the sources listed here.
          <br />
          <a
            href="http://ckan.snap.uaf.edu/dataset/historical-sea-ice-atlas-observed-estimates-of-sea-ice-concentration-in-alaska-waters"
            >Download the dataset</a
          >
        </p>
        <h5>Get in touch</h5>
        <p>
          <a
            target="_new"
            href="https://uaf-iarc.typeform.com/to/mN7J5cCK#tool=Historical%20Sea Ice%20Atlas%20for%20Alaska%20&%20The%20Arctic"
            >Send us feedback</a
          >
          or email
          <a href="mailto:nlfresco@alaska.edu">nlfresco@alaska.edu</a> if you
          have questions.
        </p>
      </div>
    </section>
    <mv-footer></mv-footer>
  </div>
</template>
<script>
/* eslint new-cap: "off" */

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import proj4 from "proj4";
import p4l from "proj4leaflet"; /* eslint-disable-line */
import _ from "lodash";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import moment from "moment";
import { Plotly } from "vue-plotly";
import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";
import Multiselect from "vue-multiselect";

import Footer from "./components/Footer";

import communities from "./communities.js";

// Convert an integer (0 - end of data series)
// into two strings: one for display,
// and the other for the WMS request.
var getDateFromInteger = function(year, month) {
  var dateObj = moment({ day: 1, month: month, year: year });
  return {
    display: dateObj.format("MMMM YYYY"),
    wms: '"' + dateObj.format("YYYY-MM-DDT00:00:00.000[Z]") + '"'
  };
};

// Range of years
var xrange = [];
for (let x = 1850; x <= 2017; x++) {
  xrange.push(x);
}

var months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
};

export default {
  name: "HSIAA",
  components: {
    VueSlider,
    Plotly,
    Multiselect,
    "mv-footer": Footer
  },
  created() {
    this.communities = communities;
    this.debouncedUpdateAtlas = _.debounce(this.updateAtlas, 500);
  },
  mounted() {
    this.map = L.map("map--main", this.getBaseMapAndLayers());
    new L.Control.Zoom({ position: "topright" }).addTo(this.map);
    this.updateAtlas();

    this.map.on("click", _.debounce(this.handleMapClick, 200));
    // Necessary to see the markers .
    L.Icon.Default.imagePath = this.baseURL;
  },
  data() {
    return {
      baseURL: process.env.BASE_URL,
      // Corresponds to marks on the vue-slider-component
      marks: [1850, 1875, 1900, 1925, 1950, 1975, 2000, 2017],
      baseLayerOptions: {
        transparent: true,
        srs: "EPSG:3572",
        format: "image/png",
        version: "1.3.0",
        continuousWorld: true // needed for non-3857 projs
      },

      // What year?
      selectedDate: 1850,

      // Increments/decrements month.
      monthOffset: 0,

      // Date displayed on the map.
      displayDate: "",

      // Community select value
      community: "",
      communityName: "",
      communities: {}, // loaded from external file
      foldoutTitle: "", // set when the community or place is picked

      // Updated when we get a successful timeseries back.
      // Triggers repaint of Plotly charts.
      timeseriesData: undefined,

      // Actively selected month for concentration chart (0-11, ...)
      selectedMonthOrSeason: [{ number: 0, month: "January" }],

      multiselectOptions: [
        { number: 0, month: "January" },
        { number: 1, month: "February" },
        { number: 2, month: "March" },
        { number: 3, month: "April" },
        { number: 4, month: "May" },
        { number: 5, month: "June" },
        { number: 6, month: "July" },
        { number: 7, month: "August" },
        { number: 8, month: "September" },
        { number: 9, month: "October" },
        { number: 10, month: "November" },
        { number: 11, month: "December" }
      ],

      // Plotly layout objects
      concentrationPlotData: [], // default empty
      concentrationPlotLayout: {},
      modebarbuttonstoremove: [
        "zoom2d",
        "pan2d",
        "select2d",
        "lasso2d",
        "zoomIn2d",
        "zoomOut2d",
        "autoScale2d",
        "resetScale2d",
        "hoverClosestCartesian",
        "hoverCompareCartesian",
        "hoverClosestPie",
        "hoverClosest3d",
        "hoverClosestGl2d",
        "hoverClosestGeo",
        "toggleHover",
        "toggleSpikelines"
      ],
      monthlyToImageButtonOptions: {
        format: "png",
        filename: "sea_ice_concentration_plot",
        height: 800,
        width: 1200,
        scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
      },
      histogramToImageButtonOptions: {
        format: "png",
        filename: "sea_ice_concentration_histogram",
        height: 800,
        width: 1200,
        scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
      },
      thresholdChartData: [],
      thresholdChartLayout: {},

      // Lat, lng of current point in EPSG:3857
      latDeg: 0,
      lngDeg: 0,

      // Leaflet Marker object for active point on map.
      marker: undefined,

      // If true, the map slides to the left and a report for
      // a map click is shown.
      foldoutActive: false,

      // Once a data value is loaded, show the results.
      // Probably want to do something tricky in case the
      // user wants to to back to a selected point again.
      reportIsLoaded: false,

      // If true, the selected pixel on the map has data.
      validMapPixel: false
    };
  },
  watch: {
    selectedDate() {
      this.debouncedUpdateAtlas();
    },
    selectedMonthOrSeason() {
      this.updateConcentrationPlot();
    },
    community() {
      // Guard so if user switches back to "Choose a community..."
      // it doesn't fail.
      if (this.community) {
        // Find the community name by looking it up in the
        // nested `communities` objects.  This is a little gross,
        // but works.
        let placeName = "";
        _.forEach(communities, region => {
          let placeObj = _.find(region.places, { place: this.community });
          if (placeObj) {
            placeName = placeObj.name;
          }
        });
        this.communityName = placeName;
        var lat = Number(this.community.split(",")[0]);
        var lng = Number(this.community.split(",")[1]);
        var latlng = new L.latLng(lat, lng);
        this.pullData(latlng);
      }
    },
    timeseriesData() {
      this.updateConcentrationPlot();
      this.updateThresholdPlot();
    },
    monthOffset: function() {
      this.debouncedUpdateAtlas();
    }
  },
  methods: {
    getBaseMapAndLayers() {
      var baseLayer = new L.tileLayer.wms(
        "http://54.190.34.177:8080/geoserver/wms",
        {
          transparent: true,
          srs: "EPSG:3572",
          format: "image/png",
          version: "1.3.0",
          continuousWorld: true, // needed for non-3857 projs
          layers: ["arctic_osm_3572"]
        }
      );

      // Projection definition.
      var proj = new L.Proj.CRS(
        "EPSG:3572",
        "+proj=laea +lat_0=90 +lon_0=-150 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
        {
          resolutions: [4096, 2048, 1024, 512, 256, 128, 64],
          origin: [-4889334.802954878, -4889334.802954878]
        }
      );

      // trust me 🥳
      // Without this (= pi/2), proj4js returns an undefined
      // value for tiles requested at the North Pole and
      // it causes a runtime exception.
      proj.projection._proj.oProj.phi0 = 1.5708;

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
      };

      return config;
    },
    decrementMonth() {
      this.monthOffset -= 1;
      if (this.monthOffset < 0) {
        this.monthOffset = 11;
        var newDate = this.selectedDate - 1;
        if (newDate < 1850) {
          newDate = 1850;
          this.monthOffset = 0;
        }
        this.selectedDate = newDate;
      }
    },
    incrementMonth() {
      this.monthOffset += 1;
      if (this.monthOffset > 11) {
        this.monthOffset = 0;
        var newDate = this.selectedDate + 1;
        if (newDate > 2017) {
          newDate = 2017;
          this.monthOffset = 11;
        }
        this.selectedDate = newDate;
      }
    },
    getChartTitlePlaceFragment() {
      if (!this.community) {
        return `Sea Ice Concentration at ${this.latDeg}ºN, ${this.lngDeg}ºE`;
      } else {
        return `Sea Ice Concentration, ${this.communityName} (${this.latDeg}ºN, ${this.lngDeg}ºE)`;
      }
    },
    updateConcentrationPlot() {
      if (this.timeseriesData) {
        let traces = [];
        let monthFragment = "";
        // Month was selected
        if (!isNaN(Number(this.selectedMonthOrSeason.number))) {
          let y = this.timeseriesData.filter((value, index) => {
            return index % 12 === Number(this.selectedMonthOrSeason.number);
          });
          // Draw the sea ice concentration plot.
          traces = [
            {
              x: xrange,
              y: y,
              type: "scatter"
            }
          ];
          monthFragment = months[this.selectedMonthOrSeason.number];
        } else {
          // Add a series of traces for the season
          traces = this.selectedMonthOrSeason.map(month => {
            monthFragment = monthFragment + months[month.number] + ", ";
            let y = this.timeseriesData.filter((value, index) => {
              return index % 12 === Number(month.number);
            });
            return {
              x: xrange,
              y: y,
              type: "scatter",
              name: months[month.number]
            };
          });
          // Removes additional space and comma from title of month's chosen
          monthFragment = monthFragment.substring(0, monthFragment.length - 2);
        }

        let title = this.getChartTitlePlaceFragment();

        this.concentrationPlotLayout = {
          title: `<b>${title}, ${monthFragment}, 1850-2019</b>`,
          xaxis: {
            range: [1850, 2017],
            fixedrange: true
          },
          yaxis: {
            range: [0, 105],
            fixedrange: true
          },
          legend: { orientation: "h" }
        };
        this.concentrationPlotData = traces;
      }
    },
    updateThresholdPlot() {
      if (this.timeseriesData) {
        var x = [];
        var y = [];

        let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        xrange.forEach(year => {
          months.forEach(month => {
            let dataIndex = (year - 1850) * 12 + (month - 1);
            // Loop as many times as the %conc to fake the "histogram!"
            for (let i = 1; i <= this.timeseriesData[dataIndex]; ++i) {
              x.push(month);
              y.push(year);
            }
          });
        });

        let title = this.getChartTitlePlaceFragment();

        this.thresholdChartLayout = {
          title: `<b>${title}, 1850-2017</b>`,
          height: 1500,
          legend: { orientation: "h" },
          yaxis: {
            type: "category",
            fixedrange: true,
            range: xrange,
            autotick: false,
            tick0: 1850,
            dtick: 5
          },
          xaxis: {
            side: "top",
            tickmode: "array",
            tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            ticktext: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ]
          }
        };
        this.thresholdChartData = [
          {
            x: x,
            y: y,
            hovertemplate:
              "Month: %{x}</br></br>Year: %{y}</br>Concentration Percentage: %{z}%<extra></extra>",
            type: "histogram2d",
            autocolorscale: false,
            colorscale: "YlGnBu",
            zmin: 0,
            zmax: 100
          }
        ];
      }
    },
    updateAtlas() {
      var dates = getDateFromInteger(this.selectedDate, this.monthOffset);
      this.displayDate = dates.display;
      if (this.layer) {
        this.map.removeLayer(this.layer);
      }
      this.layer = L.tileLayer.wms(
        "http://apollo.snap.uaf.edu:8080/rasdaman/ows?",
        _.extend(this.baseLayerOptions, {
          layers: ["hsia_panarctic2"],
          styles: "hsia",
          version: "1.3.0",
          time: dates.wms
        })
      );
      this.map.addLayer(this.layer);
    },
    dateFormatter(dateVal) {
      return getDateFromInteger(dateVal).display;
    },
    pullData(latlng) {
      // Recenter the map to this place.
      this.map.panTo(latlng);

      // If the foldout was active, then clicking on the exposed map
      // is the same as "go back" but won't fire a new load attempt.
      if (this.foldoutActive === true) {
        this.foldoutActive = false;
        return;
      }

      // If the foldout was hidden, then this is an attempt to load new data.  Activate the foldout and try and load new stuff.
      // Setting reportIsLoaded to false ensures the spinner is shown.
      this.foldoutActive = true;
      this.reportIsLoaded = false;

      // Set the current latlng in the app context
      this.latlng = latlng;

      // Set the month shown via the map to be the concentration map's initial selection
      this.selectedMonthOrSeason = [
        { number: this.monthOffset, month: months[this.monthOffset] }
      ];

      // If we've already got a point on the map, clear it out
      // until we know if this point is valid or not.
      if (this.marker) {
        this.map.removeLayer(this.marker);
        this.marker = undefined;
      }

      // Set the current lat/lng (in EPSG:3857), for display.
      this.latDeg = Number.parseFloat(latlng.lat).toFixed(2);
      this.lngDeg = Number.parseFloat(latlng.lng).toFixed(2);
      let titleFragment = this.getChartTitlePlaceFragment();
      this.foldoutTitle = `${titleFragment}`;

      // Define and perform Rasdaman query to get the data
      var coords = proj4("EPSG:4326", "EPSG:3572", [latlng.lng, latlng.lat]);
      var query =
        "http://apollo.snap.uaf.edu:8080/rasdaman/ows?&SERVICE=WCS&VERSION=2.0.1&REQUEST=GetCoverage&COVERAGEID=hsia_panarctic&SUBSET=X(" +
        coords[0] +
        ")&SUBSET=Y(" +
        coords[1] +
        ")&FORMAT=application/json";

      return new Promise(resolve => {
        axios
          .get(query, { timeout: 10000 })
          .then(res => {
            if (res) {
              // Set the report as loaded.
              this.reportIsLoaded = true;
              this.timeseriesData = res.data;

              // Put a marker / popup on the map to show the
              // sidebar again.
              this.marker = L.marker(latlng);
              this.marker.addTo(this.map);

              // If returned data are all 0's, it's an invalid pixel
              // (or literally never sea ice).  Tell user, and don't
              // show the graphs.
              const reducer = (accumulator, currentValue) =>
                accumulator + currentValue;
              let sum = this.timeseriesData.reduce(reducer);

              if (sum === 0) {
                this.validMapPixel = false;
                resolve();
                return;
              }

              // Show the reports.
              this.validMapPixel = true;

              resolve();
            }
          })
          .catch(error => {
            // TODO Something failed, show an error note.
            this.validMapPixel = false;
            console.error(error);
            resolve();
            return;
          });
      });
    },
    handleMapClick(event) {
      // Unset the community value (to "" gives it the right value)
      this.community = "";
      return this.pullData(event.latlng);
    }
  }
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Imbue:wght@600&display=swap");

@import url("https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap");

@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap");

p,
h1,
h2,
h3,
h4,
h5,
label,
footer {
  font-family: "Libre Caslon Text", serif;
  color: #1b3f7c;
}

a {
  text-decoration: underline;
  display: inline-block;
}

a:hover {
  background-color: #ffe598;
}

a.button,
.button,
select,
div.button > span,
.multiselect * {
  font-family: "Open Sans", sans-serif !important;
}

header {
  text-transform: uppercase;
  background-color: #0c2342;
  color: white;
  text-align: center;
  font-size: 0.75rem;
  letter-spacing: 0.17rem;
  padding: 0.4rem;
  min-height: 2rem;
}

section.lead {
  margin-top: 0;
  border-top: 1px solid #fff;
  padding-top: 0;
  .columns {
    margin: -0.75rem -2.25rem;
    .column.intro {
      text-align: center;
      h1 {
        margin-top: 1rem;
        margin-left: 1rem;
        margin-right: 1rem;
        font-family: "Imbue", serif;
        font-weight: 600;
        font-style: normal;
        font-size: 4.5rem;
        line-height: 1;
        text-transform: uppercase;
      }
      h2,
      h3 {
        font-weight: 400;
        font-style: italic;
        font-size: 2.25rem;
        margin-right: 1rem;
        margin-left: 1rem;
        span {
          font-size: 2.25rem;
          text-transform: uppercase;
          font-weight: 400;
          font-style: italic;
        }
        line-height: 1;
      }
      h2 {
        margin-top: 1rem;
      }
      h3 {
        margin-top: 0.5rem;
      }
    }
  }
}

.camera-icon span {
  display: inline-block;
  position: relative;
  top: 0.25rem;
  padding: 0 3px;
}
.camera-icon span path {
  fill: #ccc;
}

section.lede {
  text-align: center;
  div {
    margin: 0 auto;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
    p {
      margin-top: 2rem;
      font-size: 22px;
      font-weight: 400;
      line-height: 1.6;
      font-style: italic;
    }
    p.announce {
      font-family: "Imbue", serif;
      font-weight: 600;
      font-style: normal;
      font-size: 3.8rem;
      line-height: 0.9;
      text-transform: uppercase;
    }
  }
}

.centered--wrapper {
  margin: 0 auto;
  font-size: 1.2rem;
  text-align: center;
  line-height: 1.6;
}

.disclaimer {
  margin-bottom: 0.75rem;
}

section.about .start {
  font-size: 1.4rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.explainer,
.data-sources {
  h4 {
    font-size: 1.8rem;
    font-weight: 700;
  }
  h5 {
    margin-top: 2rem;
    font-weight: 700;
    font-size: 1.5rem;
  }
}

.explainer h5.closer {
  margin-top: 1rem;
}

.explainer h5 span {
  font-size: 1.25rem;
  font-weight: 400;
}

section.data-sources {
  margin-bottom: 3rem;
}

section.foldout {
  padding: 0;
  margin-top: 0;
  margin-bottom: 3rem;
  position: relative;
}

.month-indicator {
  padding-left: 3px;
  font-weight: 500;
}

section.videos {
  margin-top: -6.5rem;
  h5 {
    text-align: center;
    margin: 1rem;
    font-size: 1.25rem;
    font-weight: 700;
  }
}

span.hint {
  margin: 1ex;
  display: inline-block;
  font-family: "Open Sans", sans-serif;
}

.youtube-videos {
  width: 100%;
  min-height: 350px;
}

.overview {
  margin-bottom: 1rem;
}

#map--main {
  display: block;
  position: relative;
  min-height: 100vh;
  width: 100vw;
}

.location--drop-down {
  &.hidden {
    display: none;
  }
}

.map--section--wrapper {
  display: grid;

  grid-template-columns: 100vw 85vw;
  grid-gap: 1.5rem;

  width: 200vw;

  .map--direct-wrapper {
    position: relative;
    height: 90vh;
    opacity: 1;
    transition: transform 0.5s ease;

    &.sidelined {
      opacity: 0.3;
      transform: translateX(-95vw);
      -webkit-transform: translateX(-95vw);

      // Move the zoom control so it's hidden
      // when the foldout is active
      ::v-deep .leaflet-right .leaflet-control.leaflet-control-zoom {
        margin-right: 5vw;
      }
    }

    .map--wrapper {
      height: 90vh;
      position: relative;

      .map--overlay-wrapper {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.8);
        top: 0;
        left: 0;
        padding: 0 1rem 1rem 1rem;
        z-index: 10000;
        width: 50vw;

        .map--legend {
          font-family: "Open Sans", sans-serif;
          background-color: #fff;
          margin: 0 auto;
          box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56);
          width: 100%;
          tbody tr {
            color: #fff;
            font-weight: 700;
            text-align: center;
            & td {
              font-size: 0.7rem;
              padding: 0.25rem;
              &.conc--1 {
                width: 33%;
                background-color: rgba(8, 29, 88, 255) !important;
              }
              &.conc--2 {
                background-color: rgba(37, 52, 148, 255) !important;
              }
              &.conc--3 {
                background-color: rgba(34, 94, 168, 255) !important;
              }
              &.conc--4 {
                background-color: rgba(29, 145, 192, 255) !important;
                text-shadow: 0 0 3px #000;
              }
              &.conc--5 {
                background-color: rgba(65, 182, 196, 255) !important;
                text-shadow: 0 0 3px #000;
              }
              &.conc--6 {
                background-color: rgba(127, 205, 187, 255) !important;
                color: rgba(8, 29, 88, 255);
              }
              &.conc--7 {
                background-color: rgba(199, 233, 180, 255) !important;
                color: rgba(8, 29, 88, 255);
              }
              &.conc--8 {
                background-color: rgba(237, 248, 217, 255) !important;
                color: rgba(8, 29, 88, 255);
              }
            }
          }
        }

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

  .report--section {
    position: relative;
    text-align: center;

    // When the report is not shown (no `sideline` class)
    // we need to clip it.
    overflow-y: hidden;
    padding-left: 1.5rem;

    &.sidelined {
      height: auto;
      transition: transform 0.5s ease;
      transform: translateX(-95vw);
      -webkit-transform: translateX(-95vw);
    }

    .loading-spinner {
      margin: 2rem 0;

      &.hidden {
        display: none;
      }

      .loading-spinner--wrapper {
        position: relative;
        span.icon {
          position: relative;
          top: 0.4rem;
        }
      }
    }

    .report--loaded {
      margin: 2rem 0;
      &.hidden,
      .hidden {
        display: none;
      }

      .report--charts {
        label {
          display: none;
        }
        p {
          font-size: 1.25rem;
          max-width: 40rem;
          margin: 1rem auto;

          &.between {
            margin: 2rem auto 3rem;
          }
        }

        table.threshold--legend {
          font-family: "Open Sans", sans-serif;
          margin: 1rem auto;
          max-width: 50rem;
          background-image: linear-gradient(
            to right,
            rgba(8, 29, 88, 255),
            rgba(37, 52, 148, 255),
            rgba(34, 94, 168, 255),
            rgba(29, 145, 192, 255),
            rgba(65, 182, 196, 255),
            rgba(127, 205, 187, 255),
            rgba(199, 233, 180, 255),
            rgba(237, 248, 217, 255)
          );

          thead {
            td {
              font-size: 1rem;
              font-weight: 700;
            }
          }
          tbody {
            font-weight: 700;
            tr {
              td {
                width: 33%;
                padding: 0.25rem;
              }
              td.th--1 {
                color: #fff;
                text-align: left;
              }
              td.th--50 {
                color: #fff;
                text-align: center;
                text-shadow: 0 0 3px #000;
              }
              td.th--100 {
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
}

.control--select {
  width: 25vw;
  margin: 0 auto;
}

.report--invalid p {
  margin: 3rem auto;
  width: 50rem;

  a {
    display: block;
    margin-top: 1rem;
  }
}

/* Putting these at the end to override other stuff */
.mobile--warnings {
  background-color: #ffffcc;
  margin: 1rem auto;
  padding: 1rem;
  max-width: 40rem;

  &.portrait,
  &.landscape {
    display: none;
  }
}

@media (max-width: 784px) {
  // Show the mobile warning for landscape.
  .mobile--warnings.landscape {
    display: block;
  }
  // Hide the map, but allow the reports to be shown.
  .map--section--wrapper {
    .map--direct-wrapper {
      height: 0;
      .map--wrapper {
        display: none;
      }
    }
    .report--section {
      margin: -1rem 0 -8rem -2rem !important;
      padding: 0 !important;
      .back {
        display: none;
      }
    }
  }
}

@media (max-width: 315px) {
  .mobile--warnings.landscape {
    display: none !important;
  }
  // Show the mobile warning for landscape.
  .mobile--warnings.portrait {
    display: block;
  }
  .map--section--wrapper {
    display: none;
  }
}
</style>
