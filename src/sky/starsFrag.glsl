uniform float time;
uniform vec2 resolution;

in vec3 outPosition;

#pragma glslify: snoise = require(./../commonShader/noise3D)

void main() {
  vec3 result = vec3(0.0);
  float starNoiseSample = 0.5 * snoise(2.0 * 30.0 * normalize(outPosition)) + 0.5;
  result += vec3(0.8 * smoothstep(0.88, 0.99, starNoiseSample));
  gl_FragColor = vec4(result, 1.0);
}
