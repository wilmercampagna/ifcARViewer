<script setup>
import NavPaths from './NavPaths.vue'
import NavPathsMini from './NavPathsMini.vue'
import { computed, ref } from 'vue'
import { useDark } from '@vueuse/core'
import { useStore } from '../store/index.js'
import router from '../router.js'

const isDark = useDark()
const sideOpened = ref(false);
const isActiveSide = ref(true);
const isPathsOpen = ref(false);

const openSide = () => sideOpened.value = !sideOpened.value;
const openNav = () => isActiveSide.value = !isActiveSide.value;
const openPaths = () => isPathsOpen.value = !isPathsOpen.value;
const store = useStore();
const openIfcData = store.changeShowIfcData;
let currentPath = computed(() => router.currentRoute.value.path);

</script>

<template>
	<div class="">
		<div class="fixed w-full z-30 flex bg-transparent p-2 items-center justify-center h-16 px-5">
			<!-- <div class="fixed w-full z-30 flex bg-white dark:bg-[#0F172A] p-2 items-center justify-center h-16 px-10"> -->
			<div
				class="logo dark:text-white  transform ease-in-out duration-500 flex-none h-full flex items-center justify-center"
				:class="isActiveSide ? 'ml-12' : ''">
				<button @click="openSide">
					<img class="block h-6 md:h-8 w-auto " src="../assets/logo.png" alt="ifc4All logo">
				</button>
				<div>
					<router-link class="ml-5" to="/"> Ifc4All </router-link>
				</div>
			</div>

			<!-- SPACER -->
			<div class="grow h-full flex items-center justify-center"></div>
			<div class="flex-none h-full text-center flex items-center justify-center">
				<div class="flex space-x-3 items-center px-3">
					<div class="flex-none flex justify-center">
						<div class="w-8 h-8 flex ">
							<img
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU"
								alt="profile" class="shadow rounded-full object-cover" />
						</div>
					</div>
					<div class="hidden md:block text-sm md:text-md text-black dark:text-white"> User</div>
				</div>
			</div>
		</div>

		<aside v-if="sideOpened" class="w-60 fixed transition transform ease-in-out duration-1000 z-50 flex h-screen 
			bg-gradient-to-r dark:from-[#1E293B] dark:via-blue-500 dark:to-transparent from-indigo-500 to-transparent "
			:class="isActiveSide ? '-translate-x-48' : '-translate-x-none'">
			<!-- open sidebar button -->
			<div
				class="max-toolbar w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B]  absolute top-2 rounded-full h-12"
				:class="isActiveSide ? 'translate-x-24 scale-x-0' : 'translate-x-none'">


				<div class="flex items-center pr-1 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
					<label class="relative inline-flex items-center mr-2 text-blue-800">
						<input type="checkbox" value="" class="sr-only peer" checked v-model="isDark">
						<!-- <div class="w-11 hidden h-6 bg-green-500 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-pink-50 dark:peer-focus:ring-pink-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-600"></div> -->
						<mdicon v-if="!isDark"
							class="hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-950 hover:rounded-full hover:text-white"
							name="weather-night" />
						<mdicon v-if="isDark"
							class="hover:bg-gradient-to-r dark:hover:from-yellow-800 dark:hover:to-yellow-300 dark:hover:rounded-full dark:text-yellow-400 dark:hover:text-yellow-200"
							name="sun-wireless-outline" />
					</label>
				</div>
				<div
					class="flex items-center group bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500  pl-6 pr-1 py-1 rounded-full text-white  ">
					<div class="transform ease-in-out duration-300 mr-12">
						Ifc4All
					</div>
				</div>
			</div>

			<div @click="openNav"
				class="-right-6 transition transform ease-in-out duration-500 flex border-4 border-white dark:border-[#0F172A] bg-[#1E293B] dark:hover:bg-blue-500 hover:bg-purple-500 absolute top-2 p-3 rounded-full text-white hover:rotate-45">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"
					class="w-4 h-4">
					<path strokeLinecap="round" strokeLinejoin="round"
						d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
				</svg>
			</div>
			<!-- MAX SIDEBAR-->
			<div class="max flex text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]"
				:class="isActiveSide ? 'hidden' : 'flex'">
				<div>
					<button @click="openPaths"
						class="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
						<mdicon name="map-marker-path" />
						<div> Apps </div>
					</button>
					<div v-if="isPathsOpen">
						<NavPaths/>
					</div>
				</div>
				<div v-if="currentPath==='/ifcGame'" class="space-y-2">
					<button  @click="openIfcData"
						class="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
						<mdicon name="graph-outline" />
						<div> ifc three </div>
					</button>
					<button 
						class="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
						<mdicon name="chart-scatter-plot-hexbin" />
						<div> Graph </div>
					</button>
				</div>
				<!-- <div>
					<button class="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
						<mdicon name="tools" />
						<div> ARTools </div>
					</button>
				</div> -->
			</div>
			<!-- MINI SIDEBAR-->
			<div class="mini mt-20 flex-col space-y-2 w-full h-[calc(100vh)]" :class="isActiveSide ? 'flex' : 'hidden'">
				<div>
					<button @click="openPaths" class="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 
						dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
						<mdicon name="map-marker-path" />
					</button>
					<div v-if="isPathsOpen">
						<NavPathsMini/>
					</div>
				</div>
				<div v-if="currentPath==='/ifcGame'" class="space-y-2">
					<button
						class="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
						<mdicon name="chart-scatter-plot-hexbin" />
					</button>
					<button @click="openIfcData"
						class="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
						<mdicon name="graph-outline" />
					</button>
				</div>
			</div>
		</aside>
	</div>
</template>

    