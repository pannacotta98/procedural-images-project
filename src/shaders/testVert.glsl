uniform float time;
uniform vec2 resolution;
uniform float heightOffsetScale;

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

float sampleHeight(vec3 pos) {
  float heightOffset = snoise(2.0 * pos) + 0.5 * snoise(4.0 * pos) + 0.25 * snoise(8.0 * pos) + 0.125 * snoise(16.0 * pos) + 0.0625 * snoise(32.0 * pos);
  return heightOffsetScale * heightOffset;
}

void main() {
  uvInterpolated = uv;

  float radialOffset = sampleHeight(position);

  // Sample height near the point to calculate gradient using
  // the triangle method
  float offsetLength = 0.001;
  vec3 tangent1 = normalize(cross(normal, vec3(1.0, 0.0, 0.01)));
  vec3 tangent2 = normalize(cross(tangent1, normal));
  vec3 tangent3 = normalize(-(tangent1 + tangent2));
  vec3 p1 = normalize(position + tangent1 * offsetLength);
  vec3 p2 = normalize(position + tangent2 * offsetLength);
  vec3 p3 = normalize(position + tangent3 * offsetLength);
  vec3 s1 = (1.0 + sampleHeight(p1)) * p1;
  vec3 s2 = (1.0 + sampleHeight(p2)) * p2;
  vec3 s3 = (1.0 + sampleHeight(p3)) * p3;
  vec3 v1 = s1 - s3;
  vec3 v2 = s2 - s3;
  outNormal = normalMatrix * normalize(-cross(v1, v2));

  fragPos = vec3(modelViewMatrix * vec4(position, 1.0));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position + radialOffset * normal, 1.0);
}