const vertexShader = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

attribute vec3 position;
attribute vec3 normal;

uniform vec4 color;
uniform mat4 view;
uniform mat4 projection;
uniform mat4 model;
uniform mat3 normalMatrix;

uniform float time;
uniform float amplitude;
uniform float wavelength;
uniform float frequency;

varying vec4 vColor;

vec3 waves;
vec3 waveNormals;
float numWaves = 0.0;

void gerstnerWave(float steepness, float A, float W, float F, vec2 D){
  float w = 2.0*3.141592/W;
  float Q = steepness / (w * A);
  float dotD = dot(position.xz, D);
  // float dotD = dot(vec2(position.x*rotation + position.z*(1.0-rotation),position.x*(1.0-rotation) + position.z * rotation), D);

  float cosine = cos(w * dotD + time * F);
  float sine = sin(w * dotD + time * F);

  vec3 wave = vec3(position.x + Q * A * D.x * cosine , A * sine, position.z + Q * A* cosine *D.y);
  waves += wave;

  vec3 waveNormal = vec3((D.x * w * A * cosine), (D.y * w * A * cosine), 1.0 + (Q * w * A * sine));
  waveNormals += waveNormal;

  numWaves++;
}

void main() {  
  gerstnerWave(1.0, amplitude, wavelength, frequency, vec2(1.0,0.0));
  gerstnerWave(1.0, amplitude, wavelength, frequency * .7, vec2(.7,0.3));
  gerstnerWave(1.0, amplitude, -wavelength, frequency * 3.1, vec2(.5,0.5));
  gerstnerWave(1.0, amplitude, 1.1* wavelength, frequency * 2.1, vec2(0.0,1.0));
  gerstnerWave(1.0, amplitude, 2.1* wavelength, frequency * 4.1, vec2(.6,0.4));
  gerstnerWave(1.0, amplitude, -3.1*wavelength, frequency * 1.5, vec2(.8,0.2));
  gerstnerWave(1.0, amplitude, -.5*wavelength, frequency * 1.3, vec2(.45,0.55));
  gerstnerWave(1.0, amplitude, .8*wavelength, frequency * 1.2, vec2(.37,0.63));

  waves = vec3(waves.x/numWaves, waves.y, waves.z/numWaves);
  waveNormals /= numWaves;
  gl_Position =  projection * view * model * vec4(waves, 1.0);  

  // vec3 otherNormal = vec3(-clamp(waves.y, -1.0, 1.0) , clamp(waves.y, -1.0, 1.0), 1);
  // vec3 N = normalize(normalMatrix * waveNormals);
  // float dotProduct = abs(N.z);
  // dotProduct = clamp(dotProduct, 0.65, 1.0);

  vec3 ambientLight = vec3(0.5, 0.5, 0.5);
  vec3 directionalLightColor = vec3(.35, .35, .35);
  vec3 directionalVector = normalize(vec3(0.0, -0.8, 0.75));

  vec3 transformedNormal = normalMatrix * waveNormals;

  float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
  vec3 lighting = ambientLight + (directionalLightColor * directional);

  vColor = vec4(lighting * color.rgb, color.a);
}

`;

export default vertexShader;