<script setup>
import { ref } from 'vue';

import ARGuide from '../components/guides/ARGuide.vue';
import GameGuide from '../components/guides/GameGuide.vue';
import VRGuide from '../components/guides/VRGuide.vue';

let ar = ref(false);
let vr = ref(false);
let game = ref(false);

const changeAR = () => {
		ar.value = !ar.value;
		vr.value = false;
		game.value = false;
}
const changeVR = () => {
		ar.value = false;
		vr.value = !vr.value;
		game.value = false;
}
const changeGame = () => {
		ar.value = false;
		vr.value = false;
		game.value = !game.value;
}

</script>

<template>
	<div class="min-h-screen pt-16">
		<div class="text-gray-600 dark:text-white">
			<div class="p-5 text-slate-600 dark:text-cyan-500 text-center text-sm md:text-xl lg:text-2xl">
				<span class="hover:text-blue-500 hover:dark:text-pink-500 text-xl sm:text-2xl md:m-10 md:text-4xl lg:text-5xl">
					<p>
						Making BIM dimensions easier
					</p>
				</span>
				<span class="hover:text-blue-500 hover:dark:text-pink-500 m-10 sm:py-10">
					<p>
						Ifc4all - iniciativa open source con microservicios que explotan el potencial de los
						archivos ifc, ampliando las posibilidades del OpenBIM.
					</p>
				</span>
				<span class="hidden sm:block hover:text-blue-500 hover:dark:text-pink-500 m-10">
					<p class="">
						Hemos desarrollado un módulo de realidad extendida (XR),
						el cual incluye visualizadores en VR, AR y un modo game.
					</p>
				</span>
				<span class="p-5 text-blue-800 dark:text-cyan-500">					
					<p class="flex justify-center">
						<button class="px-2 sm:px-4">
							<mdicon class="text-teal-500 dark:text-teal-400 hover:text-blue-500 hover:dark:text-yellow-500 " name="cube-scan"/> 
						</button>
						<button @click="changeAR" class="px-2 sm:px-4">
							<mdicon class="hover:text-blue-500 hover:dark:text-yellow-500 " name="augmented-reality"/>
						</button>
						<button @click="changeVR" class="px-2 sm:px-4">
							<mdicon class="hover:text-blue-500 hover:dark:text-yellow-500 " name="virtual-reality"/>
						</button>
						<button @click="changeGame" class="px-2 sm:px-4">
							<mdicon class="hover:text-blue-500 hover:dark:text-yellow-500 " name="controller"/>
						</button>
					</p>
				</span>
			</div>

			<div>
				<VRGuide v-if="vr"/>
				<ARGuide v-if="ar"/>
				<GameGuide v-if="game"/>
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
