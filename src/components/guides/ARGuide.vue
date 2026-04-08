<script setup>
</script>

<template>
	<div class="rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
		border border-slate-200 dark:border-slate-700 p-6 md:p-10">

		<!-- Header -->
		<div class="flex items-center gap-3 mb-8">
			<div class="w-10 h-10 rounded-xl flex items-center justify-center
				bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
				<mdicon name="augmented-reality" class="text-xl" />
			</div>
			<h1 class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
				Guia de uso ifcAR
			</h1>
		</div>

		<!-- Description -->
		<p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-10 text-sm md:text-base">
			ifcAR permite cargar modelos IFC y proyectarlos en sesiones de realidad aumentada,
			sobreponiendo objetos virtuales sobre el plano fisico. Visualiza modelos BIM
			a traves de las camaras de tu dispositivo movil.
		</p>

		<!-- Steps Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

			<!-- Step 1: Go to AR -->
			<div class="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40">
				<div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
					bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-cyan-400
					text-sm font-bold">
					1
				</div>
				<div>
					<h3 class="font-semibold text-slate-800 dark:text-white mb-1">Ir a ifcAR</h3>
					<p class="text-sm text-slate-600 dark:text-slate-400">
						Presiona el boton
						<router-link to="/ifcAR"
							class="inline-flex items-center gap-1 text-blue-600 dark:text-cyan-400
								hover:underline font-medium">
							Iniciar AR <mdicon name="augmented-reality" class="text-sm" />
						</router-link>
						o navega desde el menu.
					</p>
				</div>
			</div>

			<!-- Step 2: Load file -->
			<div class="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40">
				<div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
					bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-cyan-400
					text-sm font-bold">
					2
				</div>
				<div>
					<h3 class="font-semibold text-slate-800 dark:text-white mb-1">Cargar modelo IFC</h3>
					<p class="text-sm text-slate-600 dark:text-slate-400">
						Arrastra o selecciona un archivo <code class="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-600 text-xs">.ifc</code>
						desde tu dispositivo.
					</p>
				</div>
			</div>

			<!-- Step 3: Tools -->
			<div class="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40">
				<div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
					bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-cyan-400
					text-sm font-bold">
					3
				</div>
				<div>
					<h3 class="font-semibold text-slate-800 dark:text-white mb-1">Usar herramientas</h3>
					<p class="text-sm text-slate-600 dark:text-slate-400">
						Despliega el panel lateral para escalar, rotar, mover el modelo y gestionar categorias IFC.
					</p>
				</div>
			</div>

			<!-- Step 4: Start AR -->
			<div class="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40">
				<div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
					bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-cyan-400
					text-sm font-bold">
					4
				</div>
				<div>
					<h3 class="font-semibold text-slate-800 dark:text-white mb-1">Iniciar sesion AR</h3>
					<p class="text-sm text-slate-600 dark:text-slate-400">
						Presiona el boton START AR para proyectar el modelo sobre el entorno fisico a traves de la camara.
					</p>
				</div>
			</div>
		</div>

		<!-- Compatibility Section -->
		<div class="mb-10">
			<h2 class="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
				<mdicon name="phone-rotate-portrait" class="text-blue-600 dark:text-cyan-400" />
				Compatibilidad
			</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div class="p-4 rounded-xl border border-slate-200 dark:border-slate-600">
					<h3 class="font-semibold text-slate-800 dark:text-white mb-2">Android</h3>
					<p class="text-sm text-slate-600 dark:text-slate-400 mb-2">
						Requiere un dispositivo compatible con Google AR Services y navegador Chrome.
					</p>
					<a href="https://developers.google.com/ar/devices?hl=es-419" target="_blank"
						class="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-cyan-400
							hover:underline font-medium">
						Ver dispositivos compatibles
					</a>
				</div>
				<div class="p-4 rounded-xl border border-slate-200 dark:border-slate-600">
					<h3 class="font-semibold text-slate-800 dark:text-white mb-2">iOS</h3>
					<p class="text-sm text-slate-600 dark:text-slate-400 mb-2">
						Requiere la aplicacion WebXR Viewer disponible en la App Store.
					</p>
					<a href="https://apps.apple.com/us/app/webxr-viewer/id1295998056" target="_blank"
						class="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-cyan-400
							hover:underline font-medium">
						Descargar WebXR Viewer
					</a>
				</div>
			</div>
		</div>

		<!-- Resources Section -->
		<div class="mb-10">
			<h2 class="text-xl font-bold text-slate-800 dark:text-white mb-4">
				Recursos
			</h2>
			<div class="flex flex-col sm:flex-row gap-4">
				<a href="https://drive.google.com/file/d/16hcD7iIvILecr0616TbzO3cIxcwy0trZ/view?usp=sharing"
					target="_blank"
					class="flex items-center gap-3 p-4 rounded-xl
						border border-slate-200 dark:border-slate-600
						hover:border-blue-400 dark:hover:border-cyan-500
						hover:shadow-md transition-all duration-300 group">
					<div class="w-10 h-10 rounded-lg flex items-center justify-center
						bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400
						group-hover:scale-110 transition-transform">
						<mdicon name="floor-plan" />
					</div>
					<div>
						<p class="font-medium text-slate-800 dark:text-white text-sm">Manual de usuario</p>
						<p class="text-xs text-slate-500 dark:text-slate-400">Guia completa en PDF</p>
					</div>
				</a>
			</div>
		</div>

		<!-- Video Tutorial -->
		<div>
			<h2 class="text-xl font-bold text-slate-800 dark:text-white mb-4">
				Video tutorial
			</h2>
			<div class="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600">
				<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/wyR4NRAEXdw"
					frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope"
					allowfullscreen loading="lazy"></iframe>
			</div>
		</div>
	</div>
</template>
