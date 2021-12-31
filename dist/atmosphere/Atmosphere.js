import {
  Color,
  IcosahedronGeometry,
  Mesh,
  ShaderMaterial,
  UniformsLib,
  UniformsUtils,
  Vector2
} from "../../_snowpack/pkg/three.js";
import frag from "./atmosphereFrag.js";
import vert from "./atmosphereVert.js";
import {activeConfig} from "../config.js";
export class Atmosphere {
  constructor() {
    this.material = new ShaderMaterial({
      uniforms: UniformsUtils.merge([
        UniformsLib["lights"],
        {
          time: {value: 0},
          resolution: {value: new Vector2()},
          opacity: {value: 0},
          color: {value: new Color()}
        }
      ]),
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      lights: true,
      wireframe: activeConfig.atmosphere.wireframe
    });
    const geometry = new IcosahedronGeometry(1.12, 10);
    this.object3D = new Mesh(geometry, this.material);
  }
  update(time) {
    this.material.uniforms.time.value = time;
    this.material.uniforms.color.value.set(activeConfig.atmosphere.color);
    this.material.uniforms.opacity.value = activeConfig.atmosphere.opacity;
    this.material.wireframe = activeConfig.atmosphere.wireframe;
  }
}
