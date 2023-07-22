import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { BufferGeometry, Line } from 'three';

const setupVRControllers = (renderer, pick, hideDetails, allowMovement, stopMovement, highlight, clearHighlight, Vector3) => {

    //Variables for VR hand controllers
    let controller1, controller2;
    let controllerGrip1, controllerGrip2;

    //VR Controllers 
    controller1 = renderer.xr.getController(0);
    controller1.addEventListener('selectstart', pick);
    controller1.addEventListener('selectend', hideDetails);
    controller1.addEventListener('squeezestart', allowMovement);
    controller1.addEventListener('squeezeend', stopMovement);

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

    const geometry = new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), new Vector3(0, 0, - 1)]);
    const line = new Line(geometry);
    line.name = 'line';
    line.scale.z = 5;

    controller1.add(line.clone());
    controller2.add(line.clone());

    return { controller1, controller2, controllerGrip1, controllerGrip2 };
}

export default setupVRControllers;