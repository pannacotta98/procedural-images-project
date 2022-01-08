import {
  Color,
  DoubleSide,
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
          height: {value: activeConfig.clouds.height},
          amount: {value: 0},
          warp: {value: 0},
          smoothness: {value: 0},
          color: {value: new Color()}
        }
      ]),
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      lights: true,
      side: DoubleSide
    });
    const geometry = new IcosahedronGeometry(1, 100);
    this.object3D = new Mesh(geometry, this.material);
  }
  update(time) {
    this.material.uniforms.time.value = time;
    this.material.uniforms.opacity.value = activeConfig.clouds.opacity;
    this.material.uniforms.height.value = activeConfig.clouds.height;
    this.material.uniforms.amount.value = activeConfig.clouds.amount;
    this.material.uniforms.warp.value = activeConfig.clouds.warp;
    this.material.uniforms.smoothness.value = activeConfig.clouds.smoothness;
    this.material.uniforms.color.value.set(activeConfig.clouds.color);
    this.object3D.rotation.y = -0.02 * time;
  }
}
