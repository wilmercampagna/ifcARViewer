<template>
	<div class="translate-x-52 flex">
		<router-link to="/"
			class="hover:mt-4 justify-center text-white hover:text-purple-500 
						dark:hover:text-blue-500 w-14 bg-[#1E293B] p-1 transform rounded-l-full ease-in-out duration-300 flex">
			<mdicon name="home" />
		</router-link>
		<router-link to="/ifcVR"
			class="hover:mt-4 justify-center text-white hover:text-purple-500 
						dark:hover:text-blue-500 w-14 bg-[#1E293B] p-1 transform ease-in-out duration-300 flex">
			<mdicon name="virtual-reality" />
		</router-link>
		<router-link to="/ifcAR"
			class="hover:mt-4 justify-center text-white hover:text-purple-500 
						dark:hover:text-blue-500 w-14 bg-[#1E293B] p-1 transform ease-in-out duration-300 flex">
			<mdicon name="augmented-reality" />
		</router-link>
		<router-link to="/ifcGame"
			class="hover:mt-4 justify-center text-white hover:text-purple-500 
						dark:hover:text-blue-500 w-14 bg-[#1E293B] p-1 rounded-r-full transform ease-in-out duration-300 flex">
			<mdicon name="controller" />
		</router-link>
	</div>
</template>