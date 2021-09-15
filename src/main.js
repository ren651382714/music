import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(store)

app.use(router)
app.use(ElementPlus)
app.mount('#app')

import Axios from './axios/index.js'
app.config.globalProperties.$axios = Axios