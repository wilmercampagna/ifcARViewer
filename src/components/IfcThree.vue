<script>
export default {
	props: {
		data: {
			type: Array,
			required: true
		}				
	}}

</script>

<template>
	<div class="w-fit h-1/2 max-h-96 overflow-auto scroll-m-0 scroll-p-0">
		<div class="" v-for="model in data">
			<h2>
				<button class="flex items-center justify-between w-full p-1 sm:px-3 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
					<mdicon name="domain"/>
					<span>
						{{ model.type }} 
					</span>
					<span>
						{{ model.expressID }} 
					</span>
				</button>
			</h2>
			<div class="ml-1">
				<h3>
					<button class="flex items-center justify-between w-full p-1 sm:px-3 rounded-t-xl font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
						<mdicon name="map-marker-radius"/>
						<span>
							{{ model.children[0].type }}
						</span>
						<span>
							{{ model.children[0].expressID }}							
						</span>
					</button>
				</h3>
				<div class="ml-1">
					<h4>
						<button class="flex items-center justify-between w-full p-1 sm:px-3 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
							<mdicon name="home-city"/>
							<span>
								{{ model.children[0].children[0].type }}
							</span>
							<span>
								{{ model.children[0].children[0].expressID }}
							</span>
						</button>
					</h4>
					<div class="ml-1" v-for="el in model.children[0].children[0].children">
						<h4> 
							<button class="flex items-center justify-between w-full p-1 sm:px-3 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" >
								<mdicon name="floor-plan"/>
								<span>
									{{ el.type }}									
								</span>
								<span>
									{{ el.expressID }} 
								</span>
							</button>
						</h4>
						<div class="ml-1" v-for="subel in el.children">
							<button class="flex items-center justify-between w-full p-1 sm:px-3 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
								<span> {{ subel.type }} </span>
								<span> {{ subel.expressID }} </span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
