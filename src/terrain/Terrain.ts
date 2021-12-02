import { IcosahedronGeometry, Mesh, ShaderMaterial, Vector2 } from 'three';
import type { SceneObject } from './../SceneObject';
import testVert from './../shaders/testVert.glsl';
import testFrag from './../shaders/testFrag.glsl';
import noise3DShader from './../commonShader/noise3D.glsl';

export class Terrain implements SceneObject {
  object3D: Mesh;

  constructor() {
    const material = new ShaderMaterial({
      uniforms: {
        time: { value: 0.0 }, // TODO Fix time
        resolution: { value: new Vector2() }, // TODO Also fix
        heightOffsetScale: { value: 0.03 },
      },
      vertexShader: noise3DShader + testVert,
      fragmentShader: testFrag,
      // wireframe: true,
    });
    const geometry = new IcosahedronGeometry(1, 100);
    this.object3D = new Mesh(geometry, material);
  }

  update(time: number) {}
}
