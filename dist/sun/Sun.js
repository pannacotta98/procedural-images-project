import {TextureLoader} from "../../_snowpack/pkg/three.js";
import {
  Lensflare,
  LensflareElement
} from "../../_snowpack/pkg/three/examples/jsm/objects/Lensflare.js";
export class Sun {
  constructor() {
    const textureLoader = new TextureLoader();
    const textureFlare0 = textureLoader.load("textures/lensflare0.png");
    const textureFlare1 = textureLoader.load("textures/lensflare2.png");
    const textureFlare2 = textureLoader.load("textures/lensflare3.png");
    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(textureFlare0, 512, 0));
    lensflare.addElement(new LensflareElement(textureFlare1, 512, 0));
    lensflare.addElement(new LensflareElement(textureFlare2, 60, 0.6));
    lensflare.addElement(new LensflareElement(textureFlare2, 60, 0.9));
    this.object3D = lensflare;
    this.object3D.position.set(0, 0, 100);
  }
  update(time) {
  }
}
