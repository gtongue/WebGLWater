const vertexShader = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

attribute vec3 position;
attribute vec3 normal;

uniform mat4 view;
uniform mat4 projection;
uniform mat4 model;
uniform mat3 normalMatrix;
uniform vec4 color;

varying vec4 vColor;

void main() {
  vec3 test = normal;

  vec3 ambientLight = vec3(0.35, 0.35, 0.35);
  vec3 directionalLightColor = vec3(.85, 0.85, .85);
  vec3 directionalVector = normalize(vec3(0.85, -0.8, 0.75));
  
  vec3 transformedNormal = normalMatrix * normal;

  float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
  vec3 lighting = ambientLight + (directionalLightColor * directional);

  vColor = vec4(lighting * color.rgb, color.a);

  gl_Position =  projection * view * model * vec4(position, 1.0);
}
`;

export default vertexShader;