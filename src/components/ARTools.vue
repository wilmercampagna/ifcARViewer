<script setup>
import { computed, ref } from 'vue'
import { useStore } from '../store/index.js'
import router from '../router.js'

const props = defineProps({
	scale: {
		type: Number,
		default: 0.5,
	},
})

const isActiveSide = ref(true);
const isTransformOpen = ref(false);

const openNav = () => isActiveSide.value = !isActiveSide.value;
const openTransform = () => isTransformOpen.value = !isTransformOpen.value;
const store = useStore();
let currentPath = computed(() => router.currentRoute.value.path);

</script>

<template>
	<div v-if="currentPath==='/ifcAR'" >
		<aside class="w-60 fixed transition transform ease-in-out duration-1000 z-30 flex h-screen right-0
			bg-gradient-to-l dark:from-[#1E293B] dark:via-blue-500 dark:to-transparent from-indigo-500 to-transparent "
			:class="isActiveSide ? 'translate-x-48' : 'translate-x-none'">
			<!-- open sidebar button -->
			<div @click="openNav"
				class="-left-4 transition transform ease-in-out duration-500 z-50 flex border-4 border-white dark:border-[#0F172A] bg-[#1E293B] 
				dark:hover:bg-blue-500 hover:bg-purple-500 absolute top-2 p-3 rounded-full text-white hover:rotate-45">
				<!-- <mdicon name="toolbox-outline" class="w-4 h-4 justify-center"/> -->
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"
					class="w-4 h-4">
					<path strokeLinecap="round" strokeLinejoin="round"
						d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
				</svg>
			</div>
			<div class="max-toolbar w-full right-4 transition transform ease-in-out duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B]  absolute top-2 rounded-full h-12"
				:class="isActiveSide ? '-translate-x-24 scale-x-0' : 'translate-x-none'">				
				<div class="flex items-center group bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500  pl-6 pr-1 py-1 rounded-full text-white  ">
					<div class="transform ease-in duration-400 ml-6 pr-4">
						Augmented ifc
					</div>
				</div>
			</div>

			<!-- MAX SIDEBAR-->
			<div class="max flex text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]"
				:class="isActiveSide ? 'hidden' : 'flex'">				
				<div >
					<button @click="openTransform" class="hover:-ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
						<mdicon name="resize" />
						<mdicon name="axis-arrow" />
						<mdicon name="axis-x-rotate-clockwise" />
						<div> click </div>
					</button>
				</div>
				<div v-if="isTransformOpen">
					<div >
						<div class="">
							<label class="text-slate-700 dark:text-white" for="scale">Scale</label>
							<div class="flex justify-center">
								<input type="number"  min="0" max="10" :value="scale" @input="(el) => $emit('update:scale', parseFloat(el.target.value))" placeholder="Scale" step="0.05" name="scale" id="scale"
									class="text-white hover:font-bold dark:hover:text-blue-500 p-1 pl-3 rounded-l-full bg-gradient-to-r dark:from-[#1E293B] dark:to-blue-500 
									from-indigo-500 to-transparent transform ease-in-out duration-300">
								<slot name="scaleBtn"></slot>
							</div>
						</div>
					</div>
					<slot name="ARTools"></slot>
				</div>
			</div>
		</aside>
	</div>
</template>

    