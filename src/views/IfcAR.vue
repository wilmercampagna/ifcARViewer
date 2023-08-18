<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import LoadIfcButton from '../components/LoadIfcButton.vue';
import {
	MeshLambertMaterial,
	Mesh,
	WebGLRenderer,
	PCFShadowMap,
	ACESFilmicToneMapping,
	Vector3,
	Plane,
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
const scaleFactor = ref(0.5);
const xPos = ref(0);
const yPos = ref(0);
const zPos = ref(0);
const rangeMin = ref(0);
const rangeMax = ref(10);
const rangeValue = ref(5);
const isTypeOpen = ref(false);
const isCropOpen = ref(false);
let renderer;
let controls;

setupIfcLoader(ifcLoader);
const openType = () => isTypeOpen.value = !isTypeOpen.value;
const openCrop = () => isCropOpen.value = !isCropOpen.value;


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

const ifcClasses = [];
const transparentColor = new MeshLambertMaterial({ transparent: true, opacity: 0.2, color: 0x77aaff });

const loadIfcFile = async (change) => {
	const modelName = change.target.files[0].name;
	const ifcURL = URL.createObjectURL(change.target.files[0]);
	// const ifcModel = ifcLoader.load(ifcURL);
	const ifcModel = await ifcLoader.loadAsync(ifcURL);
	ifcModel.name = modelName;
	const modelId = ifcModel.modelID;
	ifcModels.push(ifcModel);
	// sceneAR.add(ifcModel)
	await getAllSpatialTypes(modelId, ifcLoader);
	setupAllCategories(modelId);
	if (ifcModels.length < 2) {
		setupClippingPlanes(renderer)
		turnClipping()
		openCrop()
		setupRangeSlider()
	}
};

const getAllSpatialTypes = async (modelId, ifcLoader) => {
	// const modelTypes = await ifcLoader.ifcManager.getAllItemsOfType(modelId);
	const modelTypes = await ifcLoader.ifcManager.types.state.api.GetAllTypesOfModel(modelId);
	const ifcModelClass = await getIfcDataStructure(modelId);
	const objectTypes = []
	modelTypes.filter(el => {
		const isDuplicate = ifcModelClass.includes(el.typeName);
		if (isDuplicate) {
			objectTypes.push(el);
		}
	})
	ifcClasses.push(...objectTypes);
	return objectTypes;
}

const getIfcDataStructure = async (modelId) => {
	const ifcData = await ifcLoader.ifcManager.getSpatialStructure(modelId);
	const elements = ifcData.children[0].children[0].children;
	let elType = []
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i].children;
		elType.push(...element)
	}
	const uniqueTypes = []
	const unique = elType.filter(el => {
		const isDuplicate = uniqueTypes.includes(el.type);
		if (!isDuplicate) {
			uniqueTypes.push(el.type);
		}
	})
	return uniqueTypes;
}

// Gets the IDs of all the items of a specific category
const getAll = async (category, modelId) => {
	const manager = ifcLoader.ifcManager;
	return manager.getAllItemsOfType(modelId, category, false);
}

// Creates a new subset containing all elements of a category
async function newSubsetOfType(category, modelId) {
	const ids = await getAll(category.typeID, modelId);
	return ifcLoader.ifcManager.createSubset({
		modelID: modelId,
		sceneAR,
		ids,
		removePrevious: true,
		customID: category.typeName.toString(),
	});
}

// Stores the created subsets
const subsets = {};
const transparentSubsets = {};

async function setupAllCategories(modelId) {
	for (let i = 0; i < ifcClasses.length; i++) {
		const category = ifcClasses[i];
		subsets[category.typeName] = await newSubsetOfType(category, modelId);
		const subsetCopy = new Mesh(subsets[category.typeName].geometry, transparentColor);
		transparentSubsets[category.typeName] = subsetCopy;
		// subsets[category.typeName].initialMaterial = subsets[category.typeName].material;
		sceneAR.add(subsets[category.typeName]);
		sceneAR.add(transparentSubsets[category.typeName]);
	}
}

const modTransform = new ModelsTransform(subsets, ifcClasses);
const mod2Transform = new ModelsTransform(transparentSubsets, ifcClasses);
const makeScale = () => {
	modTransform.scaleModels(scaleFactor.value);
	mod2Transform.scaleModels(scaleFactor.value);
}
const changePos = () => {
	modTransform.moveModels(xPos.value, yPos.value, zPos.value);
	mod2Transform.moveModels(xPos.value, yPos.value, zPos.value);
}
const rotateLeft = () => {
	modTransform.rotateModels(Math.PI / 32);
	mod2Transform.rotateModels(Math.PI / 32);
}
const rotateRight = () => {
	modTransform.rotateModels(-Math.PI / 32);
	mod2Transform.rotateModels(-Math.PI / 32);
}

const highLightType = (category) => {
	const subset = subsets[category.typeName];
	console.log(subset)
	console.log(transparentSubsets)
}

const visibilizeTypes = (category) => {
	const subset = subsets[category.typeName];
	const subsetCopy = transparentSubsets[category.typeName]
	subset.visible = !subset.visible;
	subsetCopy.visible = subset.visible;
}

const makeTypesTransparent = (category) => {
	const subset = subsets[category.typeName];
	const subsetCopy = transparentSubsets[category.typeName]
	subset.visible = !subset.visible;
	subsetCopy.visible = !subset.visible;
}


onMounted(() => {
	// Config the renderer      
	renderer = new WebGLRenderer({ antialias: true, canvas: canvas.value, alpha: true });
	renderer.setSize(size.width, size.height);
	renderer.setSize(size.width, size.height);
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = PCFShadowMap
	renderer.useLegacyLights = true
	renderer.toneMapping = ACESFilmicToneMapping
	renderer.toneMappingExposure = 1

	// Clipping Planes
	// renderer.clippingPlanes = [];
	renderer.localClippingEnabled = true;	

	const bgContainer = document.getElementById('bgContainer');
	renderer.xr.addEventListener('sessionstart', () => {
		bgContainer.classList.remove('bg-gradient-to-t', 'from-blue-100', 'via-blue-100',
			'to-blue-200', 'dark:from-slate-900', 'dark:via-slate-600', 'dark:to-slate-900');
		bgContainer.classList.add("bg-transparent");
	});
	controls = Controls(camera, renderer);
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
	return { canvas, renderer, controls }
})

onBeforeUnmount(() => {
	const arBtn = document.getElementById('ARButton');
	document.body.removeChild(arBtn);
});

const clipPlanes = [];

const setupRangeSlider = () => {
	const bounds = ifcModels[0].geometry.boundingBox;
	rangeMin.value = bounds.min.y;
	rangeMax.value = bounds.max.y;
}

watch(rangeValue, (newVal, oldVal) => clipPlanes[0].constant = newVal);

const setupClippingPlanes = (renderer) => {
	//Get a start point for the clipping plane
	const bounds = ifcModels[0].geometry.boundingBox;
	const initialPosition = new Vector3(0.5 * (bounds.max.x+bounds.min.x), rangeValue.value, 0.5 * (bounds.max.z+bounds.min.z));
	
	// Prepare a clipping plane
	const orientation = new Vector3(0, -1, 0);
	const plane = new Plane();
	plane.setFromNormalAndCoplanarPoint(orientation, initialPosition);
	clipPlanes.push(plane);
	renderer.clippingPlanes = [plane];	
}

const turnClipping = () => {
	openCrop();
	if (renderer.clippingPlanes.length > 0) {
		renderer.clippingPlanes = [];
	} else {
		renderer.clippingPlanes = clipPlanes;
	}
}

</script>

<template>
	<div>
		<div class="relative ">
			<div class="pl-5 pr-5 pt-12 w-full absolute">
				<ARTools @rotateLeft="rotateLeft" @rotateRight="rotateRight" @showTypes="openType" @activeCrop="turnClipping"
					v-model:scale="scaleFactor">
					<template v-slot:scaleBtn>
						<CallbackBtn someClass="rounded-r-full" icon-name="resize" @function="makeScale" />
					</template>
					<template v-slot:ARTools>
						<div class="border-t-2 border-sky-600 mt-3 pt-3">
							<label>Displacement</label>
							<div class="flex">
								<Counter @increment="xinc" @decrement="xdec" label-name="x" :counter-value="xPos" />
								<Counter @increment="yinc" @decrement="ydec" label-name="y" :counter-value="yPos" />
								<Counter @increment="zinc" @decrement="zdec" label-name="z" :counter-value="zPos" />
							</div>
							<CallbackBtn someClass="rounded-full" class="mt-2" text="Move model" icon-name="axis-arrow"
								@function="changePos" />
						</div>
					</template>
				</ARTools>
				<LoadIfcButton :loadFunction="loadIfcFile" />
				<IfcClassAR @ifcClass="highLightType" @on-off="visibilizeTypes" @turnOpacity="makeTypesTransparent"
					:ifc-classes="ifcClasses" v-if="isTypeOpen" />
				<div v-if="isCropOpen" class="w-1/5 h-3/4 fixed left-14 top-24 bg-transparent">
						<label for="default-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Crop plane</label>
						<div class="w-fit -rotate-90 fixed -left-10 top-60">
							<input id="default-range" type="range" :min="rangeMin" :max="rangeMax" v-model="rangeValue" step="0.1"								
								class="w-60 h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-indigo-800 to-indigo-300">
						</div>
				</div>
				<div>

				</div>
			</div>
			<div>
				<canvas ref="canvas"></canvas>
			</div>
		</div>
	</div>
</template>