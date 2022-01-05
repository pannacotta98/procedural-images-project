uniform float time;
uniform vec2 resolution;
uniform float wavesIntensity;
uniform float wavesSize;
uniform float wavesSpeed;
uniform bool useTrochoidalWaves;

out vec3 outNormal;
out vec3 vertPos;
out vec3 vertWorldPos;

#pragma glslify: snoise = require(./../commonShader/noise3D)

vec3 _trochoidalPosiSumTerm(vec3 v, float A, float omega, float l, float phi, float Q, vec3 d) {
  return v * A * sin(omega * l + phi * time) + Q * A * cos(omega * l + phi * time) * d;
}

vec3 _trochoidalNormSumTerm(vec3 v, float A, float omega, float l, float phi, float Q, vec3 d) {
  vec3 term1 = -v * Q * A * omega * sin(omega * l + phi * time);
  vec3 term2 = -d * A * omega * cos(omega * l + phi * time);
  return term1 + term2;
}

// Trochoidal waves for sphere based on
// "Real-Time Rendering of Procedurally Generated Planets"
// By Florian Michelic
// https://cescg.org/wp-content/uploads/2018/04/Michelic-Real-Time-Rendering-of-Procedurally-Generated-Planets-2.pdf
vec3 trochoidalWaves(vec3 position, out vec3 normal) {
  float r = 1.0; // Radius of sphere
  vec3 v = normalize(position);
  vec3 o; // waves origin
  vec3 d;
  float l, Q;

  vec3 Ps = v * r;
  vec3 ns = v;

  o = -normalize(vec3(0.0, 1.0, 0.0));
  d = cross(v, cross((v - o), v));
  l = acos(dot(v, o)) * r;
  // Q = 0.9 * smoothstep(0.1, 0.11, 1.0 - abs(dot(v, o)));
  Q = 0.7;
  Ps += _trochoidalPosiSumTerm(v, wavesIntensity, wavesSize, l, wavesSpeed, Q, d);
  ns += _trochoidalNormSumTerm(v, wavesIntensity, wavesSize, l, wavesSpeed, Q, d);

  o = -normalize(vec3(0.13, 1.0, 0.25));
  d = cross(v, cross((v - o), v));
  l = acos(dot(v, o)) * r;
  // Q = 0.9 * smoothstep(0.1, 0.11, 1.0 - abs(dot(v, o)));
  Q = 0.97;
  Ps += _trochoidalPosiSumTerm(v, wavesIntensity, 0.5 * wavesSize, l, wavesSpeed, Q, d);
  ns += _trochoidalNormSumTerm(v, wavesIntensity, 0.5 * wavesSize, l, wavesSpeed, Q, d);

  o = -normalize(vec3(0.23, 1.0, 0.01));
  d = cross(v, cross((v - o), v));
  l = acos(dot(v, o)) * r;
  // Q = 0.9 * smoothstep(0.1, 0.11, 1.0 - abs(dot(v, o)));
  Q = 0.57;
  Ps += _trochoidalPosiSumTerm(v, 0.9 * wavesIntensity, 0.7 * wavesSize, l, 1.3 * wavesSpeed, Q, d);
  ns += _trochoidalNormSumTerm(v, 0.9 * wavesIntensity, 0.7 * wavesSize, l, 1.3 * wavesSpeed, Q, d);

  o = -normalize(vec3(0.0, 1.0, 0.0));
  d = cross(v, cross((v - o), v));
  l = acos(dot(v, o)) * r;
  // Q = 0.9 * smoothstep(0.1, 0.11, 1.0 - abs(dot(v, o)));
  Q = 0.7;
  Ps += _trochoidalPosiSumTerm(v, wavesIntensity, wavesSize, l, 1.64 * wavesSpeed, Q, d);
  ns += _trochoidalNormSumTerm(v, wavesIntensity, wavesSize, l, 1.64 * wavesSpeed, Q, d);

  normal = ns;
  return Ps;
}

void main() {
  if(useTrochoidalWaves) {
    vec3 newNormal;
    vec3 newPos = trochoidalWaves(position, newNormal);

    outNormal = normalMatrix * newNormal;
    vertPos = vec3(modelViewMatrix * vec4(newPos, 1.0));
    vertWorldPos = vec3(modelMatrix * vec4(newPos, 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  } else {
    outNormal = normalMatrix * normal;
    vertPos = vec3(modelViewMatrix * vec4(position, 1.0));
    vertWorldPos = vec3(modelMatrix * vec4(position, 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }

}