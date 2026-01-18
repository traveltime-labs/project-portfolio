import './assets/main.css'
import './assets/app.scss'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import "virtual:svg-icons-register";
import { Icon } from '@iconify/vue'

const app = createApp(App)

app.component('Icon', Icon)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)

app.mount('#app')
