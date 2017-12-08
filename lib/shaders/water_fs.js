const fs = `
precision highp float;

uniform vec4 color;
uniform sampler2D sampler;
uniform sampler2D sampler2;

uniform float time;

varying vec3 vLighting;
varying vec2 vTexCoord;


void main() {
  // gl_FragColor = vec4(vLighting * color.rgb, color.a);
  vec4 color1 = texture2D(sampler, vec2(vTexCoord.x + time/50.0, vTexCoord.y + time/50.0));
  vec4 color2 = texture2D(sampler2, vec2(vTexCoord.x + time/50.0, vTexCoord.y + time/50.0));
  gl_FragColor = vec4(vLighting, .5) * (color2 + vec4(color.xyz,0.0));
}

`;

export default fs;

