<template>
	<h4 class="title is-4">{{ atlasStore.getPlaceTitle }}</h4>
</template>

<script setup>
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'
import { MIN_YEAR, MAX_YEAR } from '@/shared.js'

const atlasStore = useAtlasStore()
</script>