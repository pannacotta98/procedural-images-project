uniform float time;
uniform vec2 resolution;

in vec3 outNormal;
in vec3 localPos;
in float radialOffset;

#pragma glslify: snoise = require(./../commonShader/noise3D)

vec3 objColor = vec3(0.57, 0.76, 0.23);
vec3 snowColor = vec3(1.0, 1.0, 1.0);
vec3 mountainColor = vec3(0.5);
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

vec3 terrainTexture() {
  float radialOffsetWithNoise = radialOffset + 0.005 * snoise(60.0 * localPos);
  if(radialOffsetWithNoise > 0.075)
    return snowColor;
  if(radialOffsetWithNoise > 0.065)
    return mix(mountainColor, snowColor, (radialOffsetWithNoise - 0.065) / (0.075 - 0.065));
  else if(radialOffset > 0.055)
    return mountainColor;
  else if(radialOffset > 0.035)
    return objColor;
  else
    return mix(vec3(0.3, 0.8, 1.0), vec3(0.0, 0.1, 0.7), -70.0 * (radialOffset - 0.035));
  // return vec3(0.1, 0.1, 0.9);
}

void main() {
  vec3 result = (ambient() + diffuse(outNormal)) * terrainTexture();
  gl_FragColor = vec4(result, 1.0);
  // gl_FragColor = vec4(terrainTexture(), 1.0);
  // gl_FragColor = vec4(0.5 * outNormal + 0.5, 1.0);
}