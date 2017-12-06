// import ShaderProgram from './webgl/shaders/shaderProgram';
import Renderer from './webgl/renderer/renderer';
import ShaderProgram from './webgl/shaders/shaderProgram';
import vertexShader from './shaders/simple_vs';
import fragmentShader from './shaders/simple_fs';

import waterVS from './shaders/water_vs';
import waterFS from './shaders/water_fs';

import Cube from './webgl/entities/cube';
import Water from './webgl/entities/water';

import Camera from './webgl/entities/camera';

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
    

    this.projectionMatrix = mat4.create();
    this.createProjectionMatrix();

    this.camera = new Camera([0,20,100],[0,0,0],[0,1,0]);

    this.cubeShader = new ShaderProgram(vertexShader, fragmentShader,["color"],["position"], GL);
    this.cubeRenderer = new Renderer(GL, this.cubeShader);
    let cube = new Cube();
    cube.translate(0,0,80);
    this.cubeRenderer.addRenderObject(cube);

    this.waterShader = new ShaderProgram(waterVS, waterFS, ["color", "time"], ["position", "normal"], GL);
    this.waterRenderer = new Renderer(GL,this.waterShader);
    this.waterRenderer.addRenderObject(new Water());

    this.renderLoop();
  }

  prepare(){
    this.GL.clearColor(0,0,0,1);
    this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);
  }

  renderLoop(){
    requestAnimationFrame(this.renderLoop.bind(this));
    this.camera.move();
    let viewMatrix = this.camera.getViewMatrix();
    this.updateTime();
    this.prepare();

    this.cubeShader.start();

    this.cubeRenderer.render(this.deltaTime, 
      this.totalTime,
      this.cubeShader, 
      viewMatrix, 
      this.projectionMatrix);

    this.cubeShader.stop();

    this.waterShader.start();
    this.waterRenderer.render(this.deltaTime, 
      this.totalTime,
      this.waterShader, 
      viewMatrix, 
      this.projectionMatrix);
    this.waterShader.stop();
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
}