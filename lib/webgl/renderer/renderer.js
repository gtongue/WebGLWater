import { mat4 } from "gl-matrix/src/gl-matrix";
import { createModelMatrix } from "../utils/math";
import ShaderProgram from "../shaders/shaderProgram";

export default class Renderer{
  /**
   * 
   * @param {WebGLRenderingContext} GL 
   * @param {ShaderProgram} shaderProgram
   * 
   */
  constructor(GL, shaderProgram){
    this.GL = GL;
    this.shaderProgram = 
    this.projectionMatrix = mat4.create();
    this.createProjectionMatrix();
  }

  render(deltaTime, totalTime){

  }

  renderPrimitive( primitiveType, color, vertices ) {
    this.GL.enableVertexAttribArray(this.uposition);
    let buffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, buffer);
    this.GL.bufferData(this.GL.ARRAY_BUFFER, new Float32Array(vertices), this.GL.STREAM_DRAW);
    this.GL.uniform4fv(this.ucolor, color);
    this.GL.vertexAttribPointer(this.uposition, 3, this.GL.FLOAT, false, 0, 0);
    this.GL.drawArrays(primitiveType, 0, vertices.length/3);
  }

  createProjectionMatrix(){
    mat4.perspective(this.projectionMatrix, Math.PI*.5, 1280/720, 1, 500);
  }
  
}