import { defineStore } from 'pinia'
import _ from 'lodash'

import axios from 'axios'
import mock from '@/mock.js'
import { MIN_YEAR, MAX_YEAR } from '@/shared.js'

const formatLatLng = function(l) {
  return l.toPrecision(5)
}

export const useAtlasStore = defineStore('atlas', {
  state: () => {
    return {
      year: MIN_YEAR,
      month: 0, // 0 = January, etc
      community: undefined, // community object from @/src/communities.js
      lat: undefined,
      lng: undefined,
      apiData: [],
      isLoaded: true
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
    },
    // This will be an object like:
    // { place: "64.56,-162.11", name: "Elim, AK" }
    setCommunity(value) {
      this.community = value.name
      this.setLatLngFromString(value.place)
    },
    // Incoming, a string like "64.56,-162.11"
    setLatLngFromString(value) {
      let parsed = value.split(',').map((val) => parseFloat(val))
      this.lat = formatLatLng(parsed[0])
      this.lng = formatLatLng(parsed[1])
    },
    // in {lat, lng} format
    setLatLngFromObject(value) {
      this.lat = formatLatLng(value.lat)
      this.lng = formatLatLng(value.lng)
    },
    async fetch() {
      let queryUrl = `https://earthmaps.io/seaice/point/${this.lat}/${this.lng}/`
      let response = await axios.get(queryUrl, { timeout: 60000 }).catch((err) => {
        console.error(err)
      })
      this.apiData = response.data
      this.isLoaded = true
    }
  }
})
