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

// vec3 specular() {
//   vec3 norm = normalize(outNormal);
//   vec3 lightDir = normalize(lightPos - fragPos);
//   // This got a bit messy bcs the guide https://learnopengl.com/Lighting/Basic-Lighting
//   // makes calculations in world space, should probably rewrite and either follow it
//   // or go all the way for view space
//   vec3 cameraViewPosition = vec3(viewMatrix * vec4(cameraPosition, 1.0));
//   vec3 viewDir = normalize(cameraViewPosition - fragPos);
//   vec3 reflectDir = reflect(-lightDir, norm);
//   float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
//   return specularStrength * spec * lightColor;
// }

void main() {
  // Calculate the normal here since the vertices are modified in vertex shader
  // but the normals are not and cannot be modified in geometry shader since
  // it does not exist in WebGL
  vec3 normal = normalize(cross(dFdx(outPosition), dFdy(outPosition)));

  vec3 result = (ambient() + diffuse(outNormal)) * objColor;
  // result *= sin(time);
  // gl_FragColor = vec4(result, 1.0);

  gl_FragColor = vec4(0.5 * outNormal + 0.5, 1.0);

  // gl_FragColor = vec4(uvInterpolated, 0.0, 1.0);

  // gl_FragColor = vec4(fwidth(outPosition), 1.0);

  // if(dFdx(outPosition).x > -0.0001) {
  //   gl_FragColor = vec4(vec3(1), 1.0);
  // } else {
  //   gl_FragColor = vec4(0.1, 0.0, 0.0, 1);
  // }

  // gl_FragColor = vec4(vec3(length(dFdy(outPosition))), 1.0);
}