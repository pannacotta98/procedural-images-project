import { activeConfig } from './../config';
import {
  IcosahedronGeometry,
  Mesh,
  ShaderMaterial,
  UniformsLib,
  UniformsUtils,
  Vector2,
} from 'three';
import type { SceneObject } from './../SceneObject';
import frag from './waterFrag.glsl';
import vert from './waterVert.glsl';

export class Water implements SceneObject {
  object3D: Mesh;
  material: ShaderMaterial;

  constructor() {
    this.material = new ShaderMaterial({
      uniforms: UniformsUtils.merge([
        UniformsLib['lights'],
        {
          time: { value: 0.0 },
          resolution: { value: new Vector2() }, // TODO fix
          heightOffsetScale: { value: 0.03 },
        },
      ]),
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      opacity: 0.5,
      lights: true,
      // wireframe: true,
    });
    const geometry = new IcosahedronGeometry(1, 20);
    this.object3D = new Mesh(geometry, this.material);
  }

  update(time: number) {
    this.material.uniforms.time.value = activeConfig.water.height;
    this.object3D.scale.set(
      activeConfig.water.height,
      activeConfig.water.height,
      activeConfig.water.height,
    );
  }
}
