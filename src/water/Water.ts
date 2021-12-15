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

  constructor() {
    const material = new ShaderMaterial({
      uniforms: UniformsUtils.merge([
        UniformsLib['lights'],
        {
          time: { value: 0.0 }, // TODO Fix time
          resolution: { value: new Vector2() }, // TODO Also fix
          heightOffsetScale: { value: 0.03 },
        },
      ]),
      vertexShader: vert,
      fragmentShader: frag,
      // transparent: true,
      lights: true,
      // wireframe: true,
    });
    // const material = new MeshLambertMaterial({
    //   color: '#303097',
    //   opacity: 0.8,
    //   transparent: true,
    // });
    const geometry = new IcosahedronGeometry(1.04, 100);
    this.object3D = new Mesh(geometry, material);
  }

  update(time: number) {}
}
