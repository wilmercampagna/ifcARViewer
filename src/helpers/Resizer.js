//Adjust the viewport to the size of the browser

const Resizer = (size, renderer, camera) => {
    const onResize = () => {
        size.width = window.innerWidth;
        size.height = window.innerHeight;
        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix();
        renderer.setSize(size.width, size.height);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
};

export default Resizer;
