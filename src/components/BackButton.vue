<template>
  <router-link :to="{ path: '/', hash: '#place' }" class="button is-link mb-6">
    <span class="icon is-large" aria-hidden="true">
      <i class="fas fa-arrow-left"></i>
    </span>
    <span class="text">Pick another place</span>
  </router-link>
</template>

<style lang="scss" scoped>
a:hover {
  text-decoration: none !important;
}
</style>
