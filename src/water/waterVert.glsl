uniform float time;
uniform vec2 resolution;

out vec3 outNormal;
// out float radialOffset;
out vec3 vertPos;
out vec3 vertWorldPos;

#pragma glslify: snoise = require(./../commonShader/noise3D)

// float sampleHeight(vec3 pos) {
//   float heightOffset = 0.0;
//   float amp = 1.0;
//   float freq = baseFreq;
//   for(int i = 0; i < numOctaves; ++i) {
//     heightOffset += amp * snoise(freq * pos);
//     amp *= 0.5;
//     freq *= 2.0;
//   }
//   return heightOffsetScale * ((useExponentiation) ? exp(heightOffset) : heightOffset);
//   // return heightOffsetScale * exp(heightOffset);
// }

void main() {
  // radialOffset = sampleHeight(position);

  // // Sample height near the point to calculate gradient using
  // // the triangle method
  // float offsetLength = 0.001;
  // vec3 tangent1 = normalize(cross(normal, vec3(1.0, 0.0, 0.01)));
  // vec3 tangent2 = normalize(cross(tangent1, normal));
  // vec3 tangent3 = normalize(-(tangent1 + tangent2));
  // vec3 p1 = normalize(position + tangent1 * offsetLength);
  // vec3 p2 = normalize(position + tangent2 * offsetLength);
  // vec3 p3 = normalize(position + tangent3 * offsetLength);
  // vec3 s1 = (1.0 + sampleHeight(p1)) * p1;
  // vec3 s2 = (1.0 + sampleHeight(p2)) * p2;
  // vec3 s3 = (1.0 + sampleHeight(p3)) * p3;
  // vec3 v1 = s1 - s3;
  // vec3 v2 = s2 - s3;
  // outNormal = normalMatrix * normalize(-cross(v1, v2));
  // gl_Position = projectionMatrix * modelViewMatrix * vec4(position + radialOffset * normal, 1.0);
  outNormal = normalMatrix * normal;
  vec3 newPos = position;
  vertPos = vec3(modelViewMatrix * vec4(newPos, 1.0));
  vertWorldPos = vec3(modelMatrix * vec4(newPos, 1.0));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}