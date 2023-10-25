<template>
	<div>
		<span v-on:click="decrementMonth" :disabled="pastButtonDisabled" class="button">
			<i class="fas fa-arrow-alt-circle-left" /><span>Past Month</span>
		</span>
		<span v-on:click="incrementMonth" :disabled="nextButtonDisabled" class="button">
			<span>Next Month</span>
			<i class="fas fa-arrow-alt-circle-right" />
		</span>
	</div>
</template>

<script setup>
import { useAtlasStore } from '@/stores/atlas'
const { incrementMonth, decrementMonth } = useAtlasStore()
</script>