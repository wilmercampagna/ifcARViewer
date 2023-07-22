//Adjust the viewport to the size of the browser
// import { size, } from './Camera.js'

const Resizer = (size, renderer, camera) => {
    window.addEventListener("resize", () => {
        size.width = window.innerWidth;
        size.height = window.innerHeight;
        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix();
        renderer.setSize(size.width, size.height);
    });
};

export default Resizer;
