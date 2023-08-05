<script setup>
const props = defineProps({
	labelName: String,
	counterValue: {
		type: Number,
		default: 0,
	},
})

</script>

<template>
	<div class="custom-number-input h-fit w-1/3">
		<div class="grid justify-items-center h-fit w-full rounded-lg relative bg-transparent mt-1">
			<label for="counter" class="w-full  w-8 text-slate-700 dark:text-white text-sm">{{ labelName }} </label>
			<button @click="$emit('increment')" class="dark:bg-sky-600  bg-indigo-500
					hover:text-white hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-950 dark:hover:from-yellow-800 dark:hover:to-yellow-300
					bg-gray-300 text-white hover:bg-gray-400 h-fit w-8 rounded-full cursor-pointer outline-none">
				<span class="text-md">+</span>
			</button>
			<div class="flex justify-center outline-none focus:outline-none text-white text-center w-14 bg-transparent font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default">
				<span>
					{{ counterValue }}
				</span>
			</div>
			<button @click="$emit('decrement')" class="dark:bg-sky-600  bg-indigo-500 hover:text-white hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-950 dark:hover:from-yellow-800 dark:hover:to-yellow-300
					bg-gray-300 text-white hover:text-gray-700 hover:bg-gray-400 h-full w-8 rounded-full cursor-pointer">
				<span class="text-md">-</span>
			</button>
		</div>
	</div>
</template>

<style>
input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .custom-number-input input:focus {
    outline: none !important;
  }

  .custom-number-input button:focus {
    outline: none !important;
  }
</style>