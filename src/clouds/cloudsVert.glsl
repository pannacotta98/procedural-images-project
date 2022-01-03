uniform float time;
uniform vec2 resolution;
uniform float height;

out vec3 outPosition;
out vec3 outNormal;

void main() {
  outPosition = position;
  outNormal = normalMatrix * normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(height * position, 1.0);
}