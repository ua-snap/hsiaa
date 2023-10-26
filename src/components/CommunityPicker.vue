<template>
	<select v-model="community">
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
</template>

<script setup>
import communities from '@/communities.js'
import { useAtlasStore } from '@/stores/atlas'
import { ref, watch } from 'vue'
import router from '@/router/index'

const { setCommunity } = useAtlasStore()
const community = ref(undefined)

watch(community, (newCommunity) => {
	setCommunity(newCommunity)
	router.push('/report')
})
</script>
