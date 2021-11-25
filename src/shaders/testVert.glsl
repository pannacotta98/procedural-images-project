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
  return heightOffset;
}

// void main() {
//   uvInterpolated = uv;

//   // Sample the noise in multiple positions for finite differencing
//   float stepSize = 0.01;
//   float dphi = 

//   //h = normal;
//   // outNormal = normalMatrix * normalize(position - h);
//   outNormal = normalize(position - h);
//   // outNormal = normalMatrix * normalize(h);

//   // outNormal = 
//   // outNormal = normal;

//   // outNormal = normalMatrix * normal;

//   fragPos = vec3(modelViewMatrix * vec4(position, 1.0));
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position + radialOffset * normal, 1.0);
// }

void main() {
  uvInterpolated = uv;
  // radialOffset = 0.1 * noise(5.0 * position);
  // radialOffset += 0.05 * noise(50.0 * position);

  // TODO I will probably need to calculate the normals somehow, but how!?
  // I can't access neighbors here..

  // Could this be used? https://discourse.threejs.org/t/calculating-vertex-normals-after-displacement-in-the-vertex-shader/16989
  // Maybe i could use finite differences from the noise? just sample it a few times?

  // vec3 radialOffset = radialDir * sin(sin(time) * 0.1 * position);

  // Sample the noise in multiple positions for finite differencing
  float stepSize = 0.01;
  float radialOffset = sampleHeight(position);
  float dx = (sampleHeight(position + stepSize * vec3(1.0, 0.0, 0.0)), sampleHeight(position - stepSize * vec3(1.0, 0.0, 0.0))) / (2.0 * stepSize);
  float dy = (sampleHeight(position + stepSize * vec3(0.0, 1.0, 0.0)), sampleHeight(position - stepSize * vec3(0.0, 1.0, 0.0))) / (2.0 * stepSize);
  float dz = (sampleHeight(position + stepSize * vec3(1.0, 0.0, 1.0)), sampleHeight(position - stepSize * vec3(1.0, 0.0, 1.0))) / (2.0 * stepSize);
  vec3 g = vec3(dx, dy, dz) / (radialOffset);

  // https://math.stackexchange.com/questions/1071662/surface-normal-to-point-on-displaced-sphere
  // project away the radial component of the gradient, assuming ||position|| = 1
  // vec3 h = gradient - dot(gradient, position) * position;

  // /* TESTING */ gradient /= length(position) + radialOffset;
  vec3 h = g - dot(g, normal) * normal;

  //h = normal;
  // outNormal = normalMatrix * normalize(position - h);
  outNormal = normalize(position - h);
  // outNormal = 0.1 * gradient;
  // outNormal = normalMatrix * normalize(h);

  // outNormal = 
  // outNormal = normal;

  // outNormal = normalMatrix * normal;

  fragPos = vec3(modelViewMatrix * vec4(position, 1.0));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position + radialOffset * normal, 1.0);
}