uniform float time;
uniform vec2 resolution;

in vec3 outPosition;
in vec3 outNormal;
in vec3 fragPos;
in vec2 uvInterpolated;
in float radialOffset;

// Some hard coded values that are very much subject to change
// eventually
// vec3 lightPos = vec3(3.0, 2.0, 6.0);
vec3 lightPos = 10.0 * vec3(3.0, 2.0, 1.0);
// vec3 lightPos = vec3(6.0, 0.0, 0.0);
vec3 lightColor = vec3(1.0, 1.0, 1.0);
vec3 objColor = vec3(0.57, 0.76, 0.23);
vec3 snowColor = vec3(1.0, 1.0, 1.0);
float ambientFactor = 0.0;

vec3 ambient() {
  return ambientFactor * lightColor;
}

vec3 diffuse(vec3 normal) {
  vec3 norm = normalize(normal);
  vec3 lightDir = normalize(lightPos - fragPos);
  float diff = max(dot(norm, lightDir), 0.0);
  return diff * lightColor;
}

vec3 terrainTexture() {
  // vec3 color = vec3(0.0);
  // color += (smoothstep())
  // return color;
  // return smoothstep(-0.1, 0.1, radialOffset) * objColor;

  if(radialOffset > 0.02)
    return snowColor;
  else if(radialOffset > 0.0)
    return objColor;
  else
    return vec3(0.1, 0.1, 0.9);
}

void main() {
  vec3 result = (ambient() + diffuse(outNormal)) * terrainTexture();
  // result *= sin(time);
  gl_FragColor = vec4(result, 1.0);
  // gl_FragColor = vec4(terrainTexture(), 1.0);

  // gl_FragColor = vec4(0.5 * outNormal + 0.5, 1.0);
}