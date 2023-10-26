<template>
	<div class="loading-spinner box" v-bind:class="{ hidden: reportIsLoaded }">
		<div class="loading-spinner--wrapper">
			<span class="icon is-large">
				<i class="fas fa-spin fa-2x fa-spinner"></i>
			</span>
			<span class="text"> Loading data for this point, hang on&hellip; </span>
		</div>
	</div>
</template>
