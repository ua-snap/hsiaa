<template>
  <div class="" v-bind:class="{ 'is-hidden': isLoaded }">
    <p class="loading mt-4">
      <span class="icon is-large mr-2">
        <i class="fas fa-spin fa-2x fa-spinner"></i>
      </span>
      <span class="text"> <strong>Loading data</strong> for this point, hang on&hellip; </span>
    </p>
  </div>
</template>

<style lang="scss">
.loading {
  font-size: 1.3rem;

  .icon {
    display: inline-block;
    position: relative;
    top: 0.4rem;
  }
}
</style>

<script setup>
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'
const atlasStore = useAtlasStore()
const { isLoaded } = storeToRefs(atlasStore)
</script>
