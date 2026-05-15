<template>
  <router-link :to="{ path: '/', hash: '#place' }" class="mb-6"
    ><a class="button is-link">
      <span class="icon is-large">
        <i class="fas fa-arrow-left"></i>
      </span>
      <span class="text"> Pick another place </span>
    </a>
  </router-link>
</template>

<style lang="scss" scoped>
a:hover {
  text-decoration: none !important;
}
</style>

<script setup>
import router from '@/router/index'
</script>
