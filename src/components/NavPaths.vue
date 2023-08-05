<template>
	<div>
		<router-link to="/"
			class="ml-4 hover:ml-10 w-5/6 text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-6 transform ease-in-out duration-300 flex flex-row items-center space-x-3">
			<mdicon name="home" />
			<div> Home </div>
		</router-link>
		<router-link to="/ifcVR"
			class="ml-4 hover:ml-10 w-5/6 text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-6 transform ease-in-out duration-300 flex flex-row items-center space-x-3">
			<mdicon name="virtual-reality" />
			<div> Ifc VR </div>
		</router-link>
		<router-link to="/ifcAR"
			class="ml-4 hover:ml-10 w-5/6 text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-6 transform ease-in-out duration-300 flex flex-row items-center space-x-3">
			<mdicon name="augmented-reality" />
			<div> Ifc AR </div>
		</router-link>
		<router-link to="/ifcarsetup"
			class="ml-4 hover:ml-10 w-5/6 text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-6 transform ease-in-out duration-300 flex flex-row items-center space-x-3">
			<mdicon name="augmented-reality" />
			<div> Ifc ARSetup </div>
		</router-link>
		<router-link to="/ifcGame"
			class="ml-4 hover:ml-10 w-5/6 text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-6 transform ease-in-out duration-300 flex flex-row items-center space-x-3">
			<mdicon name="controller" />
			<div> Ifc Game </div>
		</router-link>
	</div>
</template>