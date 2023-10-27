import { defineStore } from 'pinia'
import _ from 'lodash'

const MIN_YEAR = 1850
const MAX_YEAR = 2021

import mock from '@/mock.js'

export const useAtlasStore = defineStore('atlas', {
  state: () => {
    return {
      year: MIN_YEAR,
      month: 0, // 0 = January, etc
      community: undefined, // community object from @/src/communities.js
      lat: undefined,
      lng: undefined,
    }
  },
  getters: {
    apiData: (state) => Object.values(mock)
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
    },
    setCommunity(value) {
      this.community = value
    },
    // in {lat, lng} format
    setLatLng(value) {
      this.lat = value.lat
      this.lng = value.lng
    }
  }
})