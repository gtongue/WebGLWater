const vertexShader = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

attribute vec3 position;
uniform mat4 view;
uniform mat4 projection;
uniform mat4 model;
uniform float time;

void main() {
    // gl_Position =  projection * view * model * vec4(position.x, position.y + sin(time/2.0 + position.x) * cos(time + position.z), position.z, 1.0);    
  gl_Position =  projection * view * model * vec4(position, 1.0);
}
`;

export default vertexShader;