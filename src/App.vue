<script setup>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="bg-gradient-to-t from-blue-100 via-blue-100 to-blue-200 dark:from-slate-900 dark:via-slate-600 dark:to-slate-900 relative">
		<NavBar class="z-50" />
		<RouterView />
	</div>
</template>
