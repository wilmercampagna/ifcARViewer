import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import mdiVue from 'mdi-vue/v3'
import {
	mdiAugmentedReality,
	mdiDomain,
	mdiMapMarkerRadius,
	mdiHomeCity,
	mdiFloorPlan,
	mdiResize,
	mdiAxisArrow,
	mdiAxisXRotateClockwise,
	mdiPhoneRotatePortrait,
	mdiPhoneRotateLandscape,
	mdiWaterOpacity,
	mdiCrop,
	mdiTapeMeasure,
	mdiCubeScan,
	mdiSunWirelessOutline,
	mdiWeatherNight,
	mdiWeatherSunny,
	mdiChevronUp,
	mdiChevronDown,
	mdiCloudUpload,
	mdiVirtualReality,
	mdiController,
} from '@mdi/js'
import { registerSW } from 'virtual:pwa-register'
import { createPinia } from 'pinia'
import router from './router.js'

const updateSW = registerSW({
  onOfflineReady() {},
})
updateSW()

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(mdiVue, {
    icons: {
        mdiAugmentedReality,
        mdiDomain,
        mdiMapMarkerRadius,
        mdiHomeCity,
        mdiFloorPlan,
        mdiResize,
        mdiAxisArrow,
        mdiAxisXRotateClockwise,
        mdiPhoneRotatePortrait,
        mdiPhoneRotateLandscape,
        mdiWaterOpacity,
        mdiCrop,
        mdiTapeMeasure,
        mdiCubeScan,
        mdiSunWirelessOutline,
        mdiWeatherNight,
        mdiWeatherSunny,
        mdiChevronUp,
        mdiChevronDown,
        mdiCloudUpload,
        mdiVirtualReality,
        mdiController,
    }
})
app.mount('#app')
