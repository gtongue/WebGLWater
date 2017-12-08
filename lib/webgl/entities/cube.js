import Renderable from './renderable';
import { generateCube } from '../utils/geometryGenerator';
import { vec3 } from 'gl-matrix/src/gl-matrix';

export default class Cube extends Renderable{

  constructor(GL, shader, color = [.24,.34,.61,.65]){
    super(vec3.fromValues(0,-1.99,10), vec3.fromValues(0,45,0), vec3.fromValues(9.9,2,9.9));  
    this.color = color; 
    this.GL = GL;
    this.shader  = shader;
    this.cube = generateCube();
    this.initBuffers();
  }

  initBuffers(){
    this.vertexBuffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.vertexBuffer);
    this.GL.bufferData(this.GL.ARRAY_BUFFER, this.cube.vertices, this.GL.STREAM_DRAW);

    this.normalBuffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.normalBuffer);
    this.GL.bufferData(this.GL.ARRAY_BUFFER, this.cube.normals, this.GL.STREAM_DRAW);

    this.indexBuffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.GL.bufferData(this.GL.ELEMENT_ARRAY_BUFFER, this.cube.indices, this.GL.STATIC_DRAW);
  }

  render(deltaTime, totalTime, viewMatrix, projectionMatrix){
    super.render(deltaTime, totalTime, viewMatrix, projectionMatrix);

    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.vertexBuffer);
    this.GL.vertexAttribPointer(this.shader.attributes["position"], 3, this.GL.FLOAT, false, 0, 0);
    
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.normalBuffer);
    this.GL.vertexAttribPointer(this.shader.attributes["normal"], 3, this.GL.FLOAT, false, 0, 0);

    this.GL.uniform4fv(this.shader.uniforms["color"], this.color);    

    this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);    
    this.GL.drawElements(this.primativeType, this.cube.indices.length, this.GL.UNSIGNED_SHORT, 0);    
  }

}