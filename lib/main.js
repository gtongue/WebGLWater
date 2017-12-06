// import ShaderProgram from './webgl/shaders/shaderProgram';
import Renderer from './webgl/renderer/renderer';
import ShaderProgram from './webgl/shaders/shaderProgram';
import vertexShader from './shaders/simple_vs';
import fragmentShader from './shaders/simple_fs';
import Cube from './webgl/cube';

import { mat4, vec3 } from 'gl-matrix';

export default class Main {
  /**
   * @param {WebGLRenderingContext} GL 
   */
  constructor(GL){
    this.GL = GL;
    this.GL.enable(this.GL.DEPTH_TEST);

    this.totalTime = 0;
    this.deltaTime = 0;
    this.lastUpdate = Date.now();
    
    this.viewMatrix = mat4.create();
    this.createViewMatrix();

    this.projectionMatrix = mat4.create();
    this.createProjectionMatrix();


    this.cubeShader = new ShaderProgram(vertexShader, fragmentShader,["color"],["position"], GL);
    this.cubeRenderer = new Renderer(GL, this.cubeShader);
    this.cubeRenderer.addRenderObject(new Cube());

    this.renderLoop();
  }

  prepare(){
    this.GL.clearColor(0,0,0,1);
    this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);
  }

  renderLoop(){
    requestAnimationFrame(this.renderLoop.bind(this));
    this.updateTime();
    this.prepare();

    this.cubeShader.start();

    this.cubeRenderer.render(this.deltaTime, 
      this.totalTime,
      this.cubeShader, 
      this.viewMatrix, 
      this.projectionMatrix);

    this.cubeShader.stop();
  }

  updateTime(){
    let newTime = Date.now();
    this.deltaTime = (newTime - this.lastUpdate)/1000;
    this.lastUpdate = newTime;
    this.totalTime += this.deltaTime;
  }

  createProjectionMatrix(){
    mat4.perspective(this.projectionMatrix, Math.PI*.5, 1280/720, 1, 500);
  }

  createViewMatrix(){
    let eye = vec3.create();
    let center = vec3.create();
    let up = vec3.create();
    
    vec3.set(eye, 0, 10, -1);
    vec3.set(center, 0, 0, 0);
    vec3.set(up, 0, 1, 0);
    mat4.lookAt(this.viewMatrix, eye, center, up);
  }
}