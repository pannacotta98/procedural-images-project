uniform float time;
uniform vec2 resolution;

in vec3 outNormal;

vec3 objColor = vec3(0, 0.05, 0.84);

#if NUM_DIR_LIGHTS > 0
struct DirectionalLight {
  vec3 direction;
  vec3 color;
};
uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];
#endif

vec3 diffuse(vec3 normal) {
  vec3 lightDir = directionalLights[0].direction;
  vec3 lightColor = directionalLights[0].color;
  vec3 norm = normalize(normal);
  float diff = max(dot(norm, lightDir), 0.0);
  return diff * lightColor;
}

// TODO Add specular light

void main() {
  vec3 result = diffuse(outNormal) * objColor;
  gl_FragColor = vec4(result, 1.0);
}