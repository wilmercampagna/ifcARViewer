<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import LoadIfcButton from '../components/LoadIfcButton.vue';
import {
	Raycaster,
	Matrix4,
	MeshLambertMaterial,
	Mesh,
	WebGLRenderer,
	Vector3,
	Line,
	BufferGeometry,
	Clock,
	Quaternion,	
	PCFShadowMap,
 	 // RGBAFormat,
  	ACESFilmicToneMapping,
} from 'three';
import { size, camera, dolly, dummy, sceneVR } from '../helpers/configs/VRScene.js';
import Resizer from '../helpers/Resizer.js';
import { ifcLoader, setupIfcLoader } from '../helpers/Loader.js';
import Controls from '../helpers/Controls.js';
// import { VRButton } from '../helpers/VRButton.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { HTMLMesh } from 'three/examples/jsm/interactive/HTMLMesh.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { CanvasUI } from '../helpers/CanvasUI.js';
import { MousePick } from '../helpers/MousePicker.js';
import Materials from '../helpers/Materials.js';

export default {
	name: 'IfcVR',
	components: {
		LoadIfcButton,
	},
	setup() {
		const canvas = ref(null);
		const ifcModels = [];
		setupIfcLoader(ifcLoader);

		const materials = new Materials();
		const lambMaterial = new MeshLambertMaterial({ transparent: true, opacity: 0.1, color: 0x77aaff });

		const loadIfcFile = async (change) => {
			const ifcURL = URL.createObjectURL(change.target.files[0]);
			const ifcModel = await ifcLoader.loadAsync(ifcURL);
			const modelCopy = new Mesh(ifcModel.geometry, lambMaterial);
			ifcModel.material.push(materials.bricksWallMaterial);
      		ifcModel.mesh.geometry.groups[0].materialIndex = 4;
			ifcModels.push(ifcModel);
			sceneVR.add(modelCopy)
			sceneVR.add(ifcModel)
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

			const controls = Controls(camera, renderer);
			controls.enableDamping = true;
			controls.update();

			// Config the mouse picker
			const outputId = document.getElementById('id-output');
			const outputDesc = document.getElementById('desc-output');
			const mousePicker = new MousePick(canvas.value, camera, ifcModels,
				ifcLoader, outputId, outputDesc)
			canvas.value.ondblclick = mousePicker;

			// Config the VR button
			renderer.xr.enabled = true;
			// const vrButton = new VRButton(renderer);

			document.body.appendChild( VRButton.createButton( renderer ) );

			const getDevicePosition = () => {
				if (controls.enable) {
					controls.enable = false;
				}	
				if (renderer.xr.getSession()) {
					const session = renderer.xr.getSession();
					const refSpace = renderer.xr.getReferenceSpace();
					let pose; 
					session.requestAnimationFrame((time, frame) => {
						pose = frame.getViewerPose(refSpace);
						if (pose) {						
							const newPosition = new Vector3(pose.transform.position.x, pose.transform.position.y, pose.transform.position.z)
							// console.log(renderer.xr.getCamera())
							renderer.xr.getCamera().cameras[0].position.copy(newPosition)
							// console.log(renderer.xr.getCamera().cameras[0].position)
							// dolly.position.copy(newPosition)
							// console.log(dolly.position)
							// Get device position and transform the dolly position to it
							// let xrCamera = renderer.xr.getCamera(camera);
							// const saveQuat = xrCamera.quaternion.clone();
							// var holder = new Quaternion()
							// const devicePosition = new Vector3();
							// xrCamera.getWorldQuaternion(holder);
							// xrCamera.quaternion.copy(holder);
							// xrCamera.getWorldPosition(devicePosition);
							// dolly.position.set(
							// 			pose.transform.position.x, 
							// 			pose.transform.position.y,
							// 			pose.transform.position.z)
							// xrCamera.position.set(
							// 			pose.transform.position.x, 
							// 			pose.transform.position.y,
							// 			pose.transform.position.z)
							// xrCamera.quaternion.copy(saveQuat);
						}
					});
				} 
			}

			function animate() {
				renderer.setAnimationLoop(render);
			}

			const clock = new Clock();
			const render = () => {
				// getDevicePosition();
				const dt = clock.getDelta();
				if (controller1) { handleUserMovement(dt) }		
				renderer.render(sceneVR, camera);
			}

			animate();
			Resizer(size, renderer, camera);

			//Variables for VR hand controllers
			let controller1, controller2;
			let controllerGrip1, controllerGrip2;

			//VR Controllers 
			controller1 = renderer.xr.getController(0);
			controller1.addEventListener('squeezestart', pick);
			controller1.addEventListener('squeezeend', hideDetails);
			controller1.addEventListener('selectstart', allowMovement);
			controller1.addEventListener('selectend', stopMovement);

			//One can set controller 2 to perform another function on 'select' - currently both set to object picking
			controller2 = renderer.xr.getController(1);
			controller2.addEventListener('selectstart', highlight);
			// controller2.addEventListener( 'squeezestart', clearHighlight );
			controller2.addEventListener('selectend', clearHighlight);

			const controllerModelFactory = new XRControllerModelFactory();

			// Setup the controller grip
			controllerGrip1 = renderer.xr.getControllerGrip(0);
			controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
			controllerGrip2 = renderer.xr.getControllerGrip(1);
			controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));

			controller1.name = "Right Controller"
			controller2.name = "Left Controller"

			//Lines to shoot out from VR controllers to help aim
			const geometry = new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), new Vector3(0, 0, - 1)]);
			const line = new Line(geometry);
			line.name = 'line';
			line.scale.z = 5;

			controller1.add(line.clone());
			controller2.add(line.clone());

			// console.log(controller1)

			sceneVR.add(controller1);
			sceneVR.add(controller2);
			sceneVR.add(controllerGrip1);
			sceneVR.add(controllerGrip2);

			// Needed to add controllers to dolly??
			dolly.add(controller1);
			dolly.add(controller2);
			dolly.add(controllerGrip1);
			dolly.add(controllerGrip2);

			document.addEventListener('keydown', (event) =>  {
				console.log(event.key)
				console.log(event.keyCode)
				if (event.key === 'MediaPlayPause') {
					allowMovementPhone();
				}
			})
			
			const messageBlock = document.getElementById("message-container");
			let propMesh = new HTMLMesh(messageBlock);
			let raycaster = new Raycaster();
			raycaster.firstHitOnly = true;
			const tempMatrix = new Matrix4();

			const createUI = (desc) => {
				const config = {
					header: {
						type: "text",
						position: { top: 0 },
						paddingTop: 30,
						height: 70
					},
					main: {
						type: "text",
						position: { top: 70 },
						height: 372, // default height is 512 so this is 512 - header height:70 - footer height:70
						backgroundColor: "#bbb",
						fontColor: "#000"
					},
					footer: {
						type: "text",
						position: { bottom: 0 },
						paddingTop: 30,
						height: 70
					}
				}
				const content = {
					header: "Header",
					main: desc,
					footer: "Footer"
				}
				const ui = new CanvasUI(content, config);
				ui.position = new Vector3(dolly.position.x, dolly.position.y, dolly.position.z + 6)
				return ui;
			};

			function cast(controller) {
				const myTempMatrix = tempMatrix.identity().extractRotation(controller.matrixWorld);
				raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
				raycaster.ray.direction.set(0, 0, - 1).applyMatrix4(myTempMatrix);
				return raycaster.intersectObjects(ifcModels);
			}

			async function pick(event) {
				const controller = event.target;
				const found = cast(controller)[0];
				console.log(cast(controller))
				console.log('the found:', found)
				if (found) {
					const index = found.faceIndex;
					const geometry = found.object.geometry;
					const ifc = ifcLoader.ifcManager;
					const id = ifc.getExpressId(geometry, index);
					const modelID = found.object.modelID;
					const props = await ifc.getItemProperties(modelID, id);
					console.log(id);
					console.log(found.object);
					const expId = props.expressID;
					outputId.innerHTML = `ExpressID : ${expId}`;
					const desc = props.Name.value;
					outputDesc.innerHTML = `Name: ${desc}`;
					propMesh.removeFromParent();
					propMesh = new HTMLMesh(messageBlock);
					const setX = found.point.x + 0.1 * (dolly.position.x - found.point.x);
					const setY = found.point.y + 0.1 * (dolly.position.y - found.point.y);
					const setZ = found.point.z + 0.1 * (dolly.position.z - found.point.z);
					propMesh.position.set(setX, setY, setZ);
					// propMesh.quaternion = found.object.mesh.quaternion
					propMesh.lookAt(dolly.position);
					propMesh.scale.setScalar(7);
					sceneVR.add(propMesh);
				}
			}

			function hideDetails() {
				propMesh.removeFromParent();
			}

			//Will apply material completely transparent on select
			const highlightStrongMaterial = new MeshLambertMaterial({
				transparent: true,
				opacity: 0.9,
				color: 0xff88ff,
				depthTest: false
			})

			//For seeing through items
			async function highlight(event) {
				const controller = await event.target;
				console.log('the controller:', controller)
				const found = cast(controller)[0];
				console.log('the found:', found)
				if (found) {
					const index = found.faceIndex;
					const geometry = found.object.geometry;
					const id = ifcLoader.ifcManager.getExpressId(geometry, index);
					const modelID = found.object.modelID;
					//Creates 'highlight' subset
					await ifcLoader.ifcManager.createSubset({
						modelID: modelID,
						ids: [id],
						material: highlightStrongMaterial,
						scene: sceneVR,
						removePrevious: true,
						customID: 'highlight-sub'
					});
					for (var i = 0; i < ifcModels.length; i++) {
						//Hide all IFC models (only the transparent copies will remain seen with the highlight subset)
						ifcModels[i].visible = false;
					}
				} else {
					clearHighlight(event)
				}
			}

			//Removes previous highlight
			async function clearHighlight(event) {
				//Loop through all loaded IFC models
				for (var i = 0; i < ifcModels.length; i++) {
					//Remove the 'highlight' subset
					await ifcLoader.ifcManager.removeSubset(ifcModels[i].modelID, highlightStrongMaterial, 'highlight-sub');
					//Make the IFC Model visible again
					ifcModels[i].visible = true;
				}
			}

			//Functions to handle user movement around scene (3 of the 6 DoF)
			let letUserMove = false
			function allowMovementPhone() { 
				letUserMove = !letUserMove
			}
			function allowMovement() { letUserMove = false }
			function stopMovement() { letUserMove = false }
			function handleUserMovement(dt) {
				if (letUserMove) {
					const speed = 2;
					const moveZ = -dt * speed
					const saveQuat = dolly.quaternion.clone();
					var holder = new Quaternion()
					dummy.getWorldQuaternion(holder)
					dolly.quaternion.copy(holder);
					dolly.translateZ(moveZ);
					dolly.quaternion.copy(saveQuat)
				}
			}

			return { canvas }
		})

		onBeforeUnmount(() => {
			const vrBtn = document.getElementById('VRButton');
			document.body.removeChild(vrBtn);
		});

		return { canvas, loadIfcFile }
	}
};
</script>

<template>
	<div>
		<div class="relative ">
			<div class="pl-5 pr-5 pt-12 w-full absolute">
				<LoadIfcButton :loadFunction="loadIfcFile" />
			</div>
			<div class="absolute" id="message-container">
				<p class="" id="id-output">_</p>
				<p class="" id="desc-output">_</p>
			</div>
			<div>
				<canvas ref="canvas"></canvas>
			</div>
		</div>
	</div>
</template>