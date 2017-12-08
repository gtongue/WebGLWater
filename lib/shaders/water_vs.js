const vertexShader = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

attribute vec3 position;
attribute vec2 texCoord;

uniform mat4 view;
uniform mat4 projection;
uniform mat4 model;
uniform mat3 normalMatrix;

uniform float time;
uniform float amplitude;
uniform float wavelength;
uniform float frequency;
uniform float steepness;

varying vec3 vLighting;
varying vec2 vTexCoord;

vec3 waves;
vec3 waveNormals;
float numWaves = 0.0;

void gerstnerWave(float S, float A, float W, float F, vec2 D){
  float w = 2.0*3.141592/W;
  S = S * steepness;
  // float Q = (w * A * S) / (w * A);
  float Q = S / (w * A);
  float dotD = dot(position.xz, D);

  float cosine = cos(w * dotD + time * F);
  float sine = sin(w * dotD + time * F);

  vec3 wave = vec3(position.x + Q * A * D.x * cosine , A * sine, position.z + Q * A* cosine *D.y);
  waves += wave;

  vec3 waveNormal = vec3((D.x * w * A * cosine), (D.y * w * A * cosine), 1.0 + (Q * w * A * sine));
  waveNormals += waveNormal;

  numWaves++;
}

void main() {  
  vTexCoord = texCoord;
  
  gerstnerWave(3.0, amplitude*2.5, wavelength, frequency*.2, vec2(1.0,0.0));
  gerstnerWave(2.4, amplitude*.7, wavelength, frequency * .1, vec2(.7,0.3));
  gerstnerWave(3.0, amplitude*.6, -wavelength, frequency * 2.0, vec2(.5,0.5));
  gerstnerWave(3.0, amplitude*2.0, 1.1* wavelength, frequency *.2, vec2(0.0,1.0));
  gerstnerWave(4.0, amplitude*.3, 2.1* wavelength, frequency * 2.1, vec2(.6,0.4));
  gerstnerWave(1.0, amplitude*.4, -3.1*wavelength, frequency * 1.5, vec2(.8,0.2));
  gerstnerWave(2.0, amplitude*2.0, -.5*wavelength, frequency * .3, vec2(.45,0.55));
  gerstnerWave(4.0, amplitude*.1, .1*wavelength, frequency * 1.2, vec2(.23,0.87));
  gerstnerWave(3.0, amplitude*.4, .8*wavelength, frequency * 1.2, vec2(.44,0.56));
  gerstnerWave(4.0, amplitude*.5, .3*wavelength, frequency * 3.1, vec2(.1,0.9));
  gerstnerWave(3.0, amplitude*.3, 2.1*wavelength, frequency * 1.2, vec2(.22,0.78));
  gerstnerWave(5.0, amplitude*.1, .1*wavelength, frequency * 3.2, vec2(.50,0.50));
  gerstnerWave(4.0, amplitude*3.0, .8*wavelength, frequency *.3, vec2(.5,0.5));
  
  //  gerstnerWave(3.0, amplitude*2.2, 1.3*wavelength, frequency * .4, vec2(.1,.9));
  //   gerstnerWave(3.0, amplitude*.7, .4*wavelength, frequency * .7, vec2(.1,.9));
  
  //  gerstnerWave(4.0, amplitude*0.3, -1.1* wavelength, frequency *0.9, vec2(0.0,1.0));
  
  //  gerstnerWave(3.0, amplitude*2.5, 1.9*wavelength, frequency * .5, vec2(.25,0.75));
  //   // gerstnerWave(2.0, amplitude*.4, -0.8*wavelength, frequency * 1.1, vec2(.23,0.77));
  
  //  gerstnerWave(3.0, amplitude*2.4, 2.3*wavelength, frequency * .7, vec2(.87,0.13));
  //   gerstnerWave(3.4, amplitude*1.1, 1.7*wavelength, frequency * 1.3, vec2(.7,0.3));
  
  // gerstnerWave(1.0, amplitude*5.0, wavelength, frequency*.7, vec2(.6,0.4));
  // gerstnerWave(1.0, amplitude*5.0, wavelength, frequency*.7, vec2(0.3,.7));
  

  waves = vec3(waves.x/numWaves, waves.y/numWaves, waves.z/numWaves);
  
  waveNormals = vec3(waveNormals.z/numWaves, 0.0 ,waveNormals.x/numWaves);

  if(abs(position.y) == 4.0){
    gl_Position =  projection * view * model * vec4(vec3(waves.x, position.y, waves.z), 1.0);  
  }else{
    gl_Position =  projection * view * model * vec4(waves, 1.0);  
  }

  vec3 ambientLight = vec3(0.65, 0.65, 1.00);
  vec3 directionalLightColor = vec3(.35, .35, .35);
  vec3 directionalVector = normalize(vec3(0.0, -0.8, 0.75));

  vec3 transformedNormal = normalMatrix * waveNormals;

  float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
  vLighting = ambientLight + (directionalLightColor * directional);
}
`;

export default vertexShader;