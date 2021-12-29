uniform float time;
uniform vec2 resolution;

in vec3 outNormal;
in vec3 fragPos;
in float radialOffset;

vec3 objColor = vec3(0.57, 0.76, 0.23);
vec3 mountainColor = vec3(0.49);
vec3 snowColor = vec3(1.0, 1.0, 1.0);
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
  if(radialOffset > 0.075) {
    return snowColor;
  } else if(radialOffset > 0.06) {
    return mountainColor;
  } else if(radialOffset > 0.043) {
    return objColor;
  } else {
    return vec3(0.7, 0.7, 0.1);
  }
}

void main() {
  vec3 result = (ambient() + diffuse(outNormal)) * terrainTexture();
  gl_FragColor = vec4(result, 1.0);
  // gl_FragColor = vec4(terrainTexture(), 1.0);
  // gl_FragColor = vec4(0.5 * outNormal + 0.5, 1.0);
}