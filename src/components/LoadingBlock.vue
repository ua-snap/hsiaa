<template>
  <div class="loading-spinner box" v-bind:class="{ 'is-hidden': isLoaded }">
    <div class="loading-spinner--wrapper">
      <span class="icon is-large">
        <i class="fas fa-spin fa-2x fa-spinner"></i>
      </span>
      <span class="text"> Loading data for this point, hang on&hellip; </span>
    </div>
  </div>
</template>

<script setup>
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'
const atlasStore = useAtlasStore()
const { isLoaded } = storeToRefs(atlasStore)
</script>
