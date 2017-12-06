import { vec3, mat4, quat } from "gl-matrix";
import { vec2 } from "gl-matrix/src/gl-matrix";

export default class Plane {
  constructor(GL, program, width = 200, height = 200, offset = 1){
    this.vertices = new Float32Array();
    this.indices = new Uint16Array();
    this.width = width;
    this.height = height;
    this.offset = offset;
    this.primativeType = GL.TRIANGLES;

 
    this.position = vec3.fromValues(-100,0,-30);
    this.rotationEuler = vec3.fromValues(0,0,0);
    this.rotationQuaternion = quat.create();
    this.scale = vec3.fromValues(1,1,1);
    this.modelMatrix = mat4.create();

    this.uposition = GL.getUniformLocation(program, 'position');
    this.ucolor = GL.getUniformLocation(program, 'color');
    this.umodel = GL.getUniformLocation(program, 'model');

    this.updateModelMatrix();

    this.GL = GL;
    this.uposition = this.GL.getUniformLocation(program, 'position');
    this.ucolor = this.GL.getUniformLocation(program, 'color');
    window.addEventListener("keydown", this.handleInput.bind(this));    
    this.initPlane();
  }

  initPlane(){
    let vertices = [];
    let indices = [];

    for(let i = 0; i < this.width; i++){
      for(let j = 0; j < this.height; j++){
        vertices.push(i * this.offset, 0, j * this.offset);
      }
    }

    for(let i = 0; i < this.height - 1; i++){
      for(let j = this.width*i; j < this.width*i + (this.width -1); j++){
        indices.push(j);
        indices.push(j+1);
        indices.push(j+this.width);
        indices.push(j+1);
        indices.push(j+1+this.width);
        indices.push(j+this.width);
      }
    }
    this.vertices = new Float32Array(vertices);
    this.indices = new Uint16Array(indices);
    console.log(this.vertices);
    console.log(this.indices);
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
  render(){
    this.updateModelMatrix();
    this.GL.uniformMatrix4fv(this.umodel, false, this.modelMatrix);  

    // this.GL.enableVertexAttribArray(this.uposition);
    let vertexBuffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, vertexBuffer);
    this.GL.bufferData(this.GL.ARRAY_BUFFER, this.vertices, this.GL.STREAM_DRAW);

    this.GL.uniform4fv(this.ucolor, [.15,.4,.55,1]);
    this.GL.vertexAttribPointer(this.uposition, 3, this.GL.FLOAT, false, 0, 0);

    let indexBuffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
    this.GL.bufferData(this.GL.ELEMENT_ARRAY_BUFFER, this.indices, this.GL.STATIC_DRAW);
    this.GL.drawElements(this.primativeType, this.indices.length, this.GL.UNSIGNED_SHORT, 0);    
  }
}
