uniform float time;
uniform vec2 resolution;
uniform float opacity;
uniform vec3 color;

in vec3 outNormal;

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

void main() {
  vec3 mixcolor = color * diffuse(outNormal);
  gl_FragColor = vec4(mixcolor, opacity);
}