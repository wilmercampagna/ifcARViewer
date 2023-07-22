import { Vector2, Raycaster } from "three";

class MousePick {
  constructor(canvas, camera, ifcModels, ifcLoader, outputId, outputDesc) {
    this.ifcLoader = ifcLoader;
    this.ifcModels = ifcModels;
    this.canvas = canvas;
    this.camera = camera;
    this.mouse = new Vector2();
    this.raycaster = new Raycaster();
    this.raycaster.firstHitOnly = true;
    this.outputId = outputId;
    this.outputDesc = outputDesc;
    this.addMouseEventListeners(); // Call this method to set up mouse event listeners
  }

  // Add mouse event listeners (click and move)
  addMouseEventListeners() {
    this.canvas.addEventListener("click", (event) => {
      this.mousePick(event);
    });
  }

  async mousePick(event) {
    const found = this.mouseCast(event);
    if (found) {
      const index = found.faceIndex;
      const geometry = found.object.geometry;
      const ifc = this.ifcLoader.ifcManager;
      const id = ifc.getExpressId(geometry, index);
      const modelID = found.object.modelID;
      const props = await ifc.getItemProperties(modelID, id);
      const expId = props.expressID;
      this.outputId.innerHTML = `ExpressID : ${expId}`;
      const desc = props.Name.value;
      this.outputDesc.innerHTML = `Name: ${desc}`;
    }
  }

  mouseCast(event) {
    // Computes the position of the mouse on the screen
    const bounds = this.canvas.getBoundingClientRect();

    const x1 = event.clientX - bounds.left;
    const x2 = bounds.right - bounds.left;
    this.mouse.x = (x1 / x2) * 2 - 1;

    const y1 = event.clientY - bounds.top;
    const y2 = bounds.bottom - bounds.top;
    this.mouse.y = -(y1 / y2) * 2 + 1;

    // Places it on the camera pointing to the mouse
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Casts a ray
    const out = this.raycaster.intersectObjects(this.ifcModels);
    return out[0];
  }
}

export {MousePick};