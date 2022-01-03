import {
  BackSide,
  Camera,
  IcosahedronGeometry,
  Mesh,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';
import type { SceneObject } from './../SceneObject';
import starsFrag from './starsFrag.glsl';
import starsVert from './starsVert.glsl';

export class Sky implements SceneObject {
  object3D: Mesh;
  material: ShaderMaterial;

  constructor() {
    const geometry = new IcosahedronGeometry(600, 1);
    this.material = new ShaderMaterial({
      uniforms: {
        time: { value: 0.0 }, // TODO Fix time; now works but is it done correctly?
        resolution: { value: new Vector2() }, // TODO Also fix
      },
      vertexShader: starsVert,
      fragmentShader: starsFrag,
      side: BackSide,
    });
    this.object3D = new Mesh(geometry, this.material);
  }

  update(time: number, renderer: WebGLRenderer, camera: Camera) {
    renderer.getSize(this.material.uniforms.resolution.value);
  }
}
