uniform float time;
uniform vec2 resolution;
uniform vec3 color;
uniform bool useFresnel;
uniform float opacity;
uniform float wavesIntensity;
uniform float wavesSize;
uniform float wavesSpeed;
uniform bool useTrochoidalWaves;

in vec3 outNormal;
in vec3 vertPos;
in vec3 vertWorldPos;

#pragma glslify: psrdnoise = require(./../commonShader/psrdnoise3-min.glsl)

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

// Returns the reflection coefficient
float fresnel(vec3 normal, vec3 vertPos) {
  float objRefrInx = 1.333; // Water
  // float objRefrInx = 2.0; // Idk
  float otherRefrIndx = 1.0; // Vaccum or air
  float R0 = pow((otherRefrIndx - objRefrInx) / (otherRefrIndx + objRefrInx), 2.0);
  float cosTheta = dot(normalize(vec3(0.0) - vertPos), normal);
  return R0 + (1.0 - R0) * pow(1.0 - cosTheta, 5.0);
}

void main() {
  vec3 finalNormal;
  if(!useTrochoidalWaves) {
    float freqScale = wavesSize / 11.8;
    float displaceAmount = 10.0 * wavesIntensity;
    vec3 gradient = vec3(0.0);
    float noise = psrdnoise(vertWorldPos * freqScale, vec3(10.0), wavesSpeed * time, gradient);

    vec3 gradientProjOnTangentPlane = gradient - dot(gradient, outNormal) * outNormal;
    finalNormal = normalize(outNormal - displaceAmount * gradientProjOnTangentPlane);
  } else {
    finalNormal = outNormal;
  }

  if(useFresnel) {
    float reflCoeff = fresnel(finalNormal, vertPos);
    // TODO Investigate how this mixing should be done
    vec3 result = mix(diffuse(finalNormal) * color, specular(finalNormal), reflCoeff);
    float resultAlpha = mix(opacity, 1.0, reflCoeff);
    gl_FragColor = vec4(result, resultAlpha);
  } else {
    gl_FragColor = vec4(diffuse(finalNormal) * color + specular(finalNormal), opacity);
  }

  // DEBUG
  // gl_FragColor = vec4(vec3(reflCoeff), 1.0);
  // gl_FragColor = vec4(0.5 + 0.5 * outNormal, 1.0);
  // gl_FragColor = vec4(specular(outNormal) * reflCoeff, 1.0);
}

// Some help from https://stegu.github.io/psrdnoise/3d-gallery/wobblysphere-threejs.html
	// const float bumpamount = 0.05;

	// // Bump map surface
	// vec3 grad = vec3(0.0); // To store gradient of noise
	// vec3 gradtemp = vec3(0.0); // Temporary gradient for fractal sum
	// float bump = psrdnoise(texcoord*10.0, vec3(240.0), 0.0, grad);
	// grad *= 10.0; // Scale gradient with inner derivative (texcoord scale)
	// bump += 0.5 * psrdnoise(texcoord*20.0 + 0.02*grad, vec3(240.0), 0.0, gradtemp);
	// grad += 10.0 * gradtemp; // Same influence (double freq, half amp)
	// bump += 0.25 * psrdnoise(texcoord*40.0, vec3(240.0), 0.0, gradtemp);
	// grad += 10.0 * gradtemp; // Same influence (double freq, half amp)

	// vec3 pattern = vec3(0.5+0.5*bump); // Re-use bump value for surface color
	// pattern.rb = 1.0-pattern.rb; // Set some color to it to liven up the demo

	// bump *= 0.2; // Bump noise starts at 1/5 the size of displacement noise
	// grad *= 0.2; // and should be scaled to 1/5 the height as well

	// // Perturb normal
	// vec3 bumpedN;
	// vec3 N_ = grad - dot(grad, N) * N;
	// bumpedN = N - bumpamount * N_;
	// bumpedN = normalize(bumpedN);
	// bumpedN = mat3(modelViewMatrix) * bumpedN;
