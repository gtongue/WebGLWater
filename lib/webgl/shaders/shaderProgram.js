
export default class ShaderProgram{
  /**
   * @param {string} vertexSouce 
   * @param {string} fragmentSource 
   * @param {Array} uniforms
   * @param {WebGLRenderingContext} GL
   */
  constructor(vertexSouce, fragmentSource, uniforms,attributes, GL){
    this.GL = GL;
    this.vertexShader = this.loadShader(vertexSouce, GL.VERTEX_SHADER);
    this.fragmentShader = this.loadShader(fragmentSource, GL.FRAGMENT_SHADER);

    this.program = this.GL.createProgram();
    this.GL.attachShader(this.program, this.vertexShader);
    this.GL.attachShader(this.program, this.fragmentShader);

    this.GL.linkProgram(this.program);
    this.GL.validateProgram(this.program);
    this.uniforms = {};
    this.attributes = {};
    // GL.LINE

    let status = this.GL.getProgramParameter( this.program, this.GL.LINK_STATUS);
    if (!status) {
      throw "Link error in program:  " + this.GL.getProgramInfoLog(this.program);
    }

    uniforms.forEach((uniform) => {
      this.uniforms[uniform] = this.getUniformLocation(uniform);
    });
    attributes.forEach((attribute) => {
      this.attributes[attribute] = this.GL.getAttribLocation(this.program, attribute);
    });
    this.uniforms["model"] = this.getUniformLocation("model");
    this.uniforms["projection"] = this.getUniformLocation("projection");
    this.uniforms["view"] = this.getUniformLocation("view");
    this.uniforms["normalMatrix"] = this.getUniformLocation("normalMatrix");
  }

  start(){
    this.GL.useProgram(this.program);
    let attrs = Object.keys(this.attributes);
    attrs.forEach((attr) => {
      this.GL.enableVertexAttribArray(this.attributes[attr]);
    });
  }

  stop(){
    let attrs = Object.keys(this.attributes);
    attrs.forEach((attr) => {
      this.GL.disableVertexAttribArray(attr);
    });
  }

  getUniformLocation(name)
  {
    return this.GL.getUniformLocation(this.program, name);
  }

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
}