import { activeConfig } from './../config';
import {
  Color,
  IcosahedronGeometry,
  Mesh,
  ShaderMaterial,
  SphereGeometry,
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
          color: { value: new Color() },
        },
      ]),
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      lights: true,
      // wireframe: true,
    });
    // const geometry = new IcosahedronGeometry(1, 90);
    const geometry = new SphereGeometry(1, 500, 500);
    this.object3D = new Mesh(geometry, this.material);
  }

  update(time: number) {
    this.material.uniforms.time.value = time;
    this.material.uniforms.color.value.set(activeConfig.water.color);
    this.object3D.scale.set(
      activeConfig.water.height,
      activeConfig.water.height,
      activeConfig.water.height,
    );
  }
}
