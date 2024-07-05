<script setup>
import { ref } from 'vue'
import { useDark } from '@vueuse/core'
import { useStore } from '../store/index.js'

const isDark = useDark()
const isActiveSide = ref(true);

const store = useStore();
const openIfcData = store.changeShowIfcData;

</script>

<template>
	<div class="">
		<div class="fixed w-full z-30 flex bg-transparent p-2 items-center justify-center h-16 px-5">
			<!-- <div class="fixed w-full z-30 flex bg-white dark:bg-[#0F172A] p-2 items-center justify-center h-16 px-10"> -->
			<div
				class="logo dark:text-white  transform ease-in-out duration-500 flex-none h-full flex items-center justify-center"
				:class="isActiveSide ? 'ml-12' : ''">
				<router-link to="/">
					<img class="block h-6 md:h-8 w-auto " src="../assets/logo.png" alt="ifc4All logo">
				</router-link>
				<div>
					<router-link class="ml-5" to="/ifcAR"> Go AR </router-link>
				</div>
			</div>

			<!-- SPACER -->
			<div class="grow h-full flex items-center justify-center"></div>
			<div class="flex-none h-full text-center flex items-center justify-center">
			</div>
		</div>
	</div>
</template>

    