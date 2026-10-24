<template>
  <h2 ref="heading" class="title is-4" tabindex="-1">{{ atlasStore.getPlaceTitle }}</h2>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAtlasStore } from '@/stores/atlas'

const atlasStore = useAtlasStore()
const heading = ref(null)

// Move focus to the report title so keyboard and screen reader users
// land on the new content after navigating from the map.
onMounted(() => {
  heading.value.focus({ preventScroll: true })
})
</script>
