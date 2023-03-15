<script lang="ts">
import { useWeatherStore } from './stores/weatherStore';
import SearchComponent from './components/SearchComponent.vue';
import WeatherComponent from './components/WeatherComponent.vue';

  export default {
    components: { SearchComponent, WeatherComponent },
    setup() {
      const weatherStore = useWeatherStore();

      return { weatherStore }
    }
  }


</script>

<template>
  <header>
    <SearchComponent />
  </header>

  <main>
    <WeatherComponent />
  </main>
</template>

<style scoped>

</style>
