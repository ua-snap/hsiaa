<template>
  <form
    class="field is-grouped is-grouped-centered is-grouped-multiline"
    v-on:submit.prevent="showReport"
  >
    <label for="community-select" class="is-sr-only">Choose a community</label>
    <div class="control">
      <div class="select is-medium">
        <select id="community-select" v-model="community" class="py-2 pr-6">
          <option value="">Choose a community&hellip;</option>
          <optgroup
            v-for="(regions, regionKey) in communities"
            v-bind:key="regionKey"
            v-bind:label="regions.name"
          >
            <option v-for="place in regions.places" v-bind:key="place.name" v-bind:value="place">
              {{ place.name }}
            </option>
          </optgroup>
        </select>
      </div>
    </div>
    <div class="control">
      <button type="submit" class="button is-medium is-link" :disabled="!community">
        Show report
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.select,
select {
  max-width: 100%;
}
select {
  border-color: #767676;
  border-radius: 4px;
  color: #363636;
}
</style>

<script setup>
import communities from '@/communities.js'
import { useAtlasStore } from '@/stores/atlas'
import { ref, toRaw } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router/index'

const atlasStore = useAtlasStore()
const { setCommunity } = atlasStore
const { lat, lng } = storeToRefs(atlasStore)
const community = ref('')

// Navigate only on an explicit submit, not on change, so keyboard users
// can arrow through the list without being taken away from the page.
const showReport = function () {
  if (!community.value) {
    return
  }
  setCommunity(toRaw(community.value))
  router.push({
    name: 'report',
    params: {
      lat: lat.value,
      lng: lng.value
    },
    hash: '#report'
  })
}
</script>
