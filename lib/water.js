import * as glMatrix from 'gl-matrix/src/gl-matrix';

export default class Water{
  /**
   * @param {string} vertexSouce 
   * @param {string} fragmentSource 
   * @param {WebGLRenderingContext} GL
   */
  constructor(vertexSouce, fragmentSource, GL){
    this.GL = GL;
    this.GL.enable(this.GL.DEPTH_TEST);    
    this.vertexShader = this.loadShader(vertexSouce, GL.VERTEX_SHADER);
    this.fragmentShader = this.loadShader(fragmentSource, GL.FRAGMENT_SHADER);

    this.program = this.GL.createProgram();
    this.GL.attachShader(this.program, this.vertexShader);
    this.GL.attachShader(this.program, this.fragmentShader);

    this.GL.linkProgram(this.program);
    this.GL.validateProgram(this.program);

    let status = this.GL.getProgramParameter( this.program, this.GL.LINK_STATUS);
    if (!status) {
      throw "Link error in program: " + this.GL.getProgramInfoLog(this.program);
    }

    this.position = this.GL.getUniformLocation(this.program, "position");
    this.color = this.GL.getUniformLocation(this.program, "color");

    this.projectionMatrix = glMatrix.mat4.create();
    this.viewMatrix = glMatrix.mat4.create();
    this.modelMatrix = glMatrix.mat4.create();

    glMatrix.mat4.perspective(this.projectionMatrix, Math.PI*.5, 1, 1, 50);

    let eye = glMatrix.vec3.create();
    let center = glMatrix.vec3.create();
    let up = glMatrix.vec3.create();

    glMatrix.vec3.set(eye, 0, 0, -5);
    glMatrix.vec3.set(center, 0, 0, 0);
    glMatrix.vec3.set(up, 0, 1, 0);
    glMatrix.mat4.lookAt(this.viewMatrix, eye, center, up);
    // glMatrix.mat4.identity(this.viewMatrix);
    console.log(this.modelMatrix);
    console.log(this.viewMatrix);
    console.log(this.projectionMatrix);
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
    this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);
  }

  drawPrimitive( primitiveType, color, vertices ) {
    let position = this.GL.getUniformLocation(this.program, 'position');    
    this.GL.enableVertexAttribArray(position);
    let buffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, buffer);
    this.GL.bufferData(this.GL.ARRAY_BUFFER, new Float32Array(vertices), this.GL.STREAM_DRAW);

    let ucolor = this.GL.getUniformLocation(this.program, 'color');
    this.GL.uniform4fv(ucolor, color);

    this.GL.vertexAttribPointer(position, 3, this.GL.FLOAT, false, 0, 0);
    this.GL.drawArrays(primitiveType, 0, vertices.length/3);
  }

  drawTriangle(){
    requestAnimationFrame(this.drawTriangle.bind(this));
    // this.calculateViewProjection();
    this.clear();
    let vertices = new Float32Array([
      -0.5, -0.5, .5,
      0.5,-0.5, 0,
      0.0,0.5, -.5,
    ]);

    let buffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, buffer);
    this.GL.bufferData(this.GL.ARRAY_BUFFER, vertices, this.GL.STATIC_DRAW);
    
    this.GL.useProgram(this.program);

    let color = this.GL.getUniformLocation(this.program, 'color');
    this.GL.uniform4fv(color, [0,0,1,1]);


    let moveVector = glMatrix.vec3.create();
    glMatrix.vec3.set(moveVector, 0,0,-.01);

    // glMatrix.mat4.translate(this.viewMatrix, this.viewMatrix, moveVector);
    glMatrix.mat4.rotateY(this.viewMatrix, this.viewMatrix, .05);
    glMatrix.mat4.rotateX(this.viewMatrix, this.viewMatrix, .05);
    let view = this.GL.getUniformLocation(this.program, 'view');
    this.GL.uniformMatrix4fv(view, false, this.viewMatrix);
    let projection = this.GL.getUniformLocation(this.program, 'projection');
    this.GL.uniformMatrix4fv(projection, false, this.projectionMatrix);
    let model = this.GL.getUniformLocation(this.program, 'model');
    this.GL.uniformMatrix4fv(model, false, this.modelMatrix);
    
    // this.GL.uniform4fv(color, [Math.random(),Math.random(),Math.random(),1]);

    let position = this.GL.getUniformLocation(this.program, 'position');
    this.GL.enableVertexAttribArray(position);
    
    this.GL.vertexAttribPointer(position, 2, this.GL.FLOAT, false, 0, 0);

    // this.GL.drawArrays(this.GL.TRIANGLE_FAN, 0, vertices.length / 3);

    this.drawPrimitive( this.GL.TRIANGLE_FAN, [1,0,0,1], [ -1,-1,1, 1,-1,1, 1,1,1, -1,1,1 ]);
    this.drawPrimitive( this.GL.TRIANGLE_FAN, [0,1,0,1], [ -1,-1,-1, -1,1,-1, 1,1,-1, 1,-1,-1 ]);
    this.drawPrimitive( this.GL.TRIANGLE_FAN, [0,0,1,1], [ -1,1,-1, -1,1,1, 1,1,1, 1,1,-1 ]);
    this.drawPrimitive( this.GL.TRIANGLE_FAN, [1,1,0,1], [ -1,-1,-1, 1,-1,-1, 1,-1,1, -1,-1,1 ]);
    this.drawPrimitive( this.GL.TRIANGLE_FAN, [1,0,1,1], [ 1,-1,-1, 1,1,-1, 1,1,1, 1,-1,1 ]);
    this.drawPrimitive( this.GL.TRIANGLE_FAN, [0,1,1,1], [ -1,-1,-1, -1,-1,1, -1,1,1, -1,1,-1 ]);
    

    this.GL.lineWidth(4);
    this.drawPrimitive( this.GL.LINES, [1,0,0,1], [ -2,0,0, 2,0,0] );
    this.drawPrimitive( this.GL.LINES, [0,1,0,1], [ 0,-2,0, 0,2,0] );
    this.drawPrimitive( this.GL.LINES, [0,0,1,1], [ 0,0,-2, 0,0,2] );
    this.GL.lineWidth(1);
  }
}



