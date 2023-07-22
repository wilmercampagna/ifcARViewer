import { IFCLoader } from 'web-ifc-three/IFCLoader';
import {
    acceleratedRaycast,
    computeBoundsTree,
    disposeBoundsTree
} from 'three-mesh-bvh';
import { MeshLambertMaterial, Mesh } from 'three';

const ifcLoader = new IFCLoader();
const setupIfcLoader = async (ifcLoader) => {
    await ifcLoader.ifcManager.setWasmPath("wasm/");
    await ifcLoader.ifcManager.useWebWorkers(false, "wasm/IFCWorker.js");
    ifcLoader.ifcManager.setupThreeMeshBVH(
        computeBoundsTree,
        disposeBoundsTree,
        acceleratedRaycast
    );
};

const lambMaterial = new MeshLambertMaterial({
    transparent: true,
    opacity: 0.1,
    color: 0x77aaff,
});

const loadIfcFile = async (ifcModels, scene, change) => {
    const ifcURL = URL.createObjectURL(change.target.files[0]);
    const ifcModel = await ifcLoader.loadAsync(ifcURL);
    const modelCopy = new Mesh(ifcModel.geometry, lambMaterial);
    ifcModels.push(ifcModel);
    console.log(ifcModels, ifcModel);
    scene.add(modelCopy);
    scene.add(ifcModel);
};

export {ifcLoader, setupIfcLoader};