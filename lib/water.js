import * as glMatrix from 'gl-matrix/src/gl-matrix';

export default class Water{
  /**
   * @param {string} vertexSouce 
   * @param {string} fragmentSource 
   * @param {WebGLRenderingContext} GL
   */
  constructor(vertexSouce, fragmentSource, GL){
    this.GL = GL;
    this.vertexShader = this.loadShader(vertexSouce, GL.VERTEX_SHADER);
    this.fragmentShader = this.loadShader(fragmentSource, GL.FRAGMENT_SHADER);

    this.program = this.GL.createProgram();
    this.GL.attachShader(this.program, this.vertexShader);
    this.GL.attachShader(this.program, this.fragmentShader);

    this.GL.linkProgram(this.program);
    this.GL.validateProgram(this.program);

    let status = this.GL.getProgramParameter( this.program, this.GL.LINK_STATUS);
    if (!status) {
      throw "Link error in program:  " + this.GL.getProgramInfoLog(this.program);
    }

    this.position = this.GL.getUniformLocation(this.program, "position");
    this.color = this.GL.getUniformLocation(this.program, "color");

    this.projectionMatrix = glMatrix.mat4.create();
    this.viewMatrix = glMatrix.mat4.create();

    glMatrix.mat4.perspective(this.projectionMatrix, Math.PI/8, 1, 8, 12);
    glMatrix.mat4.identity(this.viewMatrix);

    this.viewProjectionMatrix = glMatrix.mat4.create();
    glMatrix.mat4.multiply(this.viewProjectionMatrix, this.projectionMatrix, this.viewMatrix);

    this.drawTriangle();
  }

  /**
   * @param {string} shaderSource 
   * @param {int} shaderType 
   */
  loadShader(shaderSource, shaderType){
    let shaderID = this.GL.createShader(shaderType);
    this.GL.shaderSource(shaderID, shaderSource);
    this.GL.compileShader(shaderID);
    let status = this.GL.getShaderParameter(shaderID, this.GL.COMPILE_STATUS);
    if (!status){
      throw "Error in shader: " + this.GL.getShaderInfoLog(shaderID);
    }
    return shaderID;
  }

  clear(){
    this.GL.clearColor(0,0,0,1);
    this.GL.clear(this.GL.COLOR_BUFFER_BIT);
  }

  calculateViewProjection(){
    glMatrix.mat4.multiply(this.viewProjectionMatrix, this.projectionMatrix, this.viewMatrix);    
  }

  drawTriangle(){
    requestAnimationFrame(this.drawTriangle.bind(this));
    this.calculateViewProjection();
    this.clear();
    let vertices = new Float32Array([
      -0.5, -0.5,
      0.5,-0.5,
      0.0,0.5
    ]);
    
    let buffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, buffer);
    this.GL.bufferData(this.GL.ARRAY_BUFFER, vertices, this.GL.STATIC_DRAW);

    this.GL.useProgram(this.program);

    let color = this.GL.getUniformLocation(this.program, 'color');
    this.GL.uniform4fv(color, [0,0,1,1]);

    let viewProj = this.GL.getUniformLocation(this.program, 'viewProjection');
    this.GL.uniformMatrix4fv(viewProj, false, this.viewProjectionMatrix);
    
    // this.GL.uniform4fv(color, [Math.random(),Math.random(),Math.random(),1]);

    let position = this.GL.getUniformLocation(this.program, 'position');
    this.GL.enableVertexAttribArray(position);
    this.GL.vertexAttribPointer(position, 2, this.GL.FLOAT, false, 0, 0);

    this.GL.drawArrays(this.GL.TRIANGLES, 0, vertices.length / 2);
  }
}