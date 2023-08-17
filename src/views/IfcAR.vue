<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import LoadIfcButton from '../components/LoadIfcButton.vue';
import {
	MeshLambertMaterial,
	MeshPhongMaterial,
	Mesh,
	WebGLRenderer,
	PCFShadowMap,
	ACESFilmicToneMapping,
	Vector3,
	ConeGeometry,
	Plane,
	PointLight,
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
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

const canvas = ref(null);
const ifcModels = [];
const scaleFactor = ref(0.5);
const xPos = ref(0);
const yPos = ref(0);
const zPos = ref(0);
const isTypeOpen = ref(false);
let renderer;
let controls;
let tcontrols1;
let tcontrols2;
let tcontrols3;

setupIfcLoader(ifcLoader);
const openType = () => isTypeOpen.value = !isTypeOpen.value;
const tester = (el) => {
	console.log('Any thing')
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
	scaleDragger();
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
let draggerMesh;

const scaleDragger = () => {
	const sf1 = scaleFactor.value;
	const sf2 = scaleFactor.value + 0.25;
	ifcModels[0].scale.copy(new Vector3(sf1, sf1, sf1))
	ifcModels[0].updateWorldMatrix();
	const bounds = ifcModels[0].geometry.boundingBox;
	const initialDragPosition = new Vector3(0.5 * (bounds.max.x+bounds.min.x), 0.2 * (bounds.max.y), 0.5 * (bounds.max.z+bounds.min.z));
	draggerMesh.scale.copy(new Vector3(sf2, sf2, sf2))
	draggerMesh.position.copy(initialDragPosition);
	draggerMesh.updateWorldMatrix();
	clipPlanes[0].constant = initialDragPosition.y;
}

const setupClippingPlanes = (renderer) => {
	const bounds = ifcModels[0].geometry.boundingBox;

	// Create draggable sphere at the center of bounds
	const initialDragPosition = new Vector3(0.5 * (bounds.max.x+bounds.min.x), 0.2 * (bounds.max.y), 0.5 * (bounds.max.z+bounds.min.z));
	const draggerGeometry = new ConeGeometry(0.5, 1, 4);
	const draggerMaterial = new MeshPhongMaterial({
		color: '#049ef4',
		emissive: '#049ef4',
		shininess: 80,
		reflectivity: 0.8,
	});
	const pLight = new PointLight({
		color: '#4f53d8',
		intensity: 1,
		distance: 3,

	})
	pLight.position.copy(initialDragPosition);
	draggerMesh = new Mesh(draggerGeometry, draggerMaterial);
	draggerMesh.attach(pLight)
	draggerMesh.position.copy(initialDragPosition);
	draggerMesh.name = 'yDragger'
	sceneAR.add(draggerMesh);

	// Prepare a clipping plane
	const orientation = new Vector3(0, -1, 0);
	const plane = new Plane();
	let planePosition = new Vector3(initialDragPosition.x, initialDragPosition.y+1, initialDragPosition.z);
	plane.setFromNormalAndCoplanarPoint(orientation, planePosition);
	clipPlanes.push(plane);
	renderer.clippingPlanes = [plane];

	// Handle drag events
	const dControls = new DragControls([draggerMesh], camera, renderer.domElement);
	dControls.addEventListener('drag', () => {
		// Fix XZ-poistion
		controls.enabled = false;
		draggerMesh.position.set(initialDragPosition.x, draggerMesh.position.y, initialDragPosition.z);
		draggerMesh.updateWorldMatrix();
		// Update clipping plane
		planePosition = new Vector3(draggerMesh.position.x, draggerMesh.position.y+1, draggerMesh.position.z);
		plane.setFromNormalAndCoplanarPoint(new Vector3(0, -1, 0), planePosition);
	});

	dControls.addEventListener('dragend', () => {
		controls.enabled = true;
	});
	// When we are hovering over a sphere we want to disable viewer dC	controls.addEventListener('hoveron', () => {
	dControls.addEventListener('hoveron', () => {		
  	camera.visible = false;
  	draggerMaterial.color.set('#f14668');
	});

	// And turn them back on when we stop hovering over it
	dControls.addEventListener('hoveroff', () => {		
		camera.visible = true;
		draggerMaterial.color.set('#049ef4');
	});
}

const turnClipping = () => {
	if (renderer.clippingPlanes.length > 0) {
		renderer.clippingPlanes = [];
		draggerMesh.visible = !draggerMesh.visible;
	} else {
		renderer.clippingPlanes = clipPlanes;
		draggerMesh.visible = !draggerMesh.visible;
	}
}

</script>

<template>
	<div>
		<div class="relative ">
			<div class="pl-5 pr-5 pt-12 w-full absolute">
				<ARTools @rotateLeft="rotateLeft" @rotateRight="rotateRight" @showTypes="openType" @activeCrop="turnClipping"
					@startMeasure="turnClipping" v-model:scale="scaleFactor">
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
				<div>

				</div>
			</div>
			<div>
				<canvas ref="canvas"></canvas>
			</div>
		</div>
	</div>
</template>