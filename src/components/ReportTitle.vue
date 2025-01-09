<template>
  <h4 class="title is-4">{{ atlasStore.getPlaceTitle }}</h4>
</template>

<script setup>
import { useAtlasStore } from '@/stores/atlas'

const atlasStore = useAtlasStore()
</script>
