<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import LoadIfcButton from '../components/LoadIfcButton.vue';
import {
	MeshLambertMaterial,
	Mesh,
	WebGLRenderer,
	PCFShadowMap,
	ACESFilmicToneMapping,
	Vector3,
} from 'three';
import { size, camera, sceneAR } from '../helpers/configs/ARScene.js';
import Resizer from '../helpers/Resizer.js';
import { ifcLoader, setupIfcLoader } from '../helpers/Loader.js';
import Controls from '../helpers/Controls.js';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import ModelsTransform from '../helpers/TransformModels.js';
import ARTools from '../components/ARTools.vue';
import Counter from '../components/basics/Counter.vue';
import CallbackBtn from '../components/basics/ARCallbackButton.vue';
import IfcClassAR from '../components/IfcClassAR.vue';

const canvas = ref(null);
const ifcModels = [];
setupIfcLoader(ifcLoader);
const scaleFactor = ref(0.5);
const xPos = ref(0);
const yPos = ref(0);
const zPos = ref(0);
const isTypeOpen = ref(false);

const openType = () => isTypeOpen.value = !isTypeOpen.value;
const tester = () => {
	console.log(ifcModels[0].name, ifcModels[0].modelID);
	console.log('Hola')
}

const ifcClasses = [
	'ifcWall',
	'ifcColumn',
	'ifcBeam',
	'ifcSlab',
	'ifcStair',
]

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
	const modelName = change.target.files[0].name;
	const ifcURL = URL.createObjectURL(change.target.files[0]);	
	const ifcModel = await ifcLoader.loadAsync(ifcURL);
	const modelCopy = new Mesh(ifcModel.geometry, lambMaterial);
	ifcModel.name = modelName;
	ifcModels.push(ifcModel);
	// sceneAR.add(modelCopy)
	sceneAR.add(ifcModel)
	console.log(ifcModel)
	const modelTypes = await ifcLoader.ifcManager.types.state.api.GetAllTypesOfModel(0);
	console.log(modelTypes)
};

const modTransform = new ModelsTransform(ifcModels);
const makeScale = () => modTransform.scaleModels(scaleFactor.value);
const changePos = () => modTransform.moveModels(xPos.value, yPos.value, zPos.value);
const rotateLeft = () => modTransform.rotateModels(Math.PI / 32);
const rotateRight = () => modTransform.rotateModels(-Math.PI / 32);

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

</script>

<template>
	<div>
		<div class="relative ">
			<div class="pl-5 pr-5 pt-12 w-full absolute">
				<ARTools @activeCrop="tester" @starMeasure="tester" @showTypes="openType" 
					v-model:scale="scaleFactor">
					<template v-slot:scaleBtn>
						<CallbackBtn someClass="rounded-r-full" icon-name="resize" @function="makeScale"/>
					</template>
					<template v-slot:ARTools>						
						<div class="border-t-2 border-sky-600 mt-3 pt-3">
							<label>Displacement</label>
							<div class="flex">
								<Counter @increment="xinc" @decrement="xdec" label-name="x" :counter-value="xPos" />
								<Counter @increment="yinc" @decrement="ydec" label-name="y" :counter-value="yPos" />
								<Counter @increment="zinc" @decrement="zdec" label-name="z" :counter-value="zPos" />
							</div>						
							<CallbackBtn someClass="rounded-full" class="mt-2" text="Move model" icon-name="axis-arrow" @function="changePos"/>
						</div>
						<div class="border-t-2 border-sky-600 mt-3 pt-3">
							<label>Rotate</label>
							<div class="flex">
								<CallbackBtn someClass="rounded-l-full" icon-name="phone-rotate-portrait" @function="rotateLeft"/>
								<CallbackBtn someClass="rounded-r-full" icon-name="phone-rotate-landscape" @function="rotateRight"/>
							</div>
						</div>
						<div class="border-t-2 border-sky-600 mt-3 pt-3 mb-28"></div>						
					</template>
				</ARTools>
				<LoadIfcButton :loadFunction="loadIfcFile" />
				<IfcClassAR :ifc-classes="ifcClasses" v-if="isTypeOpen"/>
				<div>

				</div>
			</div>
			<div>
				<canvas ref="canvas"></canvas>
			</div>
		</div>
	</div>
</template>