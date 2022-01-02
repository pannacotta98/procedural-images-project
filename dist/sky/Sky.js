import {
  BackSide,
  IcosahedronGeometry,
  Mesh,
  ShaderMaterial,
  Vector2
} from "../../_snowpack/pkg/three.js";
import starsFrag from "./starsFrag.js";
import starsVert from "./starsVert.js";
export class Sky {
  constructor() {
    const geometry = new IcosahedronGeometry(600, 1);
    const material = new ShaderMaterial({
      uniforms: {
        time: {value: 0},
        resolution: {value: new Vector2()}
      },
      vertexShader: starsVert,
      fragmentShader: starsFrag,
      side: BackSide
    });
    this.object3D = new Mesh(geometry, material);
  }
  update(time) {
  }
}
