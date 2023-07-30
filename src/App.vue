<script setup>
import { RouterView } from 'vue-router';
import ModernNavBar from './components/ModernNavBar.vue';
</script>

<template>
  <div class="bg-gradient-to-t from-blue-100 via-blue-100 to-blue-200 
  	dark:from-slate-900 dark:via-slate-600 dark:to-slate-900 relative scroll-m-0 scroll-p-0">
		<ModernNavBar />
		<RouterView />
	</div>
</template>
