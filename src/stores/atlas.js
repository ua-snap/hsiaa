import { defineStore } from 'pinia'
import _ from 'lodash'
import axios from 'axios'
import mock from '@/mock.js'
import { MIN_YEAR, MAX_YEAR } from '@/shared.js'
import communities from '@/communities.js'
const formatLatLng = function (l) {
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
      isLoaded: false,
      validMapPixel: false
    }
  },
  getters: {
    // Return a plain text string of the place name for use in
    // the report title + charts, in the form:
    // Sea Ice Concentration, Goodnews Bay, AK (59.16ºN, -161.83ºE), 1850–2021
    getPlaceTitle: (state) => {
      let placeName,
        latLng = ''
      let template = _.template(
        'Sea Ice Concentration, <%= placeName %><%= latLng %>, <%= minYear %>-<%= maxYear %>'
      )
      if (state.community) {
        placeName = `${state.community} (${state.lat}ºN, ${state.lng}ºE)`
      } else if (state.lat && state.lng) {
        // try a lookup in case we need to fetch community
        // name from lat/lng
        let place = _.find(communities, {
          place: `${state.lat},${state.lng}`
        })
        // Named place!
        if (place) {
          let { lat, lng } = place.place.split(',')
          placeName = `${place.name} (${lat}ºN, ${lng}ºE)`
        }
        // Just return lat/lng
        else {
          latLng = `${state.lat}ºN, ${state.lng}ºE`
        }
      }
      return template({
        placeName: placeName,
        latLng: latLng,
        minYear: MIN_YEAR,
        maxYear: MAX_YEAR
      })
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
      this.isLoaded = false
      let queryUrl = import.meta.env.VITE_SNAP_API_URL + `/seaice/point/${this.lat}/${this.lng}/`
      let response = await axios.get(queryUrl, { timeout: 60000 }).catch((err) => {
        console.error(err)
      })
      this.apiData = response.data
      this.isLoaded = true

      let timeseriesData = Object.values(this.apiData);
      const reducer = (accumulator, currentValue) =>
        accumulator + currentValue;
      let sum = timeseriesData.reduce(reducer);
      if (sum === 0) {
        this.validMapPixel = false
      } else {
        this.validMapPixel = true
      }
    }
  }
})
