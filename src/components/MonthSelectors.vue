<template>
	<div class="slider-wrapper--button-wrapper">
		<span v-on:click="decrementMonth" :disabled="pastButtonDisabled" class="button">
			<i class="fas fa-arrow-alt-circle-left" /><span class="month-indicator">Past Month</span>
		</span>
		<span v-on:click="incrementMonth" :disabled="nextButtonDisabled" class="button">
			<span class="month-indicator">Next Month</span>
			<i class="fas fa-arrow-alt-circle-right" />
		</span>
	</div>
</template>
