import { vec3, mat4 } from "gl-matrix/src/gl-matrix";

export default class Camera{
  constructor(eye, center, up){
    this.eye = eye;
    this.center = center;
    this.up = up;
    this.translationVector = [0,0,0];

    window.addEventListener("keydown", (evt) => {
      if(evt.key === "w"){
        this.translationVector[2] = -1;
      }
      else if(evt.key === "s"){
        this.translationVector[2] = 1;
      }
      else if(evt.key === "ArrowLeft"){
        this.translationVector[0] = -1;
      }
      else if(evt.key === "ArrowRight"){
        this.translationVector[0] = 1;
      }
      else if(evt.key === "ArrowUp"){
        this.translationVector[1] = 1;
      }
      else if(evt.key === "ArrowDown"){
        this.translationVector[1] = -1;
      }
    });

    window.addEventListener("keyup", (evt) => {
      if(evt.key === "w"){
        this.translationVector[2] =  0;
      }
      else if(evt.key === "s"){
        this.translationVector[2] = 0;
      }
      else if(evt.key === "ArrowLeft"){
        this.translationVector[0] = 0;
      }
      else if(evt.key === "ArrowRight"){
        this.translationVector[0] =  0;
      }
      else if(evt.key === "ArrowUp"){
        this.translationVector[1] = 0;
      }
      else if(evt.key === "ArrowDown"){
        this.translationVector[1] =  0;
      }    
    });
  }
  
  move(){
    this.eye[0] += this.translationVector[0];
    this.eye[1] += this.translationVector[1];
    this.eye[2] += this.translationVector[2];
  }

  getViewMatrix(){
    let eye = vec3.create();
    let center = vec3.create();
    let up = vec3.create();
    let viewMatrix = mat4.create();

    vec3.set(eye,this.eye[0], this.eye[1], this.eye[2]);
    vec3.set(center,this.center[0], this.center[1], this.center[2]);
    vec3.set(up,this.up[0], this.up[1], this.up[2]);

    mat4.lookAt(viewMatrix, eye, center, up);
    return viewMatrix;
  }
}