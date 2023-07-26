import { IFCLoader } from 'web-ifc-three/IFCLoader';
import {
    acceleratedRaycast,
    computeBoundsTree,
    disposeBoundsTree
} from 'three-mesh-bvh';

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

export {ifcLoader, setupIfcLoader};