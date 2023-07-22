import { Scene, Color } from 'three';
import { camera, cameraDolly, dummyCam, Camera } from '../Camera.js';
import {Lights} from '../Lights.js';
import { Axes } from '../Grids.js';

const scene = new Scene();
const lights = new Lights();
const ax = new Axes(50, 30);
// Add camera, grid, axes and lights to the scene
camera.position.set(0, 1.6, 0);
cameraDolly.position.set(0, 0, 10);
cameraDolly.add(camera);
camera.add(dummyCam);
scene.add(cameraDolly);
scene.add(lights.ambient);
scene.add(ax.grid);
scene.add(ax.axes);
// scene.background = new Color('#e2edfb');

export {scene};
