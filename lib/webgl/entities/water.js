import { vec3, mat4, quat, mat3 } from "gl-matrix";
import { vec2 } from "gl-matrix/src/gl-matrix";
import Renderable from './renderable';
import { generatePlane } from '../utils/geometryGenerator';

export default class Water extends Renderable{
  constructor(){
    super(vec3.fromValues(-50,0,0), vec3.fromValues(0,0,0), vec3.fromValues(1,1,1));
    this.plane = generatePlane();
  }

  render(deltaTime, totalTime, shader, GL, viewMatrix, projectionMatrix){
    super.render(deltaTime, totalTime, shader, GL);
    let uColor = shader.uniforms["color"];
    let uTime = shader.uniforms["time"];

    let aPosition = shader.attributes["position"];
    let aNormal = shader.attributes["normal"];

    let vertexBuffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, vertexBuffer);
    this.GL.bufferData(this.GL.ARRAY_BUFFER, this.plane.vertices, this.GL.STREAM_DRAW);
    this.GL.vertexAttribPointer(aPosition, 3, this.GL.FLOAT, false, 0, 0);

    let normalBuffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, normalBuffer);
    this.GL.bufferData(this.GL.ARRAY_BUFFER, this.plane.normals, this.GL.STATIC_DRAW);
    this.GL.vertexAttribPointer(aNormal, 3, this.GL.FLOAT, false, 0, 0);
    
    let modelViewMatrix = mat4.create();
    mat4.multiply(modelViewMatrix, viewMatrix, this.modelMatrix);

    let normalMatrix = mat3.create();
    mat3.normalFromMat4(normalMatrix, modelViewMatrix);
    this.GL.uniformMatrix3fv(shader.uniforms["normalMatrix"], false, normalMatrix);

    this.GL.uniform4fv(uColor, [.15,.4,.55,1]);
    this.GL.uniform1f(uTime, totalTime);
    
    let indexBuffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
    this.GL.bufferData(this.GL.ELEMENT_ARRAY_BUFFER, this.plane.indices, this.GL.STATIC_DRAW);
    this.GL.drawElements(this.primativeType, this.plane.indices.length, this.GL.UNSIGNED_SHORT, 0);
  }
}