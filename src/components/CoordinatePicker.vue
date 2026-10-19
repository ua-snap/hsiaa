<template>
  <form class="coordinates" novalidate v-on:submit.prevent="showReport">
    <fieldset>
      <legend class="mb-2">Or enter coordinates</legend>
      <div class="field is-grouped is-grouped-centered is-grouped-multiline">
        <div class="control">
          <label for="coordinate-lat" class="label">Latitude (&deg;N)</label>
          <input
            id="coordinate-lat"
            v-model="latInput"
            class="input"
            type="number"
            step="any"
            min="-90"
            max="90"
            placeholder="e.g. 71.3"
            :aria-invalid="latError ? 'true' : null"
            :aria-describedby="latError ? 'coordinate-lat-error' : null"
          />
          <p v-if="latError" id="coordinate-lat-error" class="help is-danger">{{ latError }}</p>
        </div>
        <div class="control">
          <label for="coordinate-lng" class="label">Longitude (&deg;E)</label>
          <input
            id="coordinate-lng"
            v-model="lngInput"
            class="input"
            type="number"
            step="any"
            min="-180"
            max="180"
            placeholder="e.g. -156.8"
            :aria-invalid="lngError ? 'true' : null"
            :aria-describedby="lngError ? 'coordinate-lng-error' : null"
          />
          <p v-if="lngError" id="coordinate-lng-error" class="help is-danger">{{ lngError }}</p>
        </div>
        <div class="control submit">
          <button type="submit" class="button is-link">Show report</button>
        </div>
      </div>
    </fieldset>
  </form>
</template>

<style lang="scss" scoped>
fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}
legend {
  width: 100%;
  font-weight: 700;
}
.input {
  border-color: #767676;
  max-width: 10rem;
  &::placeholder {
    color: #6b7280;
  }
}
.control.submit {
  // Line the button up with the inputs, below their labels.
  margin-top: 2rem;
}
.help.is-danger {
  color: #b00020;
  max-width: 10rem;
  font-family: sans-serif;
}
</style>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAtlasStore } from '@/stores/atlas'
import router from '@/router/index'

const atlasStore = useAtlasStore()
const { lat, lng } = storeToRefs(atlasStore)

const latInput = ref('')
const lngInput = ref('')
const latError = ref('')
const lngError = ref('')

const validate = function (value, min, max, name) {
  if (value === '' || value === null || isNaN(Number(value))) {
    return `Enter a ${name} as a number.`
  }
  if (Number(value) < min || Number(value) > max) {
    return `${name[0].toUpperCase() + name.slice(1)} must be between ${min} and ${max}.`
  }
  return ''
}

// Keyboard-accessible alternative to clicking a point on the map.
const showReport = function () {
  latError.value = validate(latInput.value, -90, 90, 'latitude')
  lngError.value = validate(lngInput.value, -180, 180, 'longitude')
  if (latError.value) {
    document.getElementById('coordinate-lat').focus()
    return
  }
  if (lngError.value) {
    document.getElementById('coordinate-lng').focus()
    return
  }
  atlasStore.setLatLngFromObject({ lat: Number(latInput.value), lng: Number(lngInput.value) })
  router.push({
    name: 'report',
    params: {
      lat: lat.value,
      lng: lng.value
    },
    hash: '#report'
  })
}
</script>
