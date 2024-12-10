<template>
  <div @click="router.push({ path: '/' })" class="button is-link mb-6">
    <span class="icon is-large">
      <i class="fas fa-arrow-left"></i>
    </span>
    <span class="text"> Back to the map </span>
  </div>
</template>

<script setup>
import router from '@/router/index'
</script>
