uniform float time;
uniform vec2 resolution;

in vec3 outPosition;

// Uniforms and attributes added by three.js
// https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram

void main() {
  // float x = mod(time + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;
  // float y = mod(time + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;
  // gl_FragColor = vec4(vec3(min(x, y)), 1.);

  gl_FragColor = vec4(outPosition, 1.0);
}