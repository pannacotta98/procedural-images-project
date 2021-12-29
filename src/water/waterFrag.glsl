uniform float time;
uniform vec2 resolution;

in vec3 outNormal;
in vec3 vertPos;
in vec3 vertWorldPos;

#pragma glslify: psrdnoise = require(./../commonShader/psrdnoise3-min.glsl)

vec3 objColor = vec3(0, 0.37, 1);

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

vec3 specular(vec3 normal) {
  float specularStrength = 0.5;
  vec3 lightDir = directionalLights[0].direction;
  vec3 lightColor = directionalLights[0].color;
  vec3 viewPos = vec3(0.0, 0.0, 0.0);
  vec3 viewDir = normalize(viewPos - vertPos);
  vec3 norm = normalize(normal);
  vec3 reflectDir = reflect(-lightDir, norm);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), 16.0);
  return specularStrength * spec * lightColor;
}

void main() {
  float freqScale = 10.0;
  float displaceAmount = 0.02;
  vec3 gradient = vec3(0.0);
  float noise = psrdnoise(vertWorldPos * freqScale, vec3(10.0), 1.5 * time, gradient);
  // float noise = psrdnoise(vertWorldPos * freqScale + time * vec3(0.2), vec3(10.0), 2.0 * time, gradient);

  vec3 gradientProjOnTangentPlane = gradient - dot(gradient, outNormal) * outNormal;
  vec3 newNormal = normalize(outNormal - displaceAmount * gradientProjOnTangentPlane);

  // TODO Fresnel effecte
  float objRefrInx = 1.333; // Water
  float otherRefrIndx = 1.0; // Vaccum or air
  float R0 = pow((otherRefrIndx - objRefrInx) / (otherRefrIndx + objRefrInx), 2.0);
  // float cosTheta = dot(normalize(vec3(0.0) - vertPos), directionalLights[0].direction);
  // float cosTheta = dot(outNormal, directionalLights[0].direction);
  float cosTheta = dot(normalize(vec3(0.0) - vertPos), newNormal);
  float reflCoeff = R0 + (1.0 - R0) * pow(1.0 - cosTheta, 5.0);

  // vec3 result = diffuse(newNormal) * objColor + reflCoeff * specular(newNormal);
  // gl_FragColor = vec4(result, 0.6);
  // gl_FragColor = vec4(vec3(reflCoeff), 0.6);
  // gl_FragColor = vec4(diffuse(newNormal) * objColor, 0.2) + vec4(vec3(1.0), reflCoeff);
  gl_FragColor = mix(vec4(diffuse(newNormal) * objColor, 0.2), vec4(vec3(1.0), 1.0), reflCoeff);
  // gl_FragColor = vec4(vec3(-0.3 * vertPos.z), 1.0);

  // vec3 result = specular(newNormal);
  // gl_FragColor = vec4(vec3(1.0), reflCoeff);
}
