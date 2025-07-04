// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css' // 전역 CSS 파일 임포트

const app = createApp(App)

app.use(router)

app.mount('#app')
