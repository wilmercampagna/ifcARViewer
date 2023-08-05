import { Vector3 } from "three";

class ModelsTransform {
  constructor(models) {
    this.models = models;
  }
  moveModels = (x, y, z) => {
    if (this.models.length > 0) {
      const newPos = new Vector3(x, y, z);
      this.models.forEach((element) => {
        element.position.copy(newPos);
        // element.updateMatrix();
      });
    }
    else {
      alert("no models to move");
    }
  };

  scaleModels = (scaleFactor) => {
    if (this.models.length > 0) {
      const scaleVec = new Vector3(scaleFactor, scaleFactor, scaleFactor);
      // ifcModels[0].scale.copy(scaleVec);
      this.models.forEach((element) => {
        element.scale.copy(scaleVec);
        // element.scale.multiply(scaleVec);
        // element.updateMatrix();
      });
    }
    else {
      alert("no models to scale");
    }
  };

  rotateModels = (angle) => {
    if (this.models.length > 0) {
      const rotVec = new Vector3(0, 1, 0);
      this.models.forEach((element) => {
        element.rotateOnWorldAxis(rotVec, angle);
        // element.updateMatrix();
      });
    }
    else {
      alert("no models to rotate");
    }
  };
}

export default ModelsTransform;
