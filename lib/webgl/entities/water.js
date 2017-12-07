import { vec3, mat4, quat, mat3 } from "gl-matrix";
import { vec2 } from "gl-matrix/src/gl-matrix";
import Renderable from './renderable';
import { generatePlane } from '../utils/geometryGenerator';

export default class Water extends Renderable{
  constructor(GL, shader){
    super(vec3.fromValues(-10,0,0), vec3.fromValues(0,0,0), vec3.fromValues(1,1,1));
    this.GL = GL;
    this.plane = generatePlane();
    this.uniforms = {
      color: shader.uniforms["color"],
      time: shader.uniforms["time"],
      amplitude: shader.uniforms["amplitude"],
      frequency: shader.uniforms["frequency"],
      wavelength: shader.uniforms["wavelength"]
    };

    this.attributes = {
      position: shader.attributes["position"]
    };
    this.initBuffers();
  }

  initBuffers(){
    this.vertexBuffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.vertexBuffer);
    this.GL.bufferData(this.GL.ARRAY_BUFFER, this.plane.vertices, this.GL.STREAM_DRAW);

    this.indexBuffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.GL.bufferData(this.GL.ELEMENT_ARRAY_BUFFER, this.plane.indices, this.GL.STATIC_DRAW);
  }

  render(deltaTime, totalTime, shader, GL, viewMatrix, projectionMatrix){
    super.render(deltaTime, totalTime, shader, GL);
    let uColor = this.uniforms.color;
    let uTime = this.uniforms.time;
    let uAmplitude = this.uniforms.amplitude;
    let uFrequency = this.uniforms.frequency;
    let uWavelength = this.uniforms.wavelength;

    let aPosition = this.attributes.position;
    
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.vertexBuffer);
    this.GL.vertexAttribPointer(aPosition, 3, this.GL.FLOAT, false, 0, 0);
    
    // let aNormal = shader.attributes["normal"];
    // let normalBuffer = this.GL.createBuffer();
    // this.GL.bindBuffer(this.GL.ARRAY_BUFFER, normalBuffer);
    // this.GL.bufferData(this.GL.ARRAY_BUFFER, this.plane.normals, this.GL.STATIC_DRAW);
    // this.GL.vertexAttribPointer(aNormal, 3, this.GL.FLOAT, false, 0, 0);
    
    let modelViewMatrix = mat4.create();
    mat4.multiply(modelViewMatrix, viewMatrix, this.modelMatrix);


    let normalMatrix = mat3.create();
    mat3.normalFromMat4(normalMatrix, viewMatrix);

    this.GL.uniformMatrix3fv(shader.uniforms["normalMatrix"], false, normalMatrix);

    this.GL.uniform4fv(uColor, [.15,.4,.75,1]);

    let amplitude = document.getElementById("amplitude").value/10;
    document.getElementById("amplitudeVal").innerText = "Amplitude: " + amplitude;
    this.GL.uniform1f(uAmplitude, amplitude);
    let wavelength = document.getElementById("wavelength").value/10;
    document.getElementById("wavelengthVal").innerText = "Wavelength: " + wavelength;
    this.GL.uniform1f(uWavelength, wavelength);
    let frequency = document.getElementById("frequency").value/10;
    document.getElementById("frequencyVal").innerText = "Frequency: " + frequency;
    this.GL.uniform1f(uFrequency, frequency);


    this.GL.uniform1f(uTime, totalTime);
    
    this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.GL.drawElements(this.primativeType, this.plane.indices.length, this.GL.UNSIGNED_SHORT, 0);
  }
}