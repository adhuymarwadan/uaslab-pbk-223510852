<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Cuaca Kota</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Menu Tugas</q-item-label>
        <q-item
          clickable
          @click="
            navigateTo('https://yudhaa-project-cv.netlify.app/?authuser=2')
          "
        >
          <q-item-section>
            <q-item-label>Tugas 1</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="navigateTo('https://223510852-yudha.vercel.app/?authuser=2')"
        >
          <q-item-section>
            <q-item-label>Tugas 2</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="
            navigateTo(
              'https://223510852-yudhadwidarmawan.vercel.app/?authuser=2'
            )
          "
        >
          <q-item-section>
            <q-item-label>Tugas 3</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="
            navigateTo('https://223510852-yudhadwi.vercel.app/?authuser=2')
          "
        >
          <q-item-section>
            <q-item-label>Tugas 4</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="
            navigateTo(
              'https://yudhadwidarmawan-ecommerce.vercel.app/?authuser=2'
            )
          "
        >
          <q-item-section>
            <q-item-label>Tugas 5</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="
            navigateTo(
              'https://tugas6-pbk-223510852-yudha.vercel.app/?authuser=2'
            )
          "
        >
          <q-item-section>
            <q-item-label>Tugas 6</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="
            navigateTo(
              'https://tugas7-pbk-223510852-yudhadwidarmawan.vercel.app/?authuser=2'
            )
          "
        >
          <q-item-section>
            <q-item-label>Tugas 7</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="weather-form">
        <h4>Lihat cuaca kota anda disini</h4>
        <input
          type="text"
          placeholder="Masukkan Lokasi"
          v-model="location"
          class="location-input"
        />
        <q-btn @click="getWeather" color="primary" class="search-button"
          >Cari</q-btn
        >
        <div v-if="loading" class="loading">Loading data...</div>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="weatherData" class="weather-info">
          <h3>{{ weatherData.name }}, {{ weatherData.sys.country }}</h3>
          <p>{{ weatherData.main.temp }}°C</p>
          <p>{{ weatherData.weather[0].description }}</p>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      leftDrawerOpen: false,
      location: "",
      weatherData: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    async getWeather() {
      this.loading = true;
      this.error = null;
      this.weatherData = null;
      try {
        const apikey = "1eed2c0ae8aedc66483fd135d9bdbd54"; // Your API key
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${apikey}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Location not found");
        }
        const data = await response.json();
        if (data.cod !== 200) {
          throw new Error(data.message);
        }
        this.weatherData = data;
      } catch (error) {
        this.error = "Error fetching weather data: " + error.message;
      } finally {
        this.loading = false;
      }
    },
    navigateTo(url) {
      window.open(url, "_blank");
    },
  },
};
</script>
<style>
.weather-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5); /* Transparansi background */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: "Times New Roman", Times, serif;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.weather-form:hover {
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.location-input {
  width: 80%;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid rgba(204, 204, 204, 0.5);
  border-radius: 30px;
  font-size: 16px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.5);
  transition: border 0.3s, box-shadow 0.3s;
}

.location-input:focus {
  border: 1px solid #007bff;
  box-shadow: inset 0 2px 4px rgba(0, 123, 255, 0.2);
  outline: none;
}

.search-button {
  padding: 15px 30px;
  margin-top: 10px;
  background: linear-gradient(45deg, #007bff, #0056b3);
  color: #fff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s, box-shadow 0.3s;
}

.search-button:hover {
  background: linear-gradient(45deg, #0056b3, #007bff);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.loading,
.error {
  text-align: center;
  margin-top: 20px;
  color: red;
}

.weather-info {
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #6dd5ed, #2193b0);
  color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: "Arial", sans-serif;
  transition: transform 0.3s, box-shadow 0.3s;
}

.weather-info:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.weather-info h2 {
  font-size: 2em;
  margin-bottom: 10px;
}

.weather-info p {
  font-size: 1.2em;
  margin: 5px 0;
}

.weather-info .temperature {
  font-size: 3em;
  font-weight: bold;
}

.weather-info .icon {
  width: 100px;
  height: 100px;
  margin: 10px auto;
}
</style>
