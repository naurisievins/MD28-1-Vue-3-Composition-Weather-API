<script lang="ts">
  import { useWeatherStore } from '@/stores/weatherStore';
  import { ref } from 'vue';


  export default {
    
    setup() {

      const weatherStore = useWeatherStore();
      const searchFor = ref('')

      const handleSubmit = () => {
        if (searchFor.value) {
          weatherStore.setSearchFor(searchFor.value);
          weatherStore.getWeather();
          searchFor.value = '';
        }
      }

      const handleHomeButton = () => {
        weatherStore.setSearchFor('Riga');
        weatherStore.getWeather();
      }

      return { handleSubmit, searchFor, handleHomeButton }
    }
  }
</script>

<template>
  <div class="top-nav">
    <div @click="handleHomeButton()">Home</div>
    <form @submit.prevent="handleSubmit" class="search-form">
      <div class="input-wraper">
        <input type="text" placeholder="City name..." v-model="searchFor" autofocus />
        <img class="input-icon" src="https://img.icons8.com/material-two-tone/256/search.png">
      </div>
      <button>
        <span class="search-button-content">
          Search
        </span>
      </button>
    </form>
  </div>
</template>

<style scoped>

.input-wraper {
  position: relative;
}

.input-icon {
  position: absolute;
  width: 20px;
  top: 3px;
  left: 5px;
}

.top-nav {
  display: flex;
  gap: 10px;
  padding: 5px 10px;
  background-color: rgb(42 38 38);
  color: rgb(214, 213, 213);
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.search-form > .input-wraper > input {
  border-radius: 10px;
  border: 1px solid rgb(19, 18, 18);
  padding: 0 30px;
}

.search-form > .input-wraper > input:focus {
  outline: 1px solid white;
}

.search-button-content {
  display: flex;
  gap: 5px;
}

.search-button-img {
  width: 25px;
}
</style>