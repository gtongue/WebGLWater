//@ts-check

export default class WebGL {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {WebGLRenderingContext} gl 
   * @param {WebGLShader} vertexShader
   * @param {WebGLShader} fragmentShader
   * @param {WebGLProgram} program
   */

  constructor(canvas){
    canvas.width = 1920;
    canvas.height = 1080;
    this.gl = canvas.getContext('webgl');
    this.gl.viewport(0,0,this.gl.canvas.width, this.gl.canvas.height);
    this.clear();
  }

  clear(){
    this.gl.clearColor(1,0,1,1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  loadVertexShader(vs){
    this.vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(this.vertexShader, vs);
    this.gl.compileShader(this.vertexShader);
  }

  loadFragmentShader(fs){
    this.fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(this.fragmentShader, fs);
    this.gl.compileShader(this.fragmentShader);
  }

  createProgram()
  {
    this.program = this.gl.createProgram();
    this.gl.attachShader(this.program, this.vertexShader);
    this.gl.attachShader(this.program, this.fragmentShader);
    this.gl.linkProgram(this.program);
  }

  drawShape() 
  {
    let vertices = new Float32Array([
      -0.5, -0.5,
      0.5,-0.5,
      0.0,0.5
    ]);

    let buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

    this.gl.useProgram(this.program);

    let color = this.gl.getUniformLocation(this.program, 'color');
    this.gl.uniform4fv(color, [0,1,0,1]);

    let position = this.gl.getUniformLocation(this.program, 'position');
    this.gl.enableVertexAttribArray(position);
    this.gl.vertexAttribPointer(position, 2, this.gl.FLOAT, false, 0, 0);

    this.gl.drawArrays(this.gl.TRIANGLES, 0, vertices.length / 2);
  }
}