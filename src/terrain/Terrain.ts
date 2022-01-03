import {
  IcosahedronGeometry,
  Mesh,
  ShaderMaterial,
  UniformsLib,
  UniformsUtils,
  Vector2,
} from 'three';
import type { SceneObject } from './../SceneObject';
import vert from './terrainVert.glsl';
import frag from './terrainFrag.glsl';
import { activeConfig } from '../config';

export class Terrain implements SceneObject {
  object3D: Mesh;
  material: ShaderMaterial;

  constructor() {
    this.material = new ShaderMaterial({
      uniforms: UniformsUtils.merge([
        UniformsLib['lights'],
        {
          time: { value: 0.0 }, // TODO Fix time
          resolution: { value: new Vector2() }, // TODO Also fix
          heightOffsetScale: { value: activeConfig.terrain.offsetScale },
          numOctaves: { value: activeConfig.terrain.numOctaves },
          baseFreq: { value: activeConfig.terrain.baseFreq },
          exponent: { value: activeConfig.terrain.exponent },
          lacunarity: { value: activeConfig.terrain.lacunarity },
          persistance: { value: activeConfig.terrain.persistance },
          absInvert: { value: activeConfig.terrain.absInvert },
        },
      ]),
      vertexShader: vert,
      fragmentShader: frag,
      lights: true,
      wireframe: activeConfig.terrain.wireframe,
    });
    const geometry = new IcosahedronGeometry(1, 100);
    this.object3D = new Mesh(geometry, this.material);
  }

  update(time: number) {
    this.material.uniforms.heightOffsetScale.value =
      activeConfig.terrain.offsetScale;
    this.material.uniforms.numOctaves.value = activeConfig.terrain.numOctaves;
    this.material.uniforms.baseFreq.value = activeConfig.terrain.baseFreq;
    this.material.uniforms.exponent.value = activeConfig.terrain.exponent;
    this.material.uniforms.lacunarity.value = activeConfig.terrain.lacunarity;
    this.material.uniforms.persistance.value = activeConfig.terrain.persistance;
    this.material.uniforms.absInvert.value = activeConfig.terrain.absInvert;
    this.material.wireframe = activeConfig.terrain.wireframe;
  }
}
