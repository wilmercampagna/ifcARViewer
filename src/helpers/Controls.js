import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const controls = (camera, renderer) => {
    return new OrbitControls( camera, renderer.domElement );
};

export default controls;