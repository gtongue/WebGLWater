import { quat, mat4 } from "gl-matrix";

export const createModelMatrix = (translation, rotation, scale) => {
  let rotationQuaternion = quat.create();
  let modelMatrix = mat4.create();

  quat.fromEuler(rotationQuaternion, 
    rotation[0],
    rotation[1],
    rotation[2]);
    
  mat4.fromRotationTranslationScale(modelMatrix, 
      rotationQuaternion, 
      translation, 
      scale);
};