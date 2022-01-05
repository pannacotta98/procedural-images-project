uniform float time;
uniform vec2 resolution;
uniform float opacity;
uniform vec3 color;
uniform float fresnel;

in vec3 outNormal;
in vec3 vertPos;

#if NUM_DIR_LIGHTS > 0
struct DirectionalLight {
  vec3 direction;
  vec3 color;
};
uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];
#endif

vec3 wrapDiffuse(vec3 normal, float wrap) {
  vec3 lightDir = directionalLights[0].direction;
  vec3 lightColor = directionalLights[0].color;
  return lightColor * max(0.0, (dot(lightDir, normal) + wrap) / (1.0 + wrap));
}

void main() {
  float m = (1.0 - dot(normalize(vec3(0.0) - vertPos), outNormal));
  float fres = pow(m, fresnel);
  vec3 mixcolor = color * wrapDiffuse(outNormal, 0.5);
  float alpha = mix(0.0, opacity, fres);
  gl_FragColor = vec4(mixcolor, alpha);
}