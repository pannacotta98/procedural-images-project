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
        },
      ]),
      vertexShader: vert,
      fragmentShader: frag,
      lights: true,
      // wireframe: true,
    });
    const geometry = new IcosahedronGeometry(1, 100);
    this.object3D = new Mesh(geometry, this.material);
    // material.uniformsNeedUpdate = true;
  }

  update(time: number) {
    this.material.uniforms.heightOffsetScale.value =
      activeConfig.terrain.offsetScale;
    this.material.uniforms.numOctaves.value = activeConfig.terrain.numOctaves;
    this.material.uniforms.baseFreq.value = activeConfig.terrain.baseFreq;
  }
}
