<script setup>
import { useDark } from '@vueuse/core'
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import HoverDropdown from './HoverDropdown.vue'

const isDark = useDark()
const isOpen = ref(false)
const openBurger = () => isOpen.value = !isOpen.value
</script>

<template>
    <!-- <nav class="bg-purple-50 dark:bg-neon-dark2"> -->
    <nav class="bg-transparent dark:bg-transparent">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-12 items-center justify-between">
          <div class="flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button type="button" @click="openBurger" class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <!-- <span class="sr-only">Main menu</span> -->
              <!--
                Icon when menu is closed.            
                Menu open: "hidden", Menu closed: "block"
              -->
              <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>              
            </button>            
          </div>          

          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <router-link to="/">
                <img class="block h-8 w-auto " src="../assets/logo.png" alt="ifc4All logo">
              </router-link>     
              <HoverDropdown/>         
              <!-- <a href="/">
              </a> -->
              <!-- <img class="hidden h-8 w-auto lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"> -->
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <label class="relative inline-flex items-center mr-5 cursor-pointer text-blue-800">
              <input type="checkbox" value="" class="sr-only peer" checked v-model="isDark">
              <div class="w-11 hidden h-6 bg-green-500 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-pink-50 dark:peer-focus:ring-pink-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-600"></div>
              <mdicon v-if="!isDark" class="hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-950 hover:rounded-full hover:text-white" name="weather-night"/>
              <mdicon v-if="isDark" class="hover:bg-gradient-to-r dark:hover:from-yellow-800 dark:hover:to-yellow-300 dark:hover:rounded-full dark:text-yellow-400 dark:hover:text-yellow-200" name="sun-wireless-outline"/>
            </label>            
          </div>
        </div>
      </div>
  
      <!-- Mobile menu, show/hide based on menu state. -->
      <div v-if="isOpen" class="sm:hidden" id="mobile-menu">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <router-link to="/" class="text-purple-900 dark:text-pink-100 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >Home</router-link>
          <router-link to="/ifcAR" class="text-purple-900 dark:text-pink-100 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >Ifc AR</router-link>
          <router-link to="/ifcGame" class="text-purple-900 dark:text-pink-100 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >Ifc Game</router-link>
        </div>
      </div>
    </nav>
</template>
