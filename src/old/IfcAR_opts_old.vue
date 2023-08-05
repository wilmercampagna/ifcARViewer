<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import LoadIfcButton from '../components/LoadIfcButton.vue';
import {
	MeshLambertMaterial,
	Mesh,
	WebGLRenderer,	
	PCFShadowMap,
  ACESFilmicToneMapping,
} from 'three';
import { size, camera, sceneAR } from '../helpers/configs/ARScene.js';
import Resizer from '../helpers/Resizer.js';
import { ifcLoader, setupIfcLoader } from '../helpers/Loader.js';
import Controls from '../helpers/Controls.js';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import ModelsTransform from '../helpers/TransformModels.js';
import ARTools from '../components/ARTools.vue';
import CounterComponent from '../components/Counter.vue';

export default {
	name: 'IfcAR',
	components: {
    LoadIfcButton,
    ARTools,
		CounterComponent,
	},
	setup() {
		const canvas = ref(null);
		const ifcModels = [];
		setupIfcLoader(ifcLoader);
		const scaleFactor = ref(0);
		const xPos = ref(0);
		const yPos = ref(0);
		const zPos = ref(0);

		const tester = ()=> {
			console.log(xPos.value);
			console.log(yPos.value);
			console.log(zPos.value);
		}
		const xdec = () => {
			xPos.value -= 0.1;
			xPos.value = Number(xPos.value.toFixed(2));
		};
		const xinc = () => {
			xPos.value += 0.1;
			xPos.value = Number(xPos.value.toFixed(2));
		};
		const ydec = () => {
			yPos.value -= 0.1;
			yPos.value = Number(yPos.value.toFixed(2));
		};
		const yinc = () => {
			yPos.value += 0.1;
			yPos.value = Number(yPos.value.toFixed(2));
		};
		const zdec = () => {
			zPos.value -= 0.1;
			zPos.value = Number(zPos.value.toFixed(2));
		};
		const zinc = () => {
			zPos.value += 0.1;
			zPos.value = Number(zPos.value.toFixed(2));
		};

		const lambMaterial = new MeshLambertMaterial({ transparent: true, opacity: 0.1, color: 0x77aaff });

		const loadIfcFile = async (change) => {
			const ifcURL = URL.createObjectURL(change.target.files[0]);
			const ifcModel = await ifcLoader.loadAsync(ifcURL);
			const modelCopy = new Mesh(ifcModel.geometry, lambMaterial);
			ifcModels.push(ifcModel);
			// sceneAR.add(modelCopy)
			sceneAR.add(ifcModel)
		};

		const modTransform = new ModelsTransform(ifcModels);
		const scaleModels = modTransform.scaleModels;
		const moveModels = modTransform.moveModels;

		const makeScale = () => {
			if(ifcModels.length > 0) {
				scaleModels(scaleFactor.value);
			} else {
				alert('No hay modelos cargados');
			}

		};

		const changePos = () => {
			if(ifcModels.length > 0) {
				moveModels(xPos.value, yPos.value, zPos.value);
			} else {
				alert('No hay modelos cargados');
			}
		};

		onMounted(() => {
			// Config the renderer      
			const renderer = new WebGLRenderer({ antialias: true, canvas: canvas.value, alpha: true });
			renderer.setSize(size.width, size.height);
			renderer.setSize(size.width, size.height);
			renderer.shadowMap.enabled = true
			renderer.shadowMap.type = PCFShadowMap
			renderer.useLegacyLights = true
			// renderer.outputColorSpace = RGBAFormat 
			renderer.toneMapping = ACESFilmicToneMapping
			renderer.toneMappingExposure = 1

			const bgContainer = document.getElementById('bgContainer');
			renderer.xr.addEventListener('sessionstart', () => {
				bgContainer.classList.remove('bg-gradient-to-t', 'from-blue-100', 'via-blue-100',
					'to-blue-200', 'dark:from-slate-900', 'dark:via-slate-600', 'dark:to-slate-900');
				bgContainer.classList.add("bg-transparent");
			});
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
				if (renderer.xr.getSession()) {
					makeScale();
					changePos();
				}
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

		return { canvas, loadIfcFile, scaleFactor, makeScale, xPos, yPos, zPos, 
			changePos, tester, xdec, xinc, ydec, yinc, zdec, zinc}
	}
};
</script>

<template>
	<div>
		<div class="relative ">
			<div class="pl-5 pr-5 pt-12 w-full absolute">
				<ARTools v-model:scale="scaleFactor" > 
					<template v-slot:scaleBtn> 
						<button  @click="makeScale" class="text-white ml-1 hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-1 px-3 rounded-r-full transform ease-in-out duration-300 ">
							<mdicon name="resize" />
						</button>
					</template>
					<template v-slot:ARTools>
						<div class="flex">
							<CounterComponent @increment="xinc" @decrement="xdec" 
								label-name="x" :counter-value="xPos"/>
							<CounterComponent @increment="yinc" @decrement="ydec"
								label-name="y" :counter-value="yPos"/>
							<CounterComponent @increment="zinc" @decrement="zdec"
								label-name="z" :counter-value="zPos"/>
						</div>
						<button @click="changePos">Clik to test</button>
					</template>
				</ARTools>
				<LoadIfcButton :loadFunction="loadIfcFile" />
			</div>
			<div>
				<canvas ref="canvas"></canvas>
			</div>
		</div>
	</div>
</template>