import { Scene } from 'three';	
import {Lights} from '../Lights.js';
import {Axes} from '../Grids.js';
import { Camera } from '../Camera.js';

//Creates grids and axes in the scene
const ax = new Axes(50, 50);
const lights = new Lights();
const cam = new Camera(65, 0.01, 500);
const size = cam.size;

//Creates the camera (point of view of the user)
const camera = cam.camera;
//Create a scene to add the camera and other objects to
const sceneAR = new Scene();
// Add camera, grid, axes and lights to the scene
camera.position.set(5, 1, 5);
sceneAR.add(camera);
sceneAR.add(lights.ambient);
sceneAR.add(ax.axes);

export { size, camera, sceneAR };;