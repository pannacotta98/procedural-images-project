uniform float time;
uniform vec2 resolution;

out vec3 outNormal;
// out float radialOffset;
out vec3 vertPos;
out vec3 vertWorldPos;

#pragma glslify: snoise = require(./../commonShader/noise3D)

// float sampleHeight(vec3 pos) {
//   float heightOffset = 0.0;
//   float amp = 1.0;
//   float freq = baseFreq;
//   for(int i = 0; i < numOctaves; ++i) {
//     heightOffset += amp * snoise(freq * pos);
//     amp *= 0.5;
//     freq *= 2.0;
//   }
//   return heightOffsetScale * ((useExponentiation) ? exp(heightOffset) : heightOffset);
//   // return heightOffsetScale * exp(heightOffset);
// }

// Trochoidal waves for sphere based on
// "Real-Time Rendering of Procedurally Generated Planets"
// By Florian Michelic
// https://cescg.org/wp-content/uploads/2018/04/Michelic-Real-Time-Rendering-of-Procedurally-Generated-Planets-2.pdf
vec3 _trochoidalPosiSumTerm(vec3 v, float A, float omega, float l, float phi, float Q, vec3 d) {
  return v * A * sin(omega * l + phi * time) + Q * A * cos(omega * l + phi * time) * d;
}

vec3 _trochoidalNormSumTerm(vec3 v, float A, float omega, float l, float phi, float Q, vec3 d) {
  vec3 term1 = -v * Q * A * omega * sin(omega * l + phi * time);
  vec3 term2 = -d * A * omega * cos(omega * l + phi * time);
  return term1 + term2;
}
vec3 trochoidalWaves(vec3 position, out vec3 normal) {
  float r = 1.0; // Radius of sphere
  vec3 v = normalize(position);
  vec3 o = vec3(0.0, 1.0, 0.0);
  vec3 d = cross(v, cross((v - o), v));
  float l = acos(dot(v, o)) * r;

  vec3 Ps = v * r;
  vec3 ns = v;

  Ps += _trochoidalPosiSumTerm(v, 0.002, 120.0, l, 1.0, 0.5, d);
  ns += _trochoidalNormSumTerm(v, 0.002, 120.0, l, 1.0, 0.5, d);

  Ps += _trochoidalPosiSumTerm(v, 0.002, 120.0, l, 1.0, 0.5, d);
  ns += _trochoidalNormSumTerm(v, 0.002, 120.0, l, 1.0, 0.5, d);

  normal = ns;
  return Ps;
}

void main() {
  vec3 newNormal;
  vec3 newPos = trochoidalWaves(position, newNormal);

  outNormal = normalMatrix * newNormal;
  vertPos = vec3(modelViewMatrix * vec4(newPos, 1.0));
  vertWorldPos = vec3(modelMatrix * vec4(newPos, 1.0));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}