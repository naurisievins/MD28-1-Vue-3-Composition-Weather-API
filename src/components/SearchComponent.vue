<script lang="ts">
  import { useWeatherStore } from '@/stores/weatherStore';
  import { onMounted, ref } from 'vue';

  export default {
    setup() {
      const weatherStore = useWeatherStore();
      const searchFor = ref('')
      const currentDateTime = ref(new Date().toLocaleString('eu', { hour12: false }));

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

    onMounted(() => {
      setInterval(() => {
        currentDateTime.value = new Date().toLocaleString('eu', { hour12: false });
      }, 1000);
    })

      return { handleSubmit, searchFor, handleHomeButton, currentDateTime }
    }
  }
</script>

<template>
  <div class="top-nav">
    <div @click="handleHomeButton()">
      <img
        src="https://cdn-icons-png.flaticon.com/512/9073/9073243.png" :width="30"
        class="home-icon"
      />
    </div>
    <form @submit.prevent="handleSubmit" class="search-form">
      <div class="input-wraper">
        <input type="text" placeholder="City..." v-model="searchFor" autofocus />
        <img class="input-icon" src="https://img.icons8.com/material-two-tone/256/search.png">
      </div>
      <button>Search</button>
    </form>
    <div class="date-time-container">
      <span class="date-time">
        {{ currentDateTime }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.date-time-container {
  margin-left: auto;
  width: 150px;
}

.input-wraper {
  position: relative;
}

.home-icon {
  cursor: pointer;
}

.input-icon {
  position: absolute;
  width: 20px;
  top: 3px;
  left: 5px;
}

.top-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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

@media only screen and (max-width: 600px) {
  .date-time-container {
    margin: 0 auto;
  }

  .search-form {
    margin: 0 auto;
}
}

@media only screen and (max-width: 400px) {
  .search-form > .input-wraper > input {
    width: 180px;
  }
}
</style>