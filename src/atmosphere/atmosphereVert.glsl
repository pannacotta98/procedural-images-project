uniform float time;
uniform vec2 resolution;

out vec3 outPosition;
out vec3 outNormal;
out vec3 fragPos;
out float radialOffset;
out vec2 uvInterpolated;

// Uniforms and attributes added by three.js
// https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram
// default vertex attributes provided by Geometry and BufferGeometry
// attribute vec3 position;
// attribute vec3 normal;
// attribute vec2 uv;

void main() {
  uvInterpolated = uv;

  outPosition = position;
  outNormal = normalMatrix * normal;
  fragPos = vec3(modelViewMatrix * vec4(position, 1.0));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}