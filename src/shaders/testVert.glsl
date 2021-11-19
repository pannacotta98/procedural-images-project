uniform float time;
uniform vec2 resolution;

out vec3 outPosition;

// Uniforms and attributes added by three.js
// https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram

void main() {
  outPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}