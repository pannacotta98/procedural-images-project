import {
  Clock,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import type { SceneObject } from './SceneObject';

export class Application {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  clock: Clock;
  controls: OrbitControls;
  objects: SceneObject[] = [];

  constructor() {
    this.scene = new Scene();

    const directionalLight = new DirectionalLight(0xffffff, 1);
    // directionalLight.position.set(0.7, 0.1, 0.5);
    directionalLight.position.set(0, 0, 1);
    this.scene.add(directionalLight);

    this.camera = new PerspectiveCamera(
      75, // fov
      window.innerWidth / window.innerHeight, // aspect
      0.1, // near
      1000, // far
    );

    this.renderer = new WebGLRenderer({ antialias: true });
    // Using physicallyCorrectLights to get unscaled values in shader
    // I don't really do anything physically based though, hehe
    this.renderer.physicallyCorrectLights = true;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.clock = new Clock();

    window.addEventListener('resize', this.onWindowResize);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.4;
    this.controls.enableDamping = true;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 10;
    this.camera.position.z = 3;
    this.controls.update();
  }

  addSceneObject(obj: SceneObject) {
    this.objects.push(obj);
    this.scene.add(obj.object3D);
  }

  start() {
    this.clock.start();
    this.animate();
  }

  // Arrow function to bind this so it can be invoked from requestAnimationFrame
  animate = () => {
    // Required if controls.enableDamping or controls.autoRotate are set to true
    this.controls.update();

    for (const obj of this.objects) {
      obj.update(this.clock.getElapsedTime());
    }
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.animate);
  };

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
}
