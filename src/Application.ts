import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
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

    this.camera = new PerspectiveCamera(
      75, // fov
      window.innerWidth / window.innerHeight, // aspect
      0.1, // near
      1000, // far
    );

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.clock = new Clock();

    window.addEventListener('resize', this.onWindowResize);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.4;
    this.controls.enableDamping = true;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 10;
    this.camera.position.z = 3;
    this.controls.update();
  }

  addSceneObject(obj: SceneObject) {
    this.scene.add(obj.object3D);
  }

  start() {
    this.clock.start();
    this.animate();
  }

  // Arrow function to bind this so it can be invoked from requestAnimationFrame
  animate = (time?: number) => {
    // NOTE Make sure to use time to calculate delta time if using time
    requestAnimationFrame(this.animate);
    // required if controls.enableDamping or controls.autoRotate are set to true
    this.controls.update();
    // this.material.uniforms.time.value = clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
  };

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
}
