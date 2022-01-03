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

// float wrappedDiffuse(vec3 N, vec3 L, float w, float n) {
//   return pow(clamp((dot(N, L) + w) / (1.0 + w), 0.0, 1.0), n) * (1.0 + n) / (2.0 * (1.0 + w));
// }

// float diffuser(vec3 N, vec3 L, float w) {
// 	//return max(0.0, dot(N, L)+w);
//   return wrappedDiffuse(N, L, w + 0.3, 1.2);
// }

void main() {
  vec3 mixcolor = color * diffuse(outNormal);
  // vec3 mixcolor = color * diffuser(outNormal, directionalLights[0].direction, 0.2);
  gl_FragColor = vec4(mixcolor, opacity);
}