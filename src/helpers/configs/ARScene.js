import { Scene } from 'three';
import { Lights } from '../Lights.js';
import { Camera } from '../Camera.js';

const { ambient, hemi } = Lights.createForAR();
const cam = new Camera(65, 0.01, 500);
const size = cam.size;

//Creates the camera (point of view of the user)
const camera = cam.camera;
//Create a scene to add the camera and other objects to
const sceneAR = new Scene();
// Add camera and lights to the scene
camera.position.set(5, 1, 5);
sceneAR.add(camera);
sceneAR.add(ambient);
sceneAR.add(hemi);

export { size, camera, sceneAR };
