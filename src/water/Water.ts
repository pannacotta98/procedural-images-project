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
    const uniforms = UniformsUtils.merge([
      UniformsLib['lights'],
      {
        time: { value: 0.0 },
        resolution: { value: new Vector2() }, // TODO fix
        heightOffsetScale: { value: 0.03 },
      },
    ]);
    this.material = new ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      opacity: 0.5,
      lights: true,
      // wireframe: true,
    });
    const geometry = new IcosahedronGeometry(1.04, 100);
    this.object3D = new Mesh(geometry, this.material);
    // TODO Maybe use some callback that maybe exist in three.js
  }

  update(time: number) {
    this.material.uniforms.time.value = time;
  }
}
