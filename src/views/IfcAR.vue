<script>
import { ref, onMounted, onBeforeUnmount, render } from 'vue';
import LoadIfcButton from '../components/LoadIfcButton.vue';
import {
	MeshLambertMaterial,
	Mesh,
	WebGLRenderer,
} from 'three';
import { size, camera, dolly, dummy, sceneAR } from '../helpers/configs/ARScene.js';
// import scene from '../helpers/configs/Scene.js';
import Resizer from '../helpers/Resizer.js';
import { ifcLoader, setupIfcLoader } from '../helpers/Loader.js';
import Controls from '../helpers/Controls.js';
// import { ARButton } from '../helpers/ARButton.js';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

export default {
	name: 'IfcAR',
	components: {
		LoadIfcButton,
	},
	setup() {
		const canvas = ref(null);
		const ifcModels = [];
		setupIfcLoader(ifcLoader);

		const lambMaterial = new MeshLambertMaterial({ transparent: true, opacity: 0.1, color: 0x77aaff });

		const loadIfcFile = async (change) => {
			const ifcURL = URL.createObjectURL(change.target.files[0]);
			const ifcModel = await ifcLoader.loadAsync(ifcURL);
			const modelCopy = new Mesh(ifcModel.geometry, lambMaterial);
			ifcModels.push(ifcModel);
			sceneAR.add(modelCopy)
			sceneAR.add(ifcModel)
		};

		onMounted(() => {
			// Config the renderer      
			const renderer = new WebGLRenderer({ antialias: true, canvas: canvas.value, alpha: true });
			renderer.setSize(size.width, size.height);
			const controls = Controls(camera, renderer);
			controls.update();
			renderer.xr.enabled = true;
			const arButton = ARButton.createButton(renderer, {
				requiredFeatures: ['hit-test'],
				optionalFeatures: ['dom-overlay'],
				domOverlay: { root: document.body },
				hitTestSource: 'local',
				hitTestMode: 'closest',			
			});
			document.body.appendChild(arButton);

			const onSelect = () => {
				console.log("select")
			};

			const controller = renderer.xr.getController(0);
			controller.addEventListener('select', onSelect);
			sceneAR.add(controller);

			function animate() {
				// requestAnimationFrame(animate);
				renderer.setAnimationLoop(render);
				// renderer.render(sceneAR, camera);
			}

			function render() {
				renderer.render(sceneAR, camera);
			}
			animate();
			Resizer(size, renderer, camera);
			return { canvas }
		})

		onBeforeUnmount(() => {
			const arBtn = document.getElementById('ARButton');
			document.body.removeChild(arBtn);
		});

		return { canvas, loadIfcFile }
	}
};
</script>

<template>
	<div>
		<div class="relative ">
			<div class="pl-5 pr-5 w-full absolute">
				<LoadIfcButton :loadFunction="loadIfcFile" />
			</div>
			<div>
				<canvas ref="canvas"></canvas>
			</div>
		</div>
	</div>
</template>