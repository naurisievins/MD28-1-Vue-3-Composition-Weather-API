<script lang="ts">
  import { useWeatherStore } from '@/stores/weatherStore';
  import { onBeforeMount } from 'vue';

  export default {
    setup() {
      const weatherStore = useWeatherStore();

      onBeforeMount(() => {
        weatherStore.getWeather()

      });

      const getMonthNameAndDate = (date: string) => {

        const monthNumber = Number(date.slice(5,7))
        const dateNumber = date.slice(8)
      
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return `${months[monthNumber - 1]} ${dateNumber}`

      }


      const convertMstoTime = (ms: number) => {

        const sunriseTimestamp = ms; // Unix timestamp for sunrise time
        const sunriseDate = new Date(sunriseTimestamp * 1000); // Create a new Date object from the timestamp
        const timezoneOffsetInMinutes = sunriseDate.getTimezoneOffset(); // Get the timezone offset in minutes
        const timezoneOffsetInMilliseconds = timezoneOffsetInMinutes * 60 * 1000; // Convert the offset to milliseconds

        // Convert the timestamp to your local time by adding the timezone offset
        const sunriseLocalDate = new Date(sunriseTimestamp * 1000 - timezoneOffsetInMilliseconds).toISOString().slice(11, 19);
        return sunriseLocalDate;
      }

      return { weatherStore, convertMstoTime, getMonthNameAndDate }
    }
  }
</script>

<template>
  <div v-if="weatherStore.loading">Loading...</div>
  <div v-else-if="weatherStore.error">Error...</div>
  <div v-else class="weather-container">
    <div class="weather-today" v-if="weatherStore.weather.data">
      <span class="location">
        {{ weatherStore.weather.city_name }},
        {{ weatherStore.weather.country_code }}
      </span>
      <div class="row">
        <div class="left-col">
          <img :src="'https://www.weatherbit.io/static/img/icons/' + weatherStore.oneDayWeather.weather.icon + '.png'" :width="170">
        </div>

        <div class="right-col">
          <span class="date">{{ getMonthNameAndDate(weatherStore.oneDayWeather.datetime) }}</span>
          <span class="temp">{{ Math.round(weatherStore.oneDayWeather.temp) }} °C</span>
          <span class="temp temp--small">{{ Math.round(weatherStore.oneDayWeather.min_temp) }} °C ... {{ Math.round(weatherStore.oneDayWeather.max_temp) }} °C</span>
          <span>{{ weatherStore.oneDayWeather.weather.description }}</span>
        </div>
      </div>


      <div class="row">

        <div class="box">
          <span>
            <span>Wind speed:</span>
            {{ weatherStore.oneDayWeather.wind_spd }} m/s
          </span>

          <span>
            <span>Wind direction: </span>
            {{ weatherStore.oneDayWeather.wind_cdir_full }}
          </span>
        </div>

        <div class="box">
          <span>Average relative humidity: {{ weatherStore.oneDayWeather.rh }} %</span>
          <span> Average pressure: {{ weatherStore.oneDayWeather.pres }} mb</span>
          <span>  Average total cloud coverage: {{ weatherStore.oneDayWeather.clouds }} %</span>
        </div>

        <div class="box">
          <span>Sunrise: {{ convertMstoTime(weatherStore.oneDayWeather.sunrise_ts) }}</span>
          <span>Sunset: {{ convertMstoTime(weatherStore.oneDayWeather.sunset_ts) }}</span>
        </div>

      </div>
    </div>

    <div class="weather-next" v-if="weatherStore.weather.data">
      <div
        class="weather-next-each-day"
        v-for="(day, index) in weatherStore.weather.data.slice(1,15)"
        :key="index"
        @click="() => weatherStore.setOneDayWeather(day.datetime)"
      >
        <span class="date">{{ getMonthNameAndDate(day.datetime) }}</span>
        <span class="temp">{{ Math.round(day.temp) }} °C</span>
              <img class="icon" :src="'https://www.weatherbit.io/static/img/icons/' + day.weather.icon + '.png'" :width="120">
      </div>
    </div>

  </div>
</template>

<style scoped>
.weather-today {
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

</style>