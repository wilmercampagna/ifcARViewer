import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('navBar', () => {
  const showIfcData = ref(false)
  const changeShowIfcData = () => {
    showIfcData.value = !showIfcData.value
  }

  return { showIfcData, changeShowIfcData }
})