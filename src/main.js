import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import { registerSW } from 'virtual:pwa-register'
// import { createPinia } from 'pinia'
import router from './router.js'

const updateSW = registerSW({
  onOfflineReady() {},
})
updateSW()

const app = createApp(App)
// app.use(pinia)
app.use(router)
app.use(mdiVue, {
    icons: mdijs
})
app.mount('#app')
