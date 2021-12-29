uniform float time;
uniform vec2 resolution;

out vec3 outPosition;

void main() {
  outPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}