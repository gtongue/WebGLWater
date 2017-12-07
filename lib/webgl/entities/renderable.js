import { vec3, mat4, quat } from "gl-matrix";
import { vec2, mat3 } from "gl-matrix/src/gl-matrix";
import * as MathUtils from '../utils/math';

export default class Renderable {
  constructor(position, rotation, scale){
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
    this.modelMatrix = mat4.create();
    this.primativeType = 4;
    window.addEventListener("keydown", this.handleInput.bind(this));    
  }

  updateModelMatrix(){
    this.modelMatrix = MathUtils.createModelMatrix(this.position, 
      this.rotation,
      this.scale);
  }

  render(deltaTime, totalTime, viewMatrix, projectionMatrix){
    this.updateModelMatrix();
    this.GL.uniformMatrix4fv(this.shader.uniforms["model"], false, this.modelMatrix); 
    let modelViewMatrix = mat4.create();
    mat4.multiply(modelViewMatrix, viewMatrix, this.modelMatrix);


    let normalMatrix = mat3.create();
    mat3.normalFromMat4(normalMatrix, viewMatrix);
    this.GL.uniformMatrix3fv(this.shader.uniforms["normalMatrix"], false, normalMatrix); 
  }

  wifreframeOn(){
    this.primativeType = this.GL.LINES;
  }
  wireframeOff(){
    this.primativeType = this.GL.TRIANGLES;
  }

  handleInput(e){
    if(e.key === " ")
    {
      this.wifreframeOn();
    }else{
      this.wireframeOff();
    }
  }

  rotate(x = 0, y = 0, z = 0){
    this.rotation[0] += x;
    this.rotation[1] += y;
    this.rotation[2] += z;
    this.rotation[0]  %= 360;
    this.rotation[1]  %= 360;
    this.rotation[2]  %= 360;
  }

  setPosition(x , y , z ){
    if(x){
      this.position[0] = x;
    }
    if(y){
      this.position[1] = y;
    }
    if(z){
      this.position[2] = z;
    }
  }
}