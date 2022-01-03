uniform float time;
uniform vec2 resolution;
uniform float waterHeight;
uniform vec3 landColor;
uniform vec3 snowColor;
uniform vec3 sandColor;
uniform vec3 mountainColor;

in vec3 outNormal;
in vec3 localPos;
in float radialOffset;

#pragma glslify: snoise = require(./../commonShader/noise3D)

float ambientFactor = 0.0;

#if NUM_DIR_LIGHTS > 0
struct DirectionalLight {
  vec3 direction;
  vec3 color;
};
uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];
#endif

vec3 ambient() {
  vec3 lightColor = directionalLights[0].color;
  return ambientFactor * lightColor;
}

vec3 diffuse(vec3 normal) {
  vec3 lightDir = directionalLights[0].direction;
  vec3 lightColor = directionalLights[0].color;
  vec3 norm = normalize(normal);
  float diff = max(dot(norm, lightDir), 0.0);
  return diff * lightColor;
}

#define N_GRAD_STOPS 8

vec3 multiStopGradient(float samplePos, float stopPos[N_GRAD_STOPS], vec3 stopColor[N_GRAD_STOPS]) {
  // TODO Could this be unrolled by three.js to improve performance?
  for(int i = 0; i < stopPos.length() - 1; ++i)
    if(samplePos < stopPos[i + 1]) {
      float t = (samplePos - stopPos[i]) / (stopPos[i + 1] - stopPos[i]);
      return mix(stopColor[i], stopColor[i + 1], t);
    }

  // Don't want this
  return vec3(1.0, 0.0, 1.0);
}

vec3 terrainTexture() {
  float stopPos[N_GRAD_STOPS] = float[] (0.0, 0.035, 0.045, 0.055, 0.060, 0.07, 0.08, 1.0);
  for(int i = 0; i < N_GRAD_STOPS; ++i) {
    stopPos[i] += (waterHeight - 1.0) - 0.035;
  }
  vec3 stopColor[N_GRAD_STOPS] = vec3[] (sandColor, sandColor, landColor, landColor, mountainColor, mountainColor, snowColor, snowColor);

  return multiStopGradient(radialOffset, stopPos, stopColor);

  // float radialOffsetWithNoise = radialOffset + 0.005 * snoise(10.0 * localPos);
  // return multiStopGradient(radialOffsetWithNoise, stopPos, stopColor);
}

void main() {
  vec3 result = (ambient() + diffuse(outNormal)) * terrainTexture();
  gl_FragColor = vec4(result, 1.0);
  // gl_FragColor = vec4(terrainTexture(), 1.0);
  // gl_FragColor = vec4(0.5 * outNormal + 0.5, 1.0);
}