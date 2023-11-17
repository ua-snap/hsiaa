<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Intro from './components/Intro.vue'
import Footer from './components/Footer.vue'
import "@fortawesome/fontawesome-free/css/all.css";
</script>

<template>
  <div>
    <Header />
    <Intro />

    <div>
      <p class="is-hidden-tablet is-hidden-portrait mx-5 mb-6">
        <span>😓 We&rsquo;re sorry!</span> The interactive map doesn&rsquo;t work on a
        screen this size, but you can still pick a community to see visualizations.
      </p>
      <p class="is-hidden-tablet is-hidden-landscape mx-5">
        <span>⚠️ Oh no!</span> The interactive tools on this site don&rsquo;t work on
        a phone in portrait mode. Turn your phone sideways to pick a community, or try using this
        site on a computer!
      </p>
    </div>

    <RouterView />

    <section class="section has-text-centered mt-5 pb-0">
      <h2 class="is-size-3 pb-3 has-text-weight-bold">Other ways to view sea ice data</h2>
      <div>
        <h5 class="is-size-5 mb-4">
          <a v-bind:href="baseURL + 'Historical-Sea-Ice-Extents-Octobers.pdf'" class="is-size-4 has-text-weight-bold">Download a poster</a
          ><br /><span>that shows 170 images of sea ice concentration for October, {{ MIN_YEAR }}&ndash;{{ MAX_YEAR }}.</span
          >
        </h5>
      </div>
    </section>
    <section class="section has-text-centered videos">
      <h5 class="is-size-4 has-text-weight-bold mb-5">Watch sea ice concentration animations</h5>
      <div class="columns">
        <div class="column is-half">
          <h5>Every month, {{ MIN_YEAR }}&ndash;{{ MAX_YEAR }}</h5>
          <iframe
            src="https://www.youtube-nocookie.com/embed/XSa0iGU0uDY"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="column is-half">
          <h5>Monthly playlist, e.g. each January, {{ MIN_YEAR }}&ndash;{{ MAX_YEAR }}</h5>
          <iframe
            src="https://www.youtube-nocookie.com/embed/videoseries?list=PLHlhXw356_VfeMkTxZHrOx_qSf_ZqrSGW"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>

    <section class="section has-text-centered is-size-5 pb-6 mb-6">
      <div>
        <h4 class="is-size-4 has-text-weight-bold">Data sources used in this Atlas</h4>
        <p>
          Collecting and interpreting sea ice data has always been challenging.<br />
          Charting conventions and interpretations of ice concentration have changed over time.<br />
          Observing tools&mdash;ships (1800s), airplanes (early 1900s), satellites
          (1970s)&mdash;have evolved as well.<br />
        </p>
        <p>
          Atlas data begin with sea ice observations extrapolated from whaling ship log books<br />
          in the Beaufort, Chukchi, and Bering seas starting in {{ MIN_YEAR }}.<br />
          Estimates are used to fill gaps in log book data.<br />
          Other data sources are incorporated as they were developed over time.
        </p>
      </div>
      <img src="@/assets/SourcesChart.svg" />
      <div>
        <h5 class="is-size-4 has-text-weight-bold">More information on sea ice data sources</h5>
        <p>
          While the Atlas data captures much of the historical sea ice variability,<br />scientific
          confidence decreases for records further in the past.
        </p>
        <p class="mt-5">Find out more by investigating</p>
        <p>
          <a href="https://nsidc.org/sites/nsidc.org/files/G10010_V002.0.pdf"
            >detailed data source descriptions</a
          ><br />
          and<br />
          <a href="https://www.tandfonline.com/doi/abs/10.1111/j.1931-0846.2016.12195.x"
            >methodology used to synthesize data sources</a
          ><br />
        </p>
        <h5 class="is-size-4 has-text-weight-bold mt-5">Download data for Alaska</h5>
        <p>
          Includes only the Alaska portion of the Historical Sea Ice Atlas,<br />
          compiled from the sources listed here.
          <br />
          <a
            href="http://ckan.snap.uaf.edu/dataset/historical-sea-ice-atlas-observed-estimates-of-sea-ice-concentration-in-alaska-waters"
            >Download the dataset</a
          >
        </p>
        <h5 class="is-size-4 has-text-weight-bold mt-5">Get in touch</h5>
        <p>
          <a
            target="_new"
            href="https://uaf-iarc.typeform.com/to/mN7J5cCK#tool=Historical%20Sea Ice%20Atlas%20for%20Alaska%20&%20The%20Arctic"
            >Send us feedback</a
          >
          or email
          <a href="mailto:uaf-snap-data-tools@alaska.edu">uaf-snap-data-tools@alaska.edu</a>
          if you have questions.
        </p>
      </div>
    </section>
    <Footer/>
  </div>
</template>

<script>
import { MIN_YEAR, MAX_YEAR } from '@/shared.js'

</script>

<style lang="scss" scoped>
iframe {
  min-height: 350px;
  width: 100%;
}
</style>