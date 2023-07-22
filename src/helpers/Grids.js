import { GridHelper, AxesHelper } from 'three';

//Creates grids and axes in the scene
class Axes {
    constructor(width, height) {
        this.grid = new GridHelper(width, height);
        this.axes = new AxesHelper();
        this.axes.material.depthTest = false;
        this.axes.renderOrder = 1;
    }
};

export { Axes };