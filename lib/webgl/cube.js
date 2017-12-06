import { vec3, mat4, quat } from "gl-matrix";
import { vec2 } from "gl-matrix/src/gl-matrix";

export default class Cube {
  constructor(GL, program){
    this.GL = GL;
    this.position = vec3.fromValues(0,0,0);
    this.rotationEuler = vec3.fromValues(0,0,0);
    this.rotationQuaternion = quat.create();
    this.scale = vec3.fromValues(1,1,1);
    this.modelMatrix = mat4.create();
    this.program = program;
    this.primativeType = this.GL.TRIANGLE_FAN;
    this.uposition = GL.getUniformLocation(this.program, 'position');
    this.ucolor = GL.getUniformLocation(this.program, 'color');
    this.umodel = GL.getUniformLocation(this.program, 'model');
    this.updateModelMatrix();
  }

  updateModelMatrix(){
    quat.fromEuler(this.rotationQuaternion, 
      this.rotationEuler[0],
      this.rotationEuler[1],
      this.rotationEuler[2]);

    mat4.fromRotationTranslationScale(this.modelMatrix, 
      this.rotationQuaternion,
      this.position,
      this.scale);
  }

  drawPrimitive( primitiveType, color, vertices ) {
    this.GL.enableVertexAttribArray(this.uposition);
    let buffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, buffer);
    this.GL.bufferData(this.GL.ARRAY_BUFFER, new Float32Array(vertices), this.GL.STREAM_DRAW);

    this.GL.uniform4fv(this.ucolor, color);
    this.GL.vertexAttribPointer(this.uposition, 3, this.GL.FLOAT, false, 0, 0);
    this.GL.drawArrays(primitiveType, 0, vertices.length/3);
  }

  render(){
    // this.rotate();
    // this.translate();
    this.updateModelMatrix();
    this.GL.uniformMatrix4fv(this.umodel, false, this.modelMatrix);  
    this.drawPrimitive( this.primativeType, [1,0,0,1], [ -1,-1,1, 1,-1,1, 1,1,1, -1,1,1 ]);
    this.drawPrimitive( this.primativeType, [0,1,0,1], [ -1,-1,-1, -1,1,-1, 1,1,-1, 1,-1,-1 ]);
    this.drawPrimitive( this.primativeType, [0,0,1,1], [ -1,1,-1, -1,1,1, 1,1,1, 1,1,-1 ]);
    this.drawPrimitive( this.primativeType, [1,1,0,1], [ -1,-1,-1, 1,-1,-1, 1,-1,1, -1,-1,1 ]);
    this.drawPrimitive( this.primativeType, [1,0,1,1], [ 1,-1,-1, 1,1,-1, 1,1,1, 1,-1,1 ]);
    this.drawPrimitive( this.primativeType, [0,1,1,1], [ -1,-1,-1, -1,-1,1, -1,1,1, -1,1,-1 ]);
  }
  
  wifreframeOn(){
    this.primativeType = this.GL.LINE_STRIP;
  }
  wireframeOff(){
    this.primativeType = this.GL.TRIANGLE_FAN;
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
    this.rotationEuler[1] += 1;
    this.rotationEuler[0] += 1;
    this.rotationEuler[0]  %= 360;
    this.rotationEuler[1]  %= 360;
  }

  translate(x = 0, y = 0, z = 0){
    // this.position[2] += .1;
    this.position[0] += x;
    this.position[1] += y;
    this.position[2] += z;
  }
}