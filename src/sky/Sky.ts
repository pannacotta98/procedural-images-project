import {
  BackSide,
  IcosahedronGeometry,
  Mesh,
  ShaderMaterial,
  Vector2,
} from 'three';
import type { SceneObject } from './../SceneObject';
import starsFrag from './starsFrag.glsl';
import starsVert from './starsVert.glsl';

export class Sky implements SceneObject {
  object3D: Mesh;

  constructor() {
    const geometry = new IcosahedronGeometry(30, 1);
    const material = new ShaderMaterial({
      uniforms: {
        time: { value: 0.0 }, // TODO Fix time; now works but is it done correctly?
        resolution: { value: new Vector2() }, // TODO Also fix
      },
      vertexShader: starsVert,
      fragmentShader: starsFrag,
      side: BackSide,
      // wireframe: true,
    });
    this.object3D = new Mesh(geometry, material);
  }

  update(time: number) {}
}
