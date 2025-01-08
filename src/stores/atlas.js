import { defineStore } from 'pinia'
import _ from 'lodash'
import axios from 'axios'
import mock from '@/mock.js'
import communities from '@/communities.js'
import moment from 'moment'

const formatLatLng = function (l) {
  return l.toPrecision(5)
}

export const useAtlasStore = defineStore('atlas', {
  state: () => {
    return {
      year: 1850,
      month: 0, // 0 = January, etc
      community: undefined, // community object from @/src/communities.js
      lat: undefined,
      lng: undefined,
      apiData: [],
      isLoaded: false,
      validMapPixel: false,
      xrange: [], // used in the Plotly code for both charts
      MIN_YEAR: 1850,
      MAX_YEAR: 2023, // sane default
      MAX_MONTH: 11 // december, sane default
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
    },
    displayMaxDate: (state) => {
      var dateObj = moment({ day: 1, month: state.MAX_MONTH, year: state.MAX_YEAR })
      return dateObj.format('MMMM YYYY')
    }
  },
  actions: {
    clearReport() {
      this.apiData = []
      this.community = undefined
      this.lat = undefined
      this.lng = undefined
    },
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

      let timeseriesData = Object.values(this.apiData)
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      let sum = timeseriesData.reduce(reducer)
      if (sum === 0) {
        this.validMapPixel = false
      } else {
        this.validMapPixel = true
      }
    },
    async getMaxYearAndMonth() {
      try {
        let queryUrl = import.meta.env.VITE_SNAP_API_URL + `/seaice/enddate/`
        let enddate = await axios.get(queryUrl, { timeout: 60000 }).catch((err) => {
          console.error(err)
        })

        enddate = enddate.data
        this.MAX_YEAR = Number(enddate['year'])
        // Sets max month to 0-11 range rather than 1-12
        this.MAX_MONTH = Number(enddate['month']) - 1

        this.xrange = []
        for (let x = this.MIN_YEAR; x <= this.MAX_YEAR.value; x++) {
          this.xrange.push(x)
        }
      } catch (error) {
        // This is where we would swap the app into "broken" mode
        console.error('Error getting max year and month:', error)
      }
    }
  }
})
