import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const MIN_YEAR = 1850
const MAX_YEAR = 2021

export const useAtlasStore = defineStore('atlas', {
  state: () => {
    return {
      year: MIN_YEAR,
      month: 0 // 0 = January, etc
    }
  },
  actions: {
    // Decrement month, going to prior year if necessary, but prevent
    // going before January 1850.
    decrementMonth() {
      this.month--
      if (this.month < 0) {
        this.month = 11
        this.decrementYear()
      }
    },
    incrementMonth() {
      this.month++
      if (this.month > 11) {
        this.month = 0
        this.incrementYear()
      }
    },
    setMonth(value) {
      this.month = value
    },

    decrementYear() {
      this.year--
      if (this.year < MIN_YEAR) {
        this.year = MIN_YEAR
        this.setMonth(0) // reset to Jan
      }
    },
    incrementYear() {
      this.year++
      if (this.year > MAX_YEAR) {
        this.year = MAX_YEAR
        this.setMonth(11) // reset to Dec
      }
    },
    setYear(value) {
      this.year = value
    }
  }
})