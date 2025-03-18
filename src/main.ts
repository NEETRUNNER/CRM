import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import piniaPersist from 'pinia-plugin-persistedstate' // Установили библиотеку piniaPersist для сохранения стейта в localStorage

import router from './router'

const app = createApp(App)
const pinia = createPinia(); // Создали piniaPersist

pinia.use(piniaPersist) // Используем piniaPersist

app.use(pinia)
app.use(router)
app.mount('#app')