// import ShaderProgram from './webgl/shaders/shaderProgram';
import Renderer from './webgl/renderer/renderer';
import ShaderProgram from './webgl/shaders/shaderProgram';
import vertexShader from './shaders/simple_vs';
import fragmentShader from './shaders/simple_fs';

import waterVS from './shaders/water_vs';
import waterFS from './shaders/water_fs';

import Cube from './webgl/entities/cube';
import NewCube from './webgl/entities/newCube';
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

    this.camera = new Camera([0,15,27],[0,0,0],[0,1,0]);

    this.cubeShader = new ShaderProgram(vertexShader, fragmentShader,["color"],["position", "normal"], GL);
    this.cubeRenderer = new Renderer(GL, this.cubeShader);
    let cube = new NewCube(GL, this.cubeShader);

    window.cube = cube;
    // cube.translate(0,10,0);
    this.cubeRenderer.addRenderObject(cube);

    this.waterShader = new ShaderProgram(waterVS, waterFS, ["color", "time", "amplitude", "wavelength", "frequency"], ["position"], GL);
    this.waterRenderer = new Renderer(GL,this.waterShader);
    this.waterRenderer.addRenderObject(new Water(GL, this.waterShader));

    this.renderLoop();
  }

  prepare(){
    this.GL.clearColor(1,1,1,1);
    this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);
  }

  renderLoop(){
    requestAnimationFrame(this.renderLoop.bind(this));
    this.camera.move();
    let viewMatrix = this.camera.getViewMatrix();
    this.updateTime();
    this.prepare();

    this.cubeShader.start();

    this.cubeRenderer.render(
      this.deltaTime, 
      this.totalTime,
      viewMatrix, 
      this.projectionMatrix);

    this.cubeShader.stop();

    this.waterShader.start();

    this.waterRenderer.render(
      this.deltaTime, 
      this.totalTime,
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
    mat4.perspective(this.projectionMatrix, Math.PI*.5, window.innerWidth/window.innerHeight, 1, 500);
  }
}