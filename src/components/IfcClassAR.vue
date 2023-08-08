<script setup>
import CallbackBtn from './basics/ARCallbackButton.vue'
const props = defineProps({
  ifcClasses: {
    type: Array,
  },
})
</script>

<template>
  <div>
    <div class="w-fit h-fit fixed left-14 top-24 bg-gradient-to-r from-white via-transparent
        to-transparent dark:from-indigo-400 dark:to-indigo-950">
      <div class="flex text-slate-500 dark:text-white flex-row items-center justify-center w-full">
        <div class="w-40 px-2"> <h3> ifc Class </h3> </div>
        <div class="w-14"> <h3> on/off </h3> </div>
        <div class="w-14"> <h3> Opacity </h3> </div>
      </div>
      <div v-for="el in ifcClasses" class="flex text-white flex-row items-center justify-center w-full">
        <CallbackBtn some-class="w-40" :text="el"/>
        <CallbackBtn :key="el.index" some-class="text-yellow-400 w-14" icon-name="sun-wireless-outline"/>
        <CallbackBtn :key="el.index" some-class="w-14" icon-name="water-opacity"/>
      </div>
    </div>
  </div>
</template>