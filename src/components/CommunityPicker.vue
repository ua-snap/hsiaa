<template>
  <div>
    <div class="select is-medium">
      <select v-model="community" class="py-2 pr-6">
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
</template>

<style lang="scss" scoped>
select {
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
}
</style>

<script setup>
import communities from '@/communities.js'
import { useAtlasStore } from '@/stores/atlas'
import { ref, watch, toRaw } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router/index'

const atlasStore = useAtlasStore()
const { setCommunity } = atlasStore
const { lat, lng } = storeToRefs(atlasStore)
const community = ref('')

watch(community, (newCommunity) => {
  setCommunity(toRaw(newCommunity))
  router.push({
    name: 'report',
    params: {
      lat: lat.value,
      lng: lng.value
    }
  })
})
</script>
