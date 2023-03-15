import { defineStore } from 'pinia'
import axios from 'axios'

type WeatherData = {
  app_max_temp: number
  app_min_temp: number
  clouds: number
  clouds_hi: number
  clouds_low: number
  clouds_mid: number
  datetime: string
  dewpt: number
  high_temp: number
  low_temp: number
  max_temp: number
  min_temp: number
  moon_phase: number
  moon_phase_lunation: number
  moonrise_ts: number
  moonset_ts: number
  ozone: number
  pop: number
  precip: number
  pres: number
  rh: number
  slp: number
  snow: number
  snow_depth: number
  sunrise_ts: number
  sunset_ts: number
  temp: number
  ts: number
  uv: number
  valid_date: string
  vis: number
  weather: {
    icon: string
    description: string
    code: number
  }
  wind_cdir: string
  wind_cdir_full: string
  wind_dir: number
  wind_gust_spd: number
  wind_spd: number
}

type WeatherResponse = {
  city_name: string
  country_code: string
  data: WeatherData[]
}

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weather: {} as WeatherResponse,
    oneDayWeather: {} as WeatherData,
    searchFor: 'Riga',
    loading: false,
    error: false
  }),

  getters: {
    // movies(): Movie[] | undefined {
    //   return this.response.Search
    // },
  },

  actions: {
    getWeather() {
      this.loading = true
      this.error = false

      axios
        .get<WeatherResponse>(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=${this.searchFor}&key=7750e9f466c74378aa577bcf82a9e243`
        )
        .then(({ data }) => {
          this.weather = data
          this.oneDayWeather = data.data[0]

          this.loading = false
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
    },

    setSearchFor(searchFor: string) {
      if (this.searchFor.length) {
        this.searchFor = searchFor
      }
    },

    setOneDayWeather(datetime: string) {
      const filteredWeatherData = this.weather.data.filter((day) => day.datetime === datetime)

      if (filteredWeatherData && filteredWeatherData.length === 1) {
        this.oneDayWeather = filteredWeatherData[0]
      }
    }

    // findMovieById(id: string) {
    //   this.loading = true

    //   axios
    //     .get<MovieById>(`https://www.omdbapi.com/?i=${id}&apikey=42944933`)
    //     .then(({ data }) => {
    //       this.movieById = data

    //       this.loading = true
    //     })
    //     .catch(() => {
    //       this.loading = false
    //       this.error = true
    //     })
    // },
  }
})
