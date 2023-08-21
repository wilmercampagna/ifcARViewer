<script>

</script>

<template>
	<div class="m-2 p-2 md:p-8 text-xs md:text-base">
		<div>
			<h1 class="text-3xl text-teal-500 dark:text-sky-400 font-semibold">
				Guía de uso ifcAR
			</h1>
			<div>
				<div class="py-2">
					<div class="flex p-5 sm:font-semibold justify-center text-slate-600 dark:text-cyan-500 text-xs sm:text-md">
						<p class="flex justify-center">
							<span class="hidden sm:flex">@wilmercampagna </span>
							<img class="h-5 w-5 mr-2 ml-2" src="../../assets/logo.png" alt="Logo">
						</p>
						<p class="flex flex justify-center">
							<span class="hidden sm:flex"> Grupo de investigación GRUA </span>
							<img src="../../assets/grua.png" alt="Logo" class="h-5 w-5 mr-2 ml-2">
						</p>
						<p class="flex flex justify-center">
							<span class="hidden sm:flex"> Universidad del Valle. </span>
							<img src="../../assets/logoUV.jpg" alt="Logo" class="h-5  mr-2 ml-2">
						</p>
					</div>
				</div>
				<div class="text-justify">
					<p >
						IfcAR es una aplicación que permite cargar modelos ifc y proyectarlos en sesiones de realidad aumentada, sobreponiendo objectos virtuales sobre el plano físico. Estos objetos virtuales se pueden visualizar a través de dispositivos móviles mostrando el plano físico a través de las cámaras y en pantalla los modelos ifc. 
					</p>
				</div>
				<div class="pt-6">
					<h2 class="text-2xl text-teal-500 dark:text-sky-400 font-semibold">
						Compatilidad
					</h2>
					<div>
						<h2 class="text-xl pt-4 text-teal-500 dark:text-sky-400 font-semibold">
							Android
						</h2>
						<a class="hover:text-blue-500 hover:dark:text-yellow-500 pt-4"
							href="https://developers.google.com/ar/devices?hl=es-419" target="_blank">
							Dispositivos compatibles</a>
						<h2 class="text-xl pt-4 text-teal-500 dark:text-sky-400 font-semibold">
							IOS
						</h2>
						<a class="hover:text-blue-500 hover:dark:text-yellow-500 pt-4"
							href="https://apps.apple.com/us/app/webxr-viewer/id1295998056" target="_blank">
							Descargar WebXR</a>
					</div>
				</div>
				<div class="pt-6">
					<h2 class="text-xl md:text-2xl text-teal-500 dark:text-sky-400 font-semibold">Ir a ifcAR</h2>
					<router-link to="/ifcAR"
						class="text-sky-500 mt-4 flex text-white hover:text-purple-500 bg-transparent
							dark:hover:text-blue-500">Ir a  
						<mdicon name="augmented-reality" class="text-2xl" />
					</router-link>
					<p class="pt-2">O presiona sobre el logo de ifc4All</p>
					<p class="pt-2">Luego despliega el panel clicando el boton circular que aparece</p>
					<p class="pt-2">Clic en apps</p>
					<p class="pt-2">Clic Ifc AR</p>
				</div>
				<div class="pt-6">
					<h2 class="text-xl md:text-2xl text-teal-500 dark:text-sky-400 font-semibold">Enlace a la Guía de usuario completa en versión pdf</h2>
					<a class="pt-6 hover:text-blue-500 hover:dark:text-yellow-500 "
							href="https://drive.google.com/file/d/16hcD7iIvILecr0616TbzO3cIxcwy0trZ/view?usp=sharing" target="_blank">
							Manual de usuario</a>
				</div>
				<div class="pt-6">
					<h2 class="text-xl md:text-2xl text-teal-500 dark:text-sky-400 font-semibold">Mira el video tutorial de uso</h2>
					<div class="flex justify-center pt-4">
						<iframe class="w-3/4 aspect-video" src="https://www.youtube.com/watch?v=wyR4NRAEXdw" 
							frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope" 
							allowfullscreen></iframe>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>