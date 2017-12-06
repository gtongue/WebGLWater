const fs = `
precision highp float;

uniform vec4 color;
varying vec4 vColor;

void main() {
  // gl_FragColor = color * vec4(vLighting, 0);
  gl_FragColor = vColor;
}

`;

export default fs;

