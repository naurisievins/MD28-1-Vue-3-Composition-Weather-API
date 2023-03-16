<script lang="ts">
  import { useWeatherStore } from '@/stores/weatherStore';
  import { onBeforeMount } from 'vue';
  import LoadingComponent from './LoadingComponent.vue';
  import ErrorComponent from './ErrorComponent.vue'
  import getMonthNameAndDate from '../utility/getMonthNameAndDate'
  import convertMsToTime from '../utility/convertMsToTime'

  export default {
  components: { LoadingComponent, ErrorComponent },
    setup() {
      const weatherStore = useWeatherStore();

      onBeforeMount(() => {
        weatherStore.getWeather()
      });

      const tempFormat = (temp: number) => {
        if (!weatherStore.tempInCelsius) {
          return `${Math.round(temp * 1.8 + 32)} °F`;
        }
        return `${Math.round(temp)} °C`;
      }

      return {
        weatherStore,
        convertMsToTime,
        getMonthNameAndDate,
        tempFormat,
        LoadingComponent,
        ErrorComponent
      }
    }
  }
</script>

<template>

  <LoadingComponent v-if="weatherStore.loading"/>
  <ErrorComponent v-else-if="weatherStore.error" />

  <div v-else class="weather-container">
    <div class="weather-today" v-if="weatherStore.weather.data">
      <span class="location">
        {{ weatherStore.weather.city_name }},
        {{ weatherStore.weather.country_code }}
      </span>

      <button
        @click="weatherStore.toggleTempInCelsius"
        class="toggle-temp-format-button"
      >
        <span v-if="weatherStore.tempInCelsius">°C to °F</span>
        <span v-else>°F to °C</span>
      </button>

      <div class="row">
        <div class="left-col">
          <img :src="'https://www.weatherbit.io/static/img/icons/' + weatherStore.oneDayWeather.weather.icon + '.png'" :width="170">
        </div>

        <div class="right-col">
          <span class="date">{{ getMonthNameAndDate(weatherStore.oneDayWeather.datetime) }}</span>
          <span class="temp">{{ tempFormat(weatherStore.oneDayWeather.temp) }}</span>
          <span class="temp temp--small">{{ tempFormat(weatherStore.oneDayWeather.min_temp) }} ... {{ tempFormat(weatherStore.oneDayWeather.max_temp) }}</span>
          <span>{{ weatherStore.oneDayWeather.weather.description }}</span>
        </div>
      </div>

      <div class="row row--box">

        <div class="box">
          <span>
            <span class="box-description">Wind speed:</span>
            {{ weatherStore.oneDayWeather.wind_spd }} m/s
          </span>

          <span>
            <span class="box-description">Wind direction: </span>
            {{ weatherStore.oneDayWeather.wind_cdir_full }}
          </span>
        </div>

        <div class="box">
          <span>
            <span class="box-description">Average relative humidity:</span>
            {{ weatherStore.oneDayWeather.rh }} %
          </span>

          <span>
            <span class="box-description">Average pressure:</span>
            {{ weatherStore.oneDayWeather.pres }} mb
          </span>

          <span>
            <span class="box-description">Average total cloud coverage:</span>
            {{ weatherStore.oneDayWeather.clouds }} %
          </span>
        </div>

        <div class="box">
          <span>
            <span class="box-description">Sunrise:</span>
            {{ convertMsToTime(weatherStore.oneDayWeather.sunrise_ts) }}
          </span>

          <span>
            <span class="box-description">Sunset:</span>
            {{ convertMsToTime(weatherStore.oneDayWeather.sunset_ts) }}
          </span>
        </div>

      </div>
    </div>

    <div class="weather-next" v-if="weatherStore.weather.data">
      <div
        class="weather-next-each-day"
        v-for="(day, index) in weatherStore.weather.data.slice(0,14)"
        :key="index"
        @click="() => weatherStore.setOneDayWeather(day.datetime)"
      >
        <span class="date">{{ getMonthNameAndDate(day.datetime) }}</span>
        <span class="temp">{{ tempFormat(day.temp) }}</span>
              <img class="icon" :src="'https://www.weatherbit.io/static/img/icons/' + day.weather.icon + '.png'" :width="120">
      </div>
    </div>

  </div>
</template>

<style scoped>
.toggle-temp-format-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgb(255 255 255 / 52%);
}
.box-description {
  color: grey;
}
.weather-today {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff47;
  padding: 10px;
  border-radius: 7px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 8px 24px, rgba(241, 241, 243, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
}

.row {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 10px;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
}

.right-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 170px;
}

.location {
  align-self: start;
  font-size: 2rem;
  color: rgb(20, 50, 94);
}

.weather-next {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: center;
  gap: 5px;
}

.weather-next-each-day {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100px;
  width: 13.9%;
  min-width: 120px;
  border-radius: 10px;
  background-color: #ffffff8f;
  border: 1px solid rgb(192, 190, 190);
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  cursor: pointer;
  user-select: none;
}

.weather-next-each-day:hover {
  opacity: 0.8;
}


.date {
  font-weight: 600;
  font-size: 1.2rem;
}

.temp {
  font-size: 2rem;
  color: rgba(8, 8, 8, 0.603);
}

.temp--small {
  font-size: 1rem;
}

.icon {
  position: absolute;
  opacity: 0.3;
  margin: 0 auto;
}

@media only screen and (max-width: 1000px) {
  .row--box {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .box {
    width: 100%;
    border-top: 2px solid rgb(151, 150, 150);;
  }
}
</style>