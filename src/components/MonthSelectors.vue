<template>
  <div>
    <button v-on:click="decrementMonth" :disabled="pastButtonDisabled" class="button mr-2">
      <i class="fas fa-arrow-alt-circle-left mr-2" />
      <span>Past Month</span>
    </button>
    <button v-on:click="incrementMonth" :disabled="nextButtonDisabled" class="button ml-2">
      <span>Next Month</span>
      <i class="fas fa-arrow-alt-circle-right ml-2" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAtlasStore } from '@/stores/atlas'
const atlasStore = useAtlasStore()
const { incrementMonth, decrementMonth } = atlasStore
const { year, month } = storeToRefs(atlasStore)
import { MIN_YEAR, MAX_YEAR, MAX_MONTH } from '@/shared.js'

const pastButtonDisabled = computed(() => {
  return year.value == MIN_YEAR && month.value == 0
})
const nextButtonDisabled = computed(() => {
  return year.value == MAX_YEAR.value && month.value == MAX_MONTH.value
})
</script>
