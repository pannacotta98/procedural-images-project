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

// TODO Might change noise later or maybe not idk
// src: https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
float mod289(float x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 perm(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

float noise(vec3 p) {
  vec3 a = floor(p);
  vec3 d = p - a;
  d = d * d * (3.0 - 2.0 * d);

  vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
  vec4 k1 = perm(b.xyxy);
  vec4 k2 = perm(k1.xyxy + b.zzww);

  vec4 c = k2 + a.zzzz;
  vec4 k3 = perm(c);
  vec4 k4 = perm(c + 1.0);

  vec4 o1 = fract(k3 * (1.0 / 41.0));
  vec4 o2 = fract(k4 * (1.0 / 41.0));

  vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
  vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

  return o4.y * d.y + o4.x * (1.0 - d.y);
}

float sampleHeight(vec3 pos) {
  float heightOffset = noise(5.0 * pos);
  return 0.1 * heightOffset;
}

void main() {
  uvInterpolated = uv;

  float radialOffset = sampleHeight(position);

  // Sample height near the point to calculate gradient using
  // the triangle method
  float offsetLength = 0.01;
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