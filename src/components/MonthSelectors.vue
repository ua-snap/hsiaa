<template>
	<div>
		<span v-on:click="decrementMonth" :disabled="pastButtonDisabled" class="button mr-2">
			<i class="fas fa-arrow-alt-circle-left mr-2" /><span>Past Month</span>
		</span>
		<span v-on:click="incrementMonth" :disabled="nextButtonDisabled" class="button ml-2">
			<span>Next Month</span>
			<i class="fas fa-arrow-alt-circle-right ml-2" />
		</span>
	</div>
</template>

<script setup>
import { useAtlasStore } from '@/stores/atlas'
const { incrementMonth, decrementMonth } = useAtlasStore()
</script>