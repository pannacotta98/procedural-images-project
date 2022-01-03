import {
  Clock,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from "../_snowpack/pkg/three.js";
import {OrbitControls} from "../_snowpack/pkg/three/examples/jsm/controls/OrbitControls.js";
import {activeConfig} from "./config.js";
export class Application {
  constructor() {
    this.objects = [];
    this.animate = () => {
      this.controls.autoRotate = activeConfig.camera.autoRotate;
      this.controls.update();
      for (const obj of this.objects) {
        obj.update(this.clock.getElapsedTime());
      }
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    };
    this.onWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    this.scene = new Scene();
    const directionalLight = new DirectionalLight(16777215, 1);
    directionalLight.position.set(0, 0, 1);
    this.scene.add(directionalLight);
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1e3);
    this.renderer = new WebGLRenderer({antialias: true, alpha: true});
    this.renderer.physicallyCorrectLights = true;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.clock = new Clock();
    window.addEventListener("resize", this.onWindowResize);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotateSpeed = 0.4;
    this.controls.enableDamping = true;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 10;
    this.camera.position.z = 3;
    this.controls.update();
  }
  addSceneObject(obj) {
    this.objects.push(obj);
    this.scene.add(obj.object3D);
  }
  start() {
    this.clock.start();
    this.animate();
  }
}
