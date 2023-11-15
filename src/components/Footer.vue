<script setup>
import { computed } from 'vue'
const year = computed(() => {
  return new Date().getFullYear()
})
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="logo column is-one-fifth">
          <img src="@/assets/UAF.svg" alt="UAF Logo" />
        </div>
        <div class="column is-four-fifths">
          <p class="mb-3">
            This tool was developed by the
            <a href="http://www.aoos.org/">Alaska Ocean Observing System</a>
            (AOOS), the
            <a href="https://uaf-accap.org">Alaska Center for Climate Assessment and Policy</a>, and
            the
            <a href="https://www.snap.uaf.edu/" title="👍"
              >Scenarios Network for Alaska and Arctic Planning</a
            >.
          </p>

          <p class="mb-3">
            Funded by the National Ocean Service at the
            <a href="http://www.noaa.gov">National Oceanic and Atmospheric Administration</a>
            through AOOS grant #NA11NOS0120020. Work was performed at the
            <a href="https://uaf-iarc.org/">International Arctic Research Center</a>, at the
            <a href="https://uaf.edu/uaf/">University of Alaska Fairbanks</a>, with assistance from
            the <a href="https://illinois.edu/">University of Illinois, Urbana-Champaign</a>.
          </p>

          <p class="mb-3">
            This tool uses the
            <a href="https://doi.org/10.5281/zenodo.1040170">Rasdaman raster database</a>
            for data storage, processing, and web services.
          </p>

          <p class="mb-3">Copyright &copy; {{ year }} University of Alaska Fairbanks. All rights reserved.</p>

          <p class="mb-3">
            UA is an AA/EO employer and educational institution and prohibits illegal discrimination
            against any individual.
            <a href="https://www.alaska.edu/nondiscrimination/">Statement of Nondiscrimination</a>
            and
            <a href="https://www.alaska.edu/records/records/compliance/gdpr/ua-privacy-statement/"
              >Privacy Statement</a
            >
          </p>
          <p>
            UA is committed to providing accessible websites.
            <a href="https://www.alaska.edu/webaccessibility/"
              >Learn more about UA&rsquo;s notice of web accessibility</a
            >. If we can help you access this website&rsquo;s content,
            <a href="mailto:uaf-snap-data-tools@alaska.edu">email us</a>!
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
</style>
