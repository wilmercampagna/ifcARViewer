import { Vector3 } from "three";

class ModelsTransform {
  constructor(models, ifcClasses) {
    this.models = models;
    this.ifcClasses = ifcClasses;
  }
  moveModels = (x, y, z) => {
    if (this.ifcClasses.length > 0) {
      const newPos = new Vector3(x, y, z);
      this.ifcClasses.forEach((element) => {
        this.models[element.typeName].position.copy(newPos);
        // element.updateMatrix();
      });
    }
    else {
      alert("no models to move");
    }
  };

  scaleModels = (scaleFactor) => {
    if (this.ifcClasses.length > 0) {
      const scaleVec = new Vector3(scaleFactor, scaleFactor, scaleFactor);
      this.ifcClasses.forEach((element) => {
        this.models[element.typeName].scale.copy(scaleVec);
      });
    }
    else {
      alert("no models to scale");
    }
  };

  rotateModels = (angle) => {
    if (this.ifcClasses.length > 0) {
      const rotVec = new Vector3(0, 1, 0);
      this.ifcClasses.forEach((element) => {
        this.models[element.typeName].rotateOnWorldAxis(rotVec, angle);
        // element.updateMatrix();
      });
    }
    else {
      alert("no models to rotate");
    }
  };
}

export default ModelsTransform;
