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

varying vec4 vColor;

void main() {

  float amplitude = 1.0;
  float velocity = 5.0;
  float wavelength = 10.0;

  // float yPos =  sin(time/2.0 + position.x) * cos(time + position.z);
  // float wave1 = amplitude * sin( ((2.0*3.14159)*(position.x - velocity*time)) / wavelength );
  // float wave2 = amplitude * sin( ((5.0*3.14159)*(position.x - velocity*time/2.0)) / wavelength );
  // float wave3 = amplitude * sin( ((3.0*3.14159)*(position.x - velocity*time/3.0)) / wavelength );
  // float wave4 = amplitude * sin( ((4.0*3.14159)*(position.x - velocity*time/4.0)) / wavelength );


  
  // float yPos =  (wave1 * wave2 * wave3 * wave4) / float(4.0);

  float xPos = position.x + amplitude * sin(time/2.0 + position.z) * cos((2.0 * 3.1415926 + velocity*time) / wavelength );
  float yPos = position.y + amplitude * sin(time/2.0 + position.x) * cos(xPos + (2.0 * 3.1415926 + velocity*time) / wavelength );
  float zPos = position.z + amplitude * sin(time/2.0) * cos((2.0*3.1415926 + velocity * time)/wavelength);

  gl_Position =  projection * view * model * vec4(xPos, yPos , zPos, 1.0);  

  // vec3 otherNormal = vec3(sin(time/2.0 + position.x) * cos(time + position.z),sin(time/2.0 + position.x) * cos(time + position.z),sin(time/2.0 + position.x) * cos(time + position.z));
  vec3 otherNormal = vec3(-yPos,yPos, 1);
  vec3 N = normalize(normalMatrix * otherNormal);
  float dotProduct = abs(N.z);
  vColor = vec4(dotProduct * color.rgb, color.a);
}
`;

export default vertexShader;