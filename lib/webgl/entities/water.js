import { vec3, mat4, quat, mat3 } from "gl-matrix";
import { vec2 } from "gl-matrix/src/gl-matrix";
import Renderable from './renderable';
import { generatePlane } from '../utils/geometryGenerator';
import { loadTexture } from '../utils/textureLoader';
import waterURL from '../../../res/water.jpg';
import water2URL from '../../../res/water2.jpg';

export default class Water extends Renderable{
  /**
   * 
   * @param {WebGLRenderingContext} GL 
   */
  constructor(GL, shader){
    super(vec3.fromValues(-14.14,0,10), vec3.fromValues(0,45,0), vec3.fromValues(1,1,1));
    this.GL = GL;
    this.shader = shader;
    this.plane = generatePlane();
    this.uniforms = {
      color: shader.uniforms["color"],
      time: shader.uniforms["time"],
      amplitude: shader.uniforms["amplitude"],
      frequency: shader.uniforms["frequency"],
      wavelength: shader.uniforms["wavelength"],
      sampler: shader.uniforms["sampler"],
      sampler2: shader.uniforms["sampler"]
    };

    this.attributes = {
      position: shader.attributes["position"],
      texCoord: shader.attributes["texCoord"]
    };
    this.initBuffers();
    this.initTexture();
  }

  initBuffers(){
    this.vertexBuffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.vertexBuffer);
    this.GL.bufferData(this.GL.ARRAY_BUFFER, this.plane.vertices, this.GL.STREAM_DRAW);

    this.indexBuffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.GL.bufferData(this.GL.ELEMENT_ARRAY_BUFFER, this.plane.indices, this.GL.STATIC_DRAW);

    this.texBuffer = this.GL.createBuffer();
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.texBuffer);
    this.GL.bufferData(this.GL.ARRAY_BUFFER, this.plane.texCoords, this.GL.STREAM_DRAW);
  }

  initTexture(){
    this.texture = loadTexture(this.GL, waterURL);
    this.texture2 = loadTexture(this.GL, water2URL);
  }

  render(deltaTime, totalTime, viewMatrix, projectionMatrix){
    super.render(deltaTime, totalTime, viewMatrix, projectionMatrix);
    let uColor = this.uniforms.color;
    let uTime = this.uniforms.time;
    let uAmplitude = this.uniforms.amplitude;
    let uFrequency = this.uniforms.frequency;
    let uWavelength = this.uniforms.wavelength;
    let uSampler = this.uniforms.sampler;

    let uSampler2 = this.uniforms.sampler2;

    let aPosition = this.attributes.position;
    let aTexCoord = this.attributes.texCoord;
    
    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.vertexBuffer);
    this.GL.vertexAttribPointer(aPosition, 3, this.GL.FLOAT, false, 0, 0);

    this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.texBuffer);
    this.GL.vertexAttribPointer(aTexCoord, 2, this.GL.FLOAT, false, 0, 0);

    this.GL.activeTexture(this.GL.TEXTURE0);
    this.GL.bindTexture(this.GL.TEXTURE_2D, this.texture);
    this.GL.uniform1i(uSampler, 0);

    this.GL.activeTexture(this.GL.TEXTURE1);
    this.GL.bindTexture(this.GL.TEXTURE_2D, this.texture2);
    this.GL.uniform1i(uSampler2, 1);

    this.GL.uniform4fv(uColor, [.0,.1,.35,1]);

    let amplitude = document.getElementById("amplitude").value/100;
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