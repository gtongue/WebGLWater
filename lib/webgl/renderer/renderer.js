
class Renderer{
  /**
   * 
   * @param {WebGLRenderingContext} webGL 
   */
  constructor(webGL){
    this.webGL = webGL;
  }

  prepare(){
    this.webGL.clearColor([0,0,0,1]);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);    
  }


  render(entity){

  }

  createProjectionMatrix(){
    
  }
}