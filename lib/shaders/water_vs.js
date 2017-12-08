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

  vec3 wave = vec3(position.x + (Q * A * D.x * cosine) , A * sine, position.z + (Q * A* cosine * D.y));
  // Actual equation but to allow wave to fit in box I use the above
  // vec3 wave = vec3(position.x + (Q * A * D.x * cosine) , A * sine, position.z + (Q * A* cosine *D.y));
  // wave.x = clamp(wave.x, 0.0, 20.0);
  // wave.z = clamp(wave.z, 0.0, 20.0);
  waves += wave;

  vec3 waveNormal = vec3((D.x * w * A * cosine), 1.0 - (Q * w * A * sine), -(D.y * w * A * cosine));


  // waveNormals += normalize(waveNormal);
  waveNormals +=  waveNormal;

  numWaves++;
}

void main() {  
  vTexCoord = texCoord;
  
  gerstnerWave(1.0, amplitude*.3, wavelength, frequency, vec2(0.0,1.0));
  gerstnerWave(1.0, amplitude*.2, wavelength, frequency, vec2(.3,.7));
  gerstnerWave(1.0, amplitude*.3, wavelength, frequency*.7, vec2(.8,.2));
  gerstnerWave(1.0, amplitude*.3, wavelength, frequency*.5, vec2(.9,.1));

  gerstnerWave(1.0, amplitude*.05, wavelength*.2, frequency*5.0, vec2(.7,.3));
  gerstnerWave(1.0, amplitude*.05, wavelength*.4, frequency*2.0, vec2(.4,.6));
  
  gerstnerWave(1.0, amplitude*.05, wavelength*.3, frequency*4.0, vec2(.93,0.07));
  gerstnerWave(1.0, amplitude*.05, wavelength*.25, frequency*3.5, vec2(0.16,0.84));

  waves = vec3(waves.x/numWaves, waves.y, waves.z/numWaves);
  
  vec3 transformedNormal = normalMatrix * vec3(waveNormals.x, waveNormals.y, waveNormals.z);    
  
  if(abs(position.y) == 4.0){
    gl_Position =  projection * view * model * vec4(vec3(waves.x, position.y, waves.z), 1.0);  
  }else{
    gl_Position =  projection * view * model * vec4(waves, 1.0);  
  }

  if(abs(position.z) == 20.0){
    transformedNormal = normalMatrix * normalize(vec3(0.0,1.0,.5));    
  }
  else if(abs(position.x) == 0.0){
    transformedNormal = normalMatrix * normalize(vec3(0.0,1.0,0.0));    
  }

  vec3 ambientLight = vec3(0.35, 0.35, 1.00);
  vec3 directionalLightColor = vec3(.35, .35, .35);
  vec3 directionalVector = normalize(vec3(50.0, -15.0, 50.0));
  
  float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
  vLighting = ambientLight + (directionalLightColor * directional);
}
`;

export default vertexShader;