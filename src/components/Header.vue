<script setup>
import { useAtlasStore } from '@/stores/atlas'
const { displayMaxDate } = useAtlasStore()
</script>

<template>
  <header>
    <div class="headerbanner">
      University of Alaska Fairbanks | Alaska Center for Climate Assessment and Policy
    </div>

    <div class="columns is-vcentered">
      <div class="column intro is-half">
        <h1>
          Historical<br />
          Sea Ice Atlas
        </h1>
        <h2 class="mt-4">for <span>Alaska</span> &amp; the <span>Arctic</span></h2>
        <h3 class="mt-2">1850 to {{ displayMaxDate }}</h3>
      </div>

      <div class="column splash is-half">
        <img src="@/assets/hsia-splash.jpg" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.headerbanner {
  text-transform: uppercase;
  background-color: #0c2342;
  color: white;
  text-align: center;
  font-size: 0.75rem;
  letter-spacing: 0.17rem;
  padding: 0.4rem;
  min-height: 2rem;
}

.intro {
  text-align: center;
}

.intro h1 {
  font-family: Imbue, serif;
  font-size: 4.5em;
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  font-weight: 600;
  font-style: normal;
  line-height: 1;
  text-transform: uppercase;
}

.intro h2,
.intro h3 {
  font-family: 'Libre Caslon Text', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 2.25rem;
  margin-right: 1rem;
  margin-left: 1rem;
  line-height: 1;
}

.intro h2 span {
  text-transform: uppercase;
}
</style>
