<!-- <script setup>
import { ref } from 'vue'
import * as THREE from 'three';
import { size, camera, cameraDolly, dummyCam } from '../helpers/Camera.js';
import directionalLight from '../helpers/Lights.js';
import { grid, axes } from '../helpers/Grids.js';
import { CanvasUI } from '../helpers/CanvasUI.js';

import { IFCLoader } from 'web-ifc-three/IFCLoader';
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree
} from 'three-mesh-bvh';

const ifcModels = [];

const ifcLoader = new IFCLoader();

const setupIfcLoader = async () => {
  await ifcLoader.ifcManager.setWasmPath("wasm/");
  await ifcLoader.ifcManager.useWebWorkers(false, "wasm/IFCWorker.js");
  // ifcLoader.ifcManager.useJSONData(true);
  ifcLoader.ifcManager.setupThreeMeshBVH(
    computeBoundsTree,
    disposeBoundsTree,
    acceleratedRaycast
  );
};

setupIfcLoader();

const scene = new THREE.Scene();
// Add camera, grid, axes and lights to the scene
scene.add(cameraDolly);
camera.add(dummyCam);
scene.add(directionalLight);
scene.add(grid);
scene.add(axes);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(size.width, size.height);
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();

const lambMaterial = new THREE.MeshLambertMaterial({ transparent: true, opacity: 0.1, color: 0x77aaff });

const loadIfcFile = async(change) => {
  const ifcURL = URL.createObjectURL(change.target.files[0]);
  const ifcModel = await ifcLoader.loadAsync(ifcURL);
  const modelCopy = new THREE.Mesh(ifcModel.geometry, lambMaterial);
  ifcModels.push(ifcModel);
  scene.add(modelCopy)
  scene.add(ifcModel)
};

</script>

<template>

  <div class="card">
    <!-- <button type="button" @click="count">Load</button> -->
    <input id="file-input" @change="loadIfcFile" type="file" class="" />
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style> -->
