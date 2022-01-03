import {
  IcosahedronGeometry,
  Mesh,
  ShaderMaterial,
  UniformsLib,
  UniformsUtils,
  Vector2
} from "../../_snowpack/pkg/three.js";
import frag from "./cloudsFrag.js";
import vert from "./cloudsVert.js";
import {activeConfig} from "../config.js";
export class Clouds {
  constructor() {
    this.material = new ShaderMaterial({
      uniforms: UniformsUtils.merge([
        UniformsLib["lights"],
        {
          time: {value: 0},
          resolution: {value: new Vector2()},
          opacity: {value: activeConfig.clouds.opacity},
          height: {value: activeConfig.clouds.height}
        }
      ]),
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      lights: true
    });
    const geometry = new IcosahedronGeometry(1, 100);
    this.object3D = new Mesh(geometry, this.material);
  }
  update(time) {
    this.material.uniforms.time.value = time;
    this.material.uniforms.opacity.value = activeConfig.clouds.opacity;
    this.material.uniforms.height.value = activeConfig.clouds.height;
  }
}
