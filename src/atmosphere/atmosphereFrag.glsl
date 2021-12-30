uniform float time;
uniform vec2 resolution;

in vec3 outPosition;
in vec3 outNormal;
in vec3 fragPos;
in vec2 uvInterpolated;

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

  // vec3 mixcolor = vec3(0.5 + 0.4 * n);
  // gl_FragColor = vec4(mixcolor, 0.4);

  vec3 mixcolor = vec3(0.66, 0.74, 1) * diffuse(outNormal);
  gl_FragColor = vec4(mixcolor, 0.2);
  // gl_FragColor = vec4(mixcolor, 0.5 + 0.4 * n);

  // gl_FragColor = vec4(1.0, 0.0, 0.0, 0.2);
}