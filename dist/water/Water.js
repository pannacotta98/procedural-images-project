import {activeConfig} from "../config.js";
import {
  Color,
  IcosahedronGeometry,
  Mesh,
  ShaderMaterial,
  UniformsLib,
  UniformsUtils,
  Vector2
} from "../../_snowpack/pkg/three.js";
import frag from "./waterFrag.js";
import vert from "./waterVert.js";
export class Water {
  constructor() {
    this.material = new ShaderMaterial({
      uniforms: UniformsUtils.merge([
        UniformsLib["lights"],
        {
          time: {value: 0},
          resolution: {value: new Vector2()},
          heightOffsetScale: {value: 0.03},
          color: {value: new Color()}
        }
      ]),
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      opacity: 0.5,
      lights: true
    });
    const geometry = new IcosahedronGeometry(1, 20);
    this.object3D = new Mesh(geometry, this.material);
  }
  update(time) {
    this.material.uniforms.time.value = activeConfig.water.height;
    this.material.uniforms.color.value.set(activeConfig.water.color);
    this.object3D.scale.set(activeConfig.water.height, activeConfig.water.height, activeConfig.water.height);
  }
}
