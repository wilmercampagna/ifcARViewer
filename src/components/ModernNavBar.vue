<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
	<nav class="fixed w-full top-0 z-30 h-14
		bg-transparent backdrop-blur-sm">
		<div class="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
			<!-- Logo & Brand -->
			<router-link to="/" class="flex items-center gap-2 group">
				<img src="../assets/logo.png" alt="ifcAR"
					class="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
				<span class="text-sm font-bold text-slate-800 dark:text-white tracking-tight hidden sm:inline">
					ifcAR Viewer
				</span>
			</router-link>

			<!-- Nav Links -->
			<div class="flex items-center gap-2">
				<router-link to="/ifcAR"
					class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium
						bg-gradient-to-r from-blue-600 to-cyan-500 text-white
						hover:shadow-lg hover:shadow-blue-500/30
						hover:scale-105 transition-all duration-300">
					<mdicon name="augmented-reality" class="text-base" />
					<span class="hidden sm:inline">Go AR</span>
				</router-link>

				<!-- Dark Mode Toggle -->
				<button @click="toggleDark()"
					class="w-9 h-9 rounded-full flex items-center justify-center
						text-slate-600 dark:text-slate-300
						hover:bg-slate-100 dark:hover:bg-slate-800
						transition-colors duration-200"
					:title="isDark ? 'Modo claro' : 'Modo oscuro'">
					<mdicon v-if="isDark" name="weather-sunny" class="text-lg" />
					<mdicon v-else name="weather-night" class="text-lg" />
				</button>
			</div>
		</div>
	</nav>
</template>
