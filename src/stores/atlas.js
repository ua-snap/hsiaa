import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAtlasStore = defineStore('atlas', () => {
  const year = ref(1850) // default year = 1850
  const month = ref(0) // 0 = January, etc
   
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
