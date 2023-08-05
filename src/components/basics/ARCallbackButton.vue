<script setup>
const props = defineProps({
  text: String,
  iconName: String,
	someClass: Array[String]
})
</script>

<template>
  <div class="w-full flex justify-center">
		<button @click="$emit('function')" :class="someClass"
      class="flex flex-row px-1 hover:mt-2 hover:dark:border-0 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-indigo-950 py-1 justify-center border-4 border-transparent dark:border-[#0F172A] bg-[#1E293B] rounded-full">
			<mdicon class="px-2" :name="iconName"></mdicon>
			<span v-if="text" class="px-2">{{ text }}</span>
		</button>
	</div>
</template>
