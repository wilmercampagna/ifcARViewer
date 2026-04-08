<script setup>
import { ref } from 'vue';
import ARGuide from '../components/guides/ARGuide.vue';

const showGuide = ref(false);
const toggleGuide = () => showGuide.value = !showGuide.value;
</script>

<template>
	<div class="min-h-screen pt-16">
		<!-- Hero Section -->
		<section class="relative overflow-hidden px-4 py-16 md:py-24 lg:py-32">
			<div class="max-w-5xl mx-auto text-center">
				<!-- Logo -->
				<div class="flex justify-center mb-8">
					<img src="../assets/logo.png" alt="ifcAR Logo" class="h-20 md:h-28 drop-shadow-lg" />
				</div>

				<!-- Title -->
				<h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold
					text-slate-800 dark:text-white tracking-tight mb-6">
					Making BIM dimensions
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500
						dark:from-cyan-400 dark:to-blue-400">
						easier
					</span>
				</h1>

				<!-- Subtitle -->
				<p class="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300
					max-w-2xl mx-auto leading-relaxed mb-10">
					Iniciativa open source para visualizar archivos IFC en 3D y en
					Realidad Aumentada, ampliando las posibilidades del OpenBIM.
				</p>

				<!-- CTA Buttons -->
				<div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
					<router-link to="/ifcAR"
						class="inline-flex items-center gap-2 px-8 py-3 rounded-full
							bg-gradient-to-r from-blue-600 to-cyan-500
							text-white font-semibold text-lg
							shadow-lg shadow-blue-500/30
							hover:shadow-xl hover:shadow-blue-500/40
							hover:scale-105 transition-all duration-300">
						<mdicon name="augmented-reality" class="text-xl" />
						Iniciar AR Viewer
					</router-link>

					<button @click="toggleGuide"
						class="inline-flex items-center gap-2 px-8 py-3 rounded-full
							bg-gradient-to-r from-purple-600 to-pink-500
							text-white font-semibold text-lg
							shadow-lg shadow-purple-500/30
							hover:shadow-xl hover:shadow-purple-500/40
							hover:scale-105 transition-all duration-300">
						{{ showGuide ? 'Ocultar guía' : 'Ver guía rápida' }}
					</button>
					</div>

				<!-- AR Guide (collapsible, right below buttons) -->
				<transition
					enter-active-class="transition-all duration-500 ease-out"
					leave-active-class="transition-all duration-300 ease-in"
					enter-from-class="opacity-0 -translate-y-4"
					enter-to-class="opacity-100 translate-y-0"
					leave-from-class="opacity-100 translate-y-0"
					leave-to-class="opacity-0 -translate-y-4">
					<div v-if="showGuide" class="max-w-4xl mx-auto">
						<ARGuide />
					</div>
				</transition>

			</div>
		</section>

		<!-- Features Section -->
		<section class="px-4 pb-16">
			<div class="max-w-5xl mx-auto">
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					<!-- Feature Card 1 -->
					<div class="group p-6 rounded-2xl
						bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
						border border-slate-200 dark:border-slate-700
						hover:border-blue-400 dark:hover:border-cyan-500
						hover:shadow-lg transition-all duration-300">
						<div class="w-12 h-12 rounded-xl mb-4 flex items-center justify-center
							bg-blue-100 dark:bg-blue-900/40
							text-blue-600 dark:text-cyan-400">
							<mdicon name="cube-scan" class="text-2xl" />
						</div>
						<h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-2">
							Visualizacion 3D
						</h3>
						<p class="text-sm text-slate-600 dark:text-slate-400">
							Carga y explora modelos IFC directamente en el navegador con controles intuitivos de camara.
						</p>
					</div>

					<!-- Feature Card 2 -->
					<div class="group p-6 rounded-2xl
						bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
						border border-slate-200 dark:border-slate-700
						hover:border-blue-400 dark:hover:border-cyan-500
						hover:shadow-lg transition-all duration-300">
						<div class="w-12 h-12 rounded-xl mb-4 flex items-center justify-center
							bg-purple-100 dark:bg-purple-900/40
							text-purple-600 dark:text-purple-400">
							<mdicon name="augmented-reality" class="text-2xl" />
						</div>
						<h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-2">
							Realidad Aumentada
						</h3>
						<p class="text-sm text-slate-600 dark:text-slate-400">
							Proyecta modelos BIM sobre el mundo real usando WebXR desde tu dispositivo movil.
						</p>
					</div>

					<!-- Feature Card 3 -->
					<div class="group p-6 rounded-2xl
						bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
						border border-slate-200 dark:border-slate-700
						hover:border-blue-400 dark:hover:border-cyan-500
						hover:shadow-lg transition-all duration-300">
						<div class="w-12 h-12 rounded-xl mb-4 flex items-center justify-center
							bg-teal-100 dark:bg-teal-900/40
							text-teal-600 dark:text-teal-400">
							<mdicon name="crop" class="text-2xl" />
						</div>
						<h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-2">
							Herramientas BIM
						</h3>
						<p class="text-sm text-slate-600 dark:text-slate-400">
							Planos de corte, categorias IFC, transparencias y transformaciones en tiempo real.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Credits Section -->
		<footer class="px-4 py-12 border-t border-slate-200 dark:border-slate-700/50">
			<div class="max-w-4xl mx-auto">
				<p class="text-center text-sm text-slate-500 dark:text-slate-400 mb-6">
					Desarrollado en colaboracion con
				</p>
				<div class="flex flex-wrap items-center justify-center gap-8 md:gap-12">
					<a href="https://github.com/wilmercampagna" target="_blank"
						class="flex items-center gap-2 text-slate-600 dark:text-slate-400
							hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
						<img src="../assets/logo.png" alt="wilmercampagna" class="h-8 w-8" />
						<span class="text-sm font-medium hidden sm:inline">@wilmercampagna</span>
					</a>
					<div class="flex items-center gap-2 text-slate-600 dark:text-slate-400">
						<img src="../assets/grua.png" alt="GRUA" class="h-8 w-8" />
						<span class="text-sm font-medium hidden sm:inline">Grupo GRUA</span>
					</div>
					<div class="flex items-center gap-2 text-slate-600 dark:text-slate-400">
						<img src="../assets/logoUV.jpg" alt="Universidad del Valle" class="h-8" />
						<span class="text-sm font-medium hidden sm:inline">Universidad del Valle</span>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>
