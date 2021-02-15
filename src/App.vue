<template>
  <div>
    <div class="header-wrapper">
      <mv-header logo="accap" :buttons="navbuttons"></mv-header>
    </div>

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

        <div class="column splash is-half"></div>
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
        <p class="overview">
          View historical sea ice data from the seas around the circumpolar
          North<br />
          and discover how ice concentration have changed over time.
        </p>
        <p class="overview">
          This Atlas shows snapshots in time, as well as long term patterns.<br />
          It is not designed for forecasting or prediction,<br />
          but can provide historical context for planning efforts.
        </p>
        <div class="explainer">
          <h4>
            This Atlas shows sea ice concentration
          </h4>
          <h5>Sea ice concentration = ratio of sea ice to water</h5>
          <p>
            &lt;30% sea ice concentration = ships can sail here. <br />&gt;90% =
            solid ice.
          </p>
          <h5>
            <a href="https://nsidc.org/cryosphere/quickfacts/seaice.html"
              >Learn more about sea ice</a
            >
          </h5>
        </div>
        <p class="start">
          To begin, choose a community or click on the map.
        </p>
        <div
          class="location--drop-down"
          v-bind:class="{ hidden: foldoutActive }"
        >
          <form>
            <div class="select control is-medium">
              <select v-model="community">
                <option value="">Choose a community&hellip;</option>
                <optgroup label="Alaska communities">
                  <option value="62.6851300839551,-165.051458350888"
                    >Alakanuk, AK</option
                  >
                  <option value="65.2839013106643,-166.543276878432"
                    >Brevig Mission, AK</option
                  >
                  <option value="54.8928703605601,-162.585689817175"
                    >Cold Bay, AK</option
                  >
                  <option value="66.215846873033,-162.686018873669"
                    >Deering, AK</option
                  >
                  <option value="58.6984670397717,-158.604182960483"
                    >Dillingham, AK</option
                  >
                  <option value="65.7450538858085,-168.982175323199"
                    >Diomede, AK</option
                  >
                  <option value="58.217525752542,-157.610129237119"
                    >Egegik, AK</option
                  >
                  <option value="58.808756,-158.569142">Ekuk, AK</option>
                  <option value="64.55918135633,-162.105188401375"
                    >Elim, AK</option
                  >
                  <option value="62.8222221972983,-164.936452924562"
                    >Emmonak, AK</option
                  >
                  <option value="64.4814106580503,-165.422359375284"
                    >Fort Davis, AK</option
                  >
                  <option value="63.8090755288085,-171.755535579505"
                    >Gambell, AK</option
                  >
                  <option value="64.3832176116423,-162.956763792118"
                    >Golovin, AK</option
                  >
                  <option value="59.1729106218548,-161.775521544658"
                    >Goodnews Bay, AK</option
                  >
                  <option value="61.5093172991055,-166.002724660499"
                    >Hooper Bay, AK</option
                  >
                  <option value="70.1927932513101,-143.639697294833"
                    >Kaktovik, AK</option
                  >
                  <option value="60.1052439609978,-164.479848278604"
                    >Kipnuk, AK</option
                  >
                  <option value="67.6417368319659,-164.673004082018"
                    >Kivalina, AK</option
                  >
                  <option value="59.9141493639226,-162.893349156378"
                    >Kongiganak, AK</option
                  >
                  <option value="63.1143882756083,-163.412739594096"
                    >Kotlik, AK</option
                  >
                  <option value="66.8287674399298,-162.784051401057"
                    >Kotzebue, AK</option
                  >
                  <option value="64.7047630607052,-161.161760498773"
                    >Koyuk, AK</option
                  >
                  <option value="59.8441824426393,-163.117809247724"
                    >Kwigillingok, AK</option
                  >
                  <option value="60.5077800612199,-166.277527564528"
                    >Mekoryuk, AK</option
                  >
                  <option value="58.6516550698052,-157.466986930608"
                    >Naknek, AK</option
                  >
                  <option value="56.0832824650499,-161.222756583751"
                    >Nelson Lagoon, AK</option
                  >
                  <option value="60.8843376204438,-165.15993447947"
                    >Newtok, AK</option
                  >
                  <option value="64.4814106580503,-165.452359375284"
                    >Nome, AK</option
                  >
                  <option value="62.5790920702393,-165.204312655182"
                    >Nunam Iqua, AK</option
                  >
                  <option value="57.59939366239,-157.833296426434"
                    >Pilot Point, AK</option
                  >
                  <option value="58.9871442717979,-161.950343490552"
                    >Platinum, AK</option
                  >
                  <option value="68.2884307616777,-166.876912959572"
                    >Point Hope, AK</option
                  >
                  <option value="69.7262618857318,-163.385572237574"
                    >Point Lay, AK</option
                  >
                  <option value="56.959948218085,-158.825768650723"
                    >Port Heiden, AK</option
                  >
                  <option value="70.4487179863218,-148.033321138673"
                    >Prudhoe Bay, AK</option
                  >
                  <option value="59.7347453630506,-162.003149760407"
                    >Quinhagak, AK</option
                  >
                  <option value="63.7325806762895,-169.470088541689"
                    >Savoonga, AK</option
                  >
                  <option value="61.8728846470491,-165.733313425583"
                    >Scammon Bay, AK</option
                  >
                  <option value="64.2601704074258,-161.45302011971"
                    >Shaktoolik, AK</option
                  >
                  <option value="66.217626405847,-166.227577594336"
                    >Shishmaref, AK</option
                  >
                  <option value="56.6332792236121,-169.530826798787"
                    >St. George, AK</option
                  >
                  <option value="63.5982681460881,-161.854029767968"
                    >St. Michael, AK</option
                  >
                  <option value="57.1088351477948,-170.254768664541"
                    >St. Paul, AK</option
                  >
                  <option value="63.5054317849543,-162.410429528882"
                    >Stebbins, AK</option
                  >
                  <option value="65.2839013106643,-166.543276878432"
                    >Teller, AK</option
                  >
                  <option value="58.9422727621214,-160.438188485022"
                    >Togiak, AK</option
                  >
                  <option value="60.4958384778163,-165.112175247689"
                    >Toksook Bay, AK</option
                  >
                  <option value="60.6948225298798,-165.356563870896"
                    >Tununak, AK</option
                  >
                  <option value="60.4958384778163,-165.112175247689"
                    >Umkumiut, AK</option
                  >
                  <option value="63.8501941017296,-161.260957590821"
                    >Unalakteet, AK</option
                  >
                  <option value="71.4713063075264,-156.665176932233"
                    >Utqiaġvik, AK</option
                  >
                  <option value="70.787461075763,-160.265186401037"
                    >Wainwright, AK</option
                  >
                  <option value="65.5785629514697,-168.28334108969"
                    >Wales, AK</option
                  >
                </optgroup>
                <optgroup label="North West Territory communities">
                  <option value="69.9610863947203,-123.661517656453"
                    >Paultuak, NWT</option
                  >
                  <option value="71.8632712337163,-125.482112134379"
                    >Sachs Harbour, NWT</option
                  >
                  <option value="69.6835584167738,-133.371989420137"
                    >Tuktoyaktuk, NWT</option
                  >
                </optgroup>
                <optgroup label="Russian communities">
                  <option value="67.8909773649486,-175.614923904914"
                    >Ванкарем, RU</option
                  >
                  <option value="66.3529324921101,-170.27006503675"
                    >Инчоун, RU</option
                  >
                  <option value="65.8932829095358,-178.875266395884"
                    >Конергино, RU</option
                  >
                  <option value="65.3616386823124,-170.303365741367"
                    >Лаврентия, RU</option
                  >
                  <option value="65.4372201267222,-171.663454294326"
                    >Лорино, RU</option
                  >
                  <option value="67.0633662935393,-172.870441076511"
                    >Нешкан, RU</option
                  >
                  <option value="64.4275690840349,-172.14258985466"
                    >Новое Чаплино, RU</option
                  >
                  <option value="64.7547774117121,-175.486856576098"
                    >Нунлигран, RU</option
                  >
                  <option value="67.5528205102073,-174.700141908481"
                    >Нутэпэльмен, RU</option
                  >
                  <option value="64.3030720574871,-174.094925268185"
                    >Сиреники, RU</option
                  >
                  <option value="66.2173014811322,-169.734038988469"
                    >Уэлен, RU</option
                  >
                  <option value="65.0015999276741,-175.911858185307"
                    >Энмелен, RU</option
                  >
                  <option value="66.9733669397493,-171.808380256471"
                    >Энурмино, RU</option
                  >
                  <option value="64.88179603077,-172.345075328797"
                    >Янракыннот, RU</option
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
                <thead>
                  <tr>
                    <th scope="col">Sea Ice<br />Concentration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="conc--90">
                    <td>&gt;90&#37;</td>
                  </tr>
                  <tr class="conc--30">
                    <td>30&#37;&ndash;90&#37;</td>
                  </tr>
                  <tr class="conc--1">
                    <td>&lt;30&#37;</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div id="map--main"></div>
            <!-- Slider wrapper! -->
            <div class="slider-wrapper">
              <p class="date--display--date">{{ displayDate }}</p>
              <vue-slider
                v-model="selectedDate"
                :height="20"
                :min="1850"
                :max="2019"
                :hide-label="true"
              />
              <span v-on:click="decrementMonth" class="button">
                <i class="fas fa-arrow-alt-circle-left" /><span
                  class="month-indicator"
                  >Past Month</span
                >
              </span>
              <span
                v-on:click="incrementMonth"
                class="button"
                style="margin-left: 5px;"
              >
                <i class="fas fa-arrow-alt-circle-right" /><span
                  class="month-indicator"
                  >Next Month</span
                >
              </span>
            </div>
          </div>
        </div>

        <div
          v-bind:class="{ sidelined: foldoutActive }"
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
                any data! This means it was either on land or otherwise outside
                of the dataset itself. Zooming in on the map can make it easier
                to choose a location.
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
              <h3 class="title is-4">
                Sea ice concentation, 1850&ndash;2019 at {{ latDeg }}&deg;N,
                {{ lngDeg }}&deg;E
              </h3>
              <p class="lead">
                These charts show two different ways of seeing changes in sea
                ice concentration over time.
              </p>
              <p>
                The first chart lets you pick months, and see sea ice changes
                over time for this place.
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
                          placeholder="Choose desired months"
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
              <p>
                The chart below shows the same information as the one above, but
                uses color instead of lines. It shows every month for every year
                in the Atlas.
              </p>
              <table class="threshold--legend">
                <thead>
                  <tr>
                    <td colspan="3">Color shows sea ice concentration %</td>
                  </tr>
                </thead>
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
        <h5>
          <a href="Historical-Sea-Ice-Extents-Octobers.pdf">Download a poster</a
          ><br /><span
            >that shows 170 images of sea ice concentration for October,
            1850&ndash;2019.</span
          >
        </h5>
        <h5>Watch sea ice concentration animations</h5>
      </div>
    </section>
    <section class="section videos">
      <div class="columns">
        <div class="column is-half">
          <h5>Every month, 1850&ndash;2019</h5>
          <iframe
            class="youtube-videos"
            src="https://www.youtube.com/embed/XSa0iGU0uDY"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="column is-half">
          <h5>By month, i.e. each January, 1850&ndash;2019</h5>
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
        <p>
          <a href="https://nsidc.org/sites/nsidc.org/files/G10010_V002.0.pdf"
            >Detailed data source descriptions</a
          ><br />
          and<br />
          <a
            href="https://www.tandfonline.com/doi/abs/10.1111/j.1931-0846.2016.12195.x"
            >Methodology used to synthesize data sources</a
          ><br />
        </p>
        <h5>Download data</h5>
        <p>
          Includes the entire Historical Sea Ice dataset compiled from the
          sources listed here.<br />
          <a
            href="http://ckan.snap.uaf.edu/dataset/historical-sea-ice-atlas-observed-estimates-of-sea-ice-concentration-in-alaska-waters"
            >Download the dataset.</a
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

import Header from "./components/Header";
import Footer from "./components/Footer";

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
for (let x = 1850; x <= 2019; x++) {
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
    "mv-footer": Footer,
    "mv-header": Header
  },
  created() {
    this.debouncedUpdateAtlas = _.debounce(this.updateAtlas, 500);
  },
  mounted() {
    this.map = L.map("map--main", this.getBaseMapAndLayers());
    new L.Control.Zoom({ position: "topright" }).addTo(this.map);
    this.updateAtlas();

    this.map.on("click", this.handleMapClick);
    // Necessary to see the markers .
    L.Icon.Default.imagePath = "/";
  },
  data() {
    return {
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
      concentrationPlotLayout: {
        title: "Sea Ice Concentration, 1850-2019, January",
        xaxis: {
          range: [1850, 2019],
          fixedrange: true
        },
        yaxis: {
          range: [0, 105],
          fixedrange: true
        },
        legend: { orientation: "h" }
      },
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
      thresholdChartLayout: {
        title: "Sea Ice Concentration, 1850-2019",
        height: 1500,
        yaxis: {
          type: "category",
          fixedrange: true,
          range: xrange,
          autotick: false,
          tick0: 1850,
          dtick: 5
        },
        xaxis: {
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
      },

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
      validMapPixel: false,

      // Nav buttons at top of screen used in header component.
      navbuttons: [
        {
          title: "Download data",
          href:
            "http://ckan.snap.uaf.edu/dataset/historical-sea-ice-atlas-observed-estimates-of-sea-ice-concentration-in-alaska-waters",
          class: "is-default"
        }
      ]
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
        center: [67, -150],
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
        if (newDate > 2019) {
          newDate = 2019;
          this.monthOffset = 11;
        }
        this.selectedDate = newDate;
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
        this.concentrationPlotLayout = {
          title: `Sea Ice Concentration at ${this.latDeg}ºN, ${this.lngDeg}ºE, ${monthFragment}, 1850-2019`,
          xaxis: {
            range: [1850, 2019],
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
        this.thresholdChartLayout = {
          title: `Sea Ice Concentration at ${this.latDeg}ºN, ${this.lngDeg}ºE, 1850-2019`,
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
          layers: ["hsia_arctic"],
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

      // var latlng = event.latlng // preserve context for promise below

      // Define and perform Rasdaman query to get the data
      var coords = proj4("EPSG:4326", "EPSG:3572", [latlng.lng, latlng.lat]);
      var query =
        "http://apollo.snap.uaf.edu:8080/rasdaman/ows?&SERVICE=WCS&VERSION=2.0.1&REQUEST=GetCoverage&COVERAGEID=hsia_arctic&SUBSET=X(" +
        coords[0] +
        ")&SUBSET=Y(" +
        coords[1] +
        ")&FORMAT=application/json&RANGESUBSET=Gray";

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

              // Maybe?  Draw a mini-map zoomed in around the point,
              // with a place marker.

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
      return this.pullData(event.latlng);
    }
  }
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Imbue:wght@600&display=swap");

@import url("https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap");

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

section.lead {
  margin-top: 5px;
  padding-top: 10px;
  border-top: 1px solid #eee;

  .columns {
    width: 100vw;
    height: 90vh;
    .column.intro {
      text-align: center;
      h1 {
        font-family: "Imbue", serif;
        font-weight: 600;
        font-style: normal;
        font-size: 3.8rem;
        line-height: 1;
        text-transform: uppercase;
      }
      h2,
      h3 {
        font-weight: 400;
        font-style: italic;
        font-size: 1.7rem;
        span {
          font-size: 1.7rem;
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
    .column.splash {
      height: 100%;
      background: no-repeat top left url("./assets/hsia-splash.jpg");
      background-size: cover;
    }
  }
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
      font-style: italic;
      line-height: 1.6;
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

.explainer h5 span {
  font-size: 1.25rem;
}

.explainer {
  margin-top: 3rem;
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
  min-height: 90vh;
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
        top: 0;
        left: 0;
        margin: 1.5rem;
        z-index: 10000;

        .map--legend {
          background-color: #fff;
          thead th {
            padding: 0.5rem;
          }
          tbody tr {
            color: #fff;
            font-weight: 700;
            text-align: center;
            & td {
              padding: 0.5rem;
            }
            &.conc--1 td {
              background-color: rgba(180, 180, 180, 1) !important;
              color: #000;
            }
            &.conc--30 td {
              background-color: rgba(100, 100, 100, 1) !important;
            }
            &.conc--90 td {
              background-color: rgba(30, 30, 30, 1) !important;
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
        width: 55rem;
        margin: 1rem auto;

        p.date--display--date {
          font-size: 2rem;
        }
      }
    }
  }

  .report--section {
    position: relative;

    // When the report is not shown (no `sideline` class)
    // we need to clip it.
    overflow-y: hidden;
    height: 100vh;
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
        p {
          font-size: 1.25rem;
          width: 40rem;
          margin: 1rem 0;
        }

        .threshold--legend {
          margin: 1rem auto;
          width: 50rem;
          thead {
            td {
              font-size: 1rem;
              font-weight: 700;
            }
          }
          tbody {
            font-weight: 700;
            tr {
              background: url("./assets/hsia-tapestry-legend.png");
              background-size: cover;
              td {
                width: 33%;
                padding: 0.25rem;
              }
              td.th--1 {
                color: #fff;
              }
              td.th--50 {
                text-align: center;
                text-shadow: 0 0 3px #fff;
              }
              td.th--100 {
                text-align: right;
              }
            }
          }
        }
      }

      .report--invalid {
        margin: 3rem 0;
      }
    }
  }
}

.control--select {
  width: 25vw;
}

.report--invalid p {
  width: 50rem;

  a {
    display: block;
    margin-top: 1rem;
  }
}
</style>
