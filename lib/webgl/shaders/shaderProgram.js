export default class ShaderProgram{
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

    this.GL.LinkProgram(this.program);
    this.GL.ValidateProgram(this.program);

    let status = this.GL.getProgramParameter( this.program, this.GL.LINK_STATUS);
    if (!status) {
      throw "Link error in program:  " + this.GL.getProgramInfoLog(this.program);
    }

    this.position = this.GetUniformLocation("position");
    this.color = this.GetUniformLocation("color");
  }

  GetUniformLocation(name)
  {
    return this.GL.getUniformLocation(this.program, name);
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
}