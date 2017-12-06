// import ShaderProgram from './webgl/shaders/shaderProgram';
import Renderer from './webgl/renderer/renderer';
import ShaderProgram from './webgl/shaders/shaderProgram';
import vertexShader from '../shaders/simple_vs';
import fragmentShader from '../shaders/simple_fs';

class Main {
  /**
   * @param {WebGLRenderingContext} GL 
   */
  constructor(GL){
    this.GL = GL;
    this.GL.enable(this.GL.DEPTH_TEST);

    this.totalTime = 0;
    this.deltaTime = 0;
    this.lastUpdate = Date.now();

    this.cubeShader = new ShaderProgram(vertexShader, fragmentShader, GL);
    this.cubeRenderer = new Renderer(GL, this.cubeShader);
  }

  prepare(){
    this.GL.clearColor(0,0,0,1);
    this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);
  }

  renderLoop(){
    this.updateTime();
  }

  updateTime(){
    let newTime = Date.now();
    this.deltaTime = (newTime - this.lastUpdate)/1000;
    this.lastUpdate = newTime;
    this.totalTime += this.deltaTime;
  }
}