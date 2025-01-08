<template>
  <div class="report--invalid content is-size-5" v-bind:class="{ 'is-hidden': validMapPixel || !isLoaded }">
    <p class="is-size-5 mt-6 mb-3 sorry">
      <strong>This sea ice dataset<br>doesn&rsquo;t show any recorded sea ice<br>in this place.</strong>
    </p>
    <p class="is-size-5 mt-5 mb-3 reasons">
      This can be for a few different reasons:
    </p>
      <ul class="mt-1">
        <li>it <strong>never has sea ice</strong>,</li>
        <li>it&rsquo;s <strong>on land</strong>,</li>
        <li>or it&rsquo;s <strong>outside of the extent of this dataset</strong>.</li>
      </ul>
    <BackButton />
  </div>
</template>

<style lang="scss" scoped>
p.sorry strong {
  font-size: 1.5rem;
}
p.reasons {
  line-height: 1.3;
  font-weight: 400;
  font-size: 1.4rem !important;
}
ul {
  margin: 0;
  li {
    margin: 0;
  }
}
</style>

<script setup>
import { useAtlasStore } from '@/stores/atlas'
import { storeToRefs } from 'pinia'
import BackButton from '../components/BackButton.vue'
const atlasStore = useAtlasStore()
const { validMapPixel } = storeToRefs(atlasStore)
const { isLoaded } = storeToRefs(atlasStore)

</script>
