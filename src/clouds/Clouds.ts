import {
  DoubleSide,
  IcosahedronGeometry,
  Mesh,
  ShaderMaterial,
  UniformsLib,
  UniformsUtils,
  Vector2,
} from 'three';
import type { SceneObject } from './../SceneObject';
import frag from './cloudsFrag.glsl';
import vert from './cloudsVert.glsl';
import { activeConfig } from '../config';

export class Clouds implements SceneObject {
  object3D: Mesh;
  material: ShaderMaterial;

  constructor() {
    this.material = new ShaderMaterial({
      uniforms: UniformsUtils.merge([
        UniformsLib['lights'],
        {
          time: { value: 0.0 },
          resolution: { value: new Vector2() }, // TODO fix
          opacity: { value: activeConfig.clouds.opacity },
          height: { value: activeConfig.clouds.height },
          amount: { value: 0.0 },
          warp: { value: 0 },
          smoothness: { value: 0 },
        },
      ]),
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      lights: true,
      side: DoubleSide,
      // wireframe: true,
    });

    const geometry = new IcosahedronGeometry(1.0, 100);
    this.object3D = new Mesh(geometry, this.material);
  }

  update(time: number) {
    this.material.uniforms.time.value = time;
    this.material.uniforms.opacity.value = activeConfig.clouds.opacity;
    this.material.uniforms.height.value = activeConfig.clouds.height;
    this.material.uniforms.amount.value = activeConfig.clouds.amount;
    this.material.uniforms.warp.value = activeConfig.clouds.warp;
    this.material.uniforms.smoothness.value = activeConfig.clouds.smoothness;

    this.object3D.rotation.y = -0.02 * time;
  }
}
