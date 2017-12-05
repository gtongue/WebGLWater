const vertexShader = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

attribute vec2 position;
uniform mat4 viewProjection;

void main() {
  gl_Position = viewProjection * vec4(position, 0.0, 1.0);
}
`;

export default vertexShader;