import { vec3, mat4, quat } from "gl-matrix";
import { vec2 } from "gl-matrix/src/gl-matrix";
import * as MathUtils from '../utils/math';

export default class Cube {
  constructor(){
    this.position = vec3.fromValues(0,0,0);
    this.rotation = vec3.fromValues(0,0,0);
    this.scale = vec3.fromValues(1,1,1);
    this.modelMatrix = mat4.create();
    this.updateModelMatrix();
  }


  drawPrimitive( primitiveType, color, shader, vertices ) {
    let ucolor = shader.uniforms["color"];
    let aposition = shader.attributes["position"];

    let buffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, buffer);
    this.GL.bufferData(this.GL.ARRAY_BUFFER, new Float32Array(vertices), this.GL.STREAM_DRAW);
    this.GL.uniform4fv(ucolor, color);
    this.GL.vertexAttribPointer(aposition, 3, this.GL.FLOAT, false, 0, 0);
    this.GL.drawArrays(primitiveType, 0, vertices.length/3);
  }
  
  updateModelMatrix(){
    this.modelMatrix = MathUtils.createModelMatrix(this.position, 
      this.rotation,
      this.scale);
  }

  render(deltaTime, totalTime, shader, GL){
    this.rotate();
    this.GL = GL;
    this.primativeType = GL.TRIANGLE_FAN;
    // this.translate();
    this.updateModelMatrix();
    this.GL.uniformMatrix4fv(shader.uniforms["model"], false, this.modelMatrix);  
    this.drawPrimitive( this.primativeType, [1,0,0,1], shader, [ -1,-1,1, 1,-1,1, 1,1,1, -1,1,1 ]);
    this.drawPrimitive( this.primativeType, [0,1,0,1], shader, [ -1,-1,-1, -1,1,-1, 1,1,-1, 1,-1,-1 ]);
    this.drawPrimitive( this.primativeType, [0,0,1,1], shader, [ -1,1,-1, -1,1,1, 1,1,1, 1,1,-1 ]);
    this.drawPrimitive( this.primativeType, [1,1,0,1], shader, [ -1,-1,-1, 1,-1,-1, 1,-1,1, -1,-1,1 ]);
    this.drawPrimitive( this.primativeType, [1,0,1,1], shader, [ 1,-1,-1, 1,1,-1, 1,1,1, 1,-1,1 ]);
    this.drawPrimitive( this.primativeType, [0,1,1,1], shader, [ -1,-1,-1, -1,-1,1, -1,1,1, -1,1,-1 ]);
  }
  
  wifreframeOn(){
    this.primativeType = this.GL.LINE_STRIP;
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

  rotate(){
    this.rotation[1] += 1;
    this.rotation[0] += 1;
    this.rotation[0]  %= 360;
    this.rotation[1]  %= 360;
  }

  translate(x = 0, y = 0, z = 0){
    // this.position[2] += .1;
    this.position[0] += x;
    this.position[1] += y;
    this.position[2] += z;
  }
}