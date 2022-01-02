import { Mesh, TextureLoader } from 'three';
import type { SceneObject } from './../SceneObject';
import { activeConfig } from '../config';
import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';

export class Sun implements SceneObject {
  object3D: Mesh;

  constructor() {
    const textureLoader = new TextureLoader();

    const textureFlare0 = textureLoader.load('textures/lensflare0.png');
    const textureFlare1 = textureLoader.load('textures/lensflare2.png');
    const textureFlare2 = textureLoader.load('textures/lensflare3.png');

    const lensflare = new Lensflare();

    lensflare.addElement(new LensflareElement(textureFlare0, 512, 0));
    lensflare.addElement(new LensflareElement(textureFlare1, 512, 0));
    lensflare.addElement(new LensflareElement(textureFlare2, 60, 0.6));
    lensflare.addElement(new LensflareElement(textureFlare2, 60, 0.9));

    this.object3D = lensflare;
    this.object3D.position.set(0, 0, 100);
  }

  update(time: number) {}
}
