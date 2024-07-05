<script setup>
import { ref } from 'vue';

import ARGuide from '../components/guides/ARGuide.vue';

let ar = ref(false);

const changeAR = () => ar.value = !ar.value;

</script>

<template>
	<div class="min-h-screen pt-16">
		<div class="text-gray-600 dark:text-white">
			<div class="p-4 text-slate-600 dark:text-cyan-500 text-center text-sm md:text-xl lg:text-2xl">
				<span class="hover:text-blue-500 hover:dark:text-pink-500 text-xl sm:text-2xl md:m-10 md:text-4xl lg:text-5xl">
					<p>
						Making BIM dimensions easier
					</p>
				</span>
				<span class="hover:text-blue-500 hover:dark:text-pink-500 m-10 sm:py-10">
					<p>
						Ifc AR Viever - iniciativa open source para visualizar archivos ifc en 3D y en 
						Realidad Aumentada, ampliando las posibilidades del OpenBIM.
					</p>
				</span>
				
				<span class="p-3 text-blue-800 dark:text-cyan-500">					
					<p class="flex justify-center">
						<button @click="changeAR" class="px-2 sm:px-4 flex justify-center">
							<p class="px-2 sm:px-4">Ver guía rápida AR</p>
							<mdicon class="hover:text-blue-500 hover:dark:text-yellow-500 h-10 " name="augmented-reality"/>
						</button>
					</p>
				</span>
			</div>

			<div>
				<ARGuide v-if="ar"/>
			</div>

			<div>
				<div class="flex sm:flex-col p-5 sm:font-semibold justify-center text-slate-600 dark:text-cyan-500 text-xs sm:text-md">
					<p class="flex justify-center">
						<span class="hidden sm:flex"> El módulo Ifc AR ha sido desarrollado por wilmercampagna </span>
						<img class="h-5 w-5 mr-2 ml-2" src="../assets/logo.png" alt="Logo" >
					</p>
					<p class="flex flex justify-center">
						<span class="hidden sm:flex"> en colaboración con el grupo de investigación GRUA  </span>
						<img src="../assets/grua.png" alt="Logo" class="h-5 w-5 mr-2 ml-2">
					</p>
					<p class="flex flex justify-center">
						<span class="hidden sm:flex"> de la Universidad del Valle. </span>
						<img src="../assets/logoUV.jpg" alt="Logo" class="h-5  mr-2 ml-2">
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
