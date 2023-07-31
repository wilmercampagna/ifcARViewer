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
        element.updateMatrix();
      });
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
  };
}

export default ModelsTransform;
