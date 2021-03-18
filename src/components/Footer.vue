<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="logo column is-one-fifth">
          <img src="../assets/UAF.svg" alt="UAF Logo" />
        </div>
        <div class="column is-four-fifths">
          <p>
            This tool was developed by the
            <a href="http://www.aoos.org/">Alaska Ocean Observing System</a>
            (AOOS), the
            <a href="https://uaf-accap.org"
              >Alaska Center for Climate Assessment and Policy</a
            >, and the
            <a href="https://www.snap.uaf.edu/" title="👍"
              >Scenarios Network for Alaska and Arctic Planning</a
            >.
          </p>

          <p>
            Funded by the National Ocean Service at the
            <a href="http://www.noaa.gov"
              >National Oceanic and Atmospheric Administration</a
            >
            through AOOS grant #NA11NOS0120020. Work was performed at the
            <a href="https://uaf-iarc.org/"
              >International Arctic Research Center</a
            >, at the
            <a href="https://uaf.edu/uaf/">University of Alaska Fairbanks</a>,
            with assistance from the
            <a href="https://illinois.edu/"
              >University of Illinois, Urbana-Champaign</a
            >.
          </p>

          <p>
            Copyright &copy; {{ year }} University of Alaska Fairbanks. All
            rights reserved.
          </p>
          <p>
            UA is an AA/EO employer and educational institution and prohibits
            illegal discrimination against any individual.
            <a href="https://www.alaska.edu/nondiscrimination/"
              >Statement of Nondiscrimination</a
            >
            and
            <a
              href="https://www.alaska.edu/records/records/compliance/gdpr/ua-privacy-statement/"
              >Privacy Statement</a
            >
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterV2",
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>

<style lang="scss" scoped>
.footer {
  box-shadow: inset 0 7px 9px -7px rgba(0, 0, 0, 0.4);

  .logo {
    text-align: center;
    img {
      position: relative;
      top: 0.25rem;
      width: 75%;
      max-width: 40vw;
    }
  }

  p {
    margin: 1rem;
  }
}
</style>
