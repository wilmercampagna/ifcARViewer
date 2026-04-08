import { Vector3 } from "three";

class ModelsTransform {
  constructor(models, ifcClasses) {
    this.models = models;
    this.ifcClasses = ifcClasses;
    this._posVec = new Vector3();
    this._scaleVec = new Vector3();
    this._rotAxis = new Vector3(0, 1, 0);
  }

  moveModels = (x, y, z) => {
    if (this.ifcClasses.length === 0) return;
    this._posVec.set(x, y, z);
    this.ifcClasses.forEach((element) => {
      this.models[element.typeName].position.copy(this._posVec);
    });
  };

  scaleModels = (scaleFactor) => {
    if (this.ifcClasses.length === 0) return;
    this._scaleVec.set(scaleFactor, scaleFactor, scaleFactor);
    this.ifcClasses.forEach((element) => {
      this.models[element.typeName].scale.copy(this._scaleVec);
    });
  };

  rotateModels = (angle) => {
    if (this.ifcClasses.length === 0) return;
    this.ifcClasses.forEach((element) => {
      this.models[element.typeName].rotateOnWorldAxis(this._rotAxis, angle);
    });
  };
}

export default ModelsTransform;
