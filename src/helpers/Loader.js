import { IFCLoader } from 'web-ifc-three/IFCLoader';

import {
    acceleratedRaycast,
    computeBoundsTree,
    disposeBoundsTree
} from 'three-mesh-bvh';

const loadModelProgress = (xhr) => {
    const percentComplete = (xhr.loaded / xhr.total) * 100;
    console.log(Math.round(percentComplete, 2) + '% loaded');
};

const ifcLoader = new IFCLoader();
const setupIfcLoader = async (ifcLoader) => {
    await ifcLoader.ifcManager.useWebWorkers(false, "wasm/IFCWorker.js");
    await ifcLoader.ifcManager.setWasmPath("wasm/");
    await ifcLoader.ifcManager.setOnProgress(loadModelProgress);
    ifcLoader.ifcManager.setupThreeMeshBVH(
        computeBoundsTree,
        disposeBoundsTree,
        acceleratedRaycast
    );
};

export {ifcLoader, setupIfcLoader};