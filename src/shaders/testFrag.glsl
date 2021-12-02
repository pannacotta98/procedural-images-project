uniform float time;
uniform vec2 resolution;

in vec3 outPosition;
in vec3 outNormal;
in vec3 fragPos;
in vec2 uvInterpolated;

// Some hard coded values that are very much subject to change
// eventually
// vec3 lightPos = vec3(3.0, 2.0, 6.0);
vec3 lightPos = 10.0 * vec3(3.0, 2.0, 1.0);
// vec3 lightPos = vec3(6.0, 0.0, 0.0);
vec3 lightColor = vec3(1.0, 1.0, 1.0);
vec3 objColor = vec3(0.25, 0.65, 0.91);
float ambientFactor = 0.1;
float specularStrength = 0.5;

vec3 ambient() {
  return ambientFactor * lightColor;
}

vec3 diffuse(vec3 normal) {
  vec3 norm = normalize(normal);
  vec3 lightDir = normalize(lightPos - fragPos);
  float diff = max(dot(norm, lightDir), 0.0);
  return diff * lightColor;
}

void main() {
  vec3 result = (ambient() + diffuse(outNormal)) * objColor;
  // result *= sin(time);
  gl_FragColor = vec4(result, 1.0);

  // gl_FragColor = vec4(0.5 * outNormal + 0.5, 1.0);
}