import { PerspectiveCamera, Object3D } from 'three';

class Camera {
    constructor(fov, near, far) {
        this.size = {
            width: window.innerWidth-2,
            height: window.innerHeight,
        };
        this.aspect = this.size.width / this.size.height;
        this.camera = new PerspectiveCamera(fov, this.aspect, near, far);
        this.cameraDolly = new Object3D();
        this.dummyCam = new Object3D();
    }
}

const size = {
    width: window.innerWidth-2,
    height: window.innerHeight,
};

//Creates the camera (point of view of the user)
const aspect = size.width / size.height;
const camera = new PerspectiveCamera(70, aspect, 0.1, 1000);
//Create a 3D object to carry the camera around XR session
const cameraDolly = new Object3D();
const dummyCam = new Object3D();

export { size, camera, cameraDolly, dummyCam, Camera };