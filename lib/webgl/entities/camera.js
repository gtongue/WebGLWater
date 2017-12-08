import { vec3, mat4 } from "gl-matrix/src/gl-matrix";

export default class Camera{
  constructor(eye, center, up){
    this.eye = eye;
    this.center = center;
    this.rotation = 0;
    this.up = up;

    this.rotate = 0; 
    this.translation = 0;

    this.currentAngle = 0;
    window.addEventListener("keydown", (evt) => {
      if(evt.key === "ArrowLeft"){
        this.rotate = -1;
      }
      else if(evt.key === "ArrowRight"){
        this.rotate = 1;
      }
      else if(evt.key === "ArrowUp"){
        this.translation = 1;
      }
      else if(evt.key === "ArrowDown"){
        this.translation = -1;
      }
    });

    window.addEventListener("keyup", (evt) => {
      if(evt.key === "ArrowLeft"){
        this.rotate = 0;
      }
      else if(evt.key === "ArrowRight"){
        this.rotate =  0;
      }
      else if(evt.key === "ArrowUp"){
        this.translation = 0;
      }
      else if(evt.key === "ArrowDown"){
        this.translation =  0;
      }    
    });
  }
  
  move(){
    this.eye[1] += this.translation;
    if(this.eye[1] < 0) this.eye[1] = 0;
    if(this.eye[1] >= 40) this.eye[1] = 40;
    
    this.rotation = 0;
    if(this.currentAngle < 2*Math.PI/12 && this.rotate === 1){
      this.rotation = .02;
      this.currentAngle += .02;
    }
    else if(this.currentAngle > -2*Math.PI/12 && this.rotate === -1){
      this.rotation = -.02;
      this.currentAngle -= .02;
    }
    this.rotateY();
  }

  rotateY(){
    let rotationMat = mat4.create();
    mat4.fromYRotation(rotationMat, this.rotation);
    vec3.transformMat4(this.up, this.up, rotationMat);
    vec3.transformMat4(this.eye, this.eye, rotationMat);
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