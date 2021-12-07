import { IcosahedronGeometry, Mesh, MeshBasicMaterial } from 'three';
import type { SceneObject } from './../SceneObject';

export class Water implements SceneObject {
  object3D: Mesh;

  constructor() {
    // const material = new ShaderMaterial({
    //   uniforms: {
    //     time: { value: 0.0 }, // TODO Fix time
    //     resolution: { value: new Vector2() }, // TODO Also fix
    //     heightOffsetScale: { value: 0.03 },
    //   },
    //   vertexShader: noise3DShader + testVert,
    //   fragmentShader: testFrag,
    //   // wireframe: true,
    // });
    const material = new MeshBasicMaterial({
      color: '#303097',
      opacity: 0.8,
      transparent: true,
    });
    const geometry = new IcosahedronGeometry(1, 100);
    this.object3D = new Mesh(geometry, material);
  }

  update(time: number) {}
}
