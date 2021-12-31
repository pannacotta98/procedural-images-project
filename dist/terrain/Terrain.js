import {
  IcosahedronGeometry,
  Mesh,
  ShaderMaterial,
  UniformsLib,
  UniformsUtils,
  Vector2
} from "../../_snowpack/pkg/three.js";
import vert from "./terrainVert.js";
import frag from "./terrainFrag.js";
import {activeConfig} from "../config.js";
export class Terrain {
  constructor() {
    this.material = new ShaderMaterial({
      uniforms: UniformsUtils.merge([
        UniformsLib["lights"],
        {
          time: {value: 0},
          resolution: {value: new Vector2()},
          heightOffsetScale: {value: activeConfig.terrain.offsetScale},
          numOctaves: {value: activeConfig.terrain.numOctaves},
          baseFreq: {value: activeConfig.terrain.baseFreq},
          useExponentiation: {value: activeConfig.terrain.useExponentiation}
        }
      ]),
      vertexShader: vert,
      fragmentShader: frag,
      lights: true,
      wireframe: activeConfig.terrain.wireframe
    });
    const geometry = new IcosahedronGeometry(1, 100);
    this.object3D = new Mesh(geometry, this.material);
  }
  update(time) {
    this.material.uniforms.heightOffsetScale.value = activeConfig.terrain.offsetScale;
    this.material.uniforms.numOctaves.value = activeConfig.terrain.numOctaves;
    this.material.uniforms.baseFreq.value = activeConfig.terrain.baseFreq;
    this.material.uniforms.useExponentiation.value = activeConfig.terrain.useExponentiation;
    this.material.wireframe = activeConfig.terrain.wireframe;
  }
}
