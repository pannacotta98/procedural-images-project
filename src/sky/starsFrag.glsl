uniform float time;
uniform vec2 resolution;

in vec3 outPosition;

#pragma glslify: snoise = require(./../commonShader/noise3D)

void main() {
  vec3 result = vec3(0.0);

  float middleDst = length(gl_FragCoord.xy - 0.5 * resolution);
  result += vec3(0.2, 0.5, 1.0) * (1.0 - smoothstep(200.0, 300.0, middleDst));

  float starNoiseSample = 0.5 * snoise(2.0 * 30.0 * normalize(outPosition)) + 0.5;
  result += vec3(0.8 * smoothstep(0.88, 0.99, starNoiseSample));
  gl_FragColor = vec4(result, 1.0);
}
