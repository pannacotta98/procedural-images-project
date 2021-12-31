import {
  Color,
  IcosahedronGeometry,
  Mesh,
  ShaderMaterial,
  UniformsLib,
  UniformsUtils,
  Vector2,
} from 'three';
import type { SceneObject } from './../SceneObject';
import frag from './atmosphereFrag.glsl';
import vert from './atmosphereVert.glsl';
import { activeConfig } from '../config';

export class Atmosphere implements SceneObject {
  object3D: Mesh;
  material: ShaderMaterial;

  constructor() {
    this.material = new ShaderMaterial({
      uniforms: UniformsUtils.merge([
        UniformsLib['lights'],
        {
          time: { value: 0.0 },
          resolution: { value: new Vector2() }, // TODO fix
          opacity: { value: 0.0 },
          color: { value: new Color() },
        },
      ]),
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      lights: true,
      wireframe: activeConfig.atmosphere.wireframe,
    });

    const geometry = new IcosahedronGeometry(1.12, 10);
    this.object3D = new Mesh(geometry, this.material);
  }

  update(time: number) {
    this.material.uniforms.time.value = time;
    this.material.uniforms.color.value.set(activeConfig.atmosphere.color);
    this.material.uniforms.opacity.value = activeConfig.atmosphere.opacity;
    this.material.wireframe = activeConfig.atmosphere.wireframe;
  }
}
