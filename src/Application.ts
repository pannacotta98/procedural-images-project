import {
  BoxGeometry,
  Clock,
  DirectionalLight,
  IcosahedronGeometry,
  LinearFilter,
  Mesh,
  PerspectiveCamera,
  RGBFormat,
  Scene,
  WebGLRenderer,
  WebGLRenderTarget,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { SSRrPass } from 'three/examples/jsm/postprocessing/SSRrPass';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import {
  MaskPass,
  ClearMaskPass,
} from 'three/examples/jsm/postprocessing/MaskPass';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader';
import type { SceneObject } from './SceneObject';
import { CustomMaskPass } from './postProcessing/CustomMaskPass';
import { Water } from './water/Water';

export class Application {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  clock: Clock;
  controls: OrbitControls;
  objects: SceneObject[] = [];
  composer: EffectComposer;
  tempSelectsSomething: any[]; // TODO TEMP
  renderTarget: WebGLRenderTarget;

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
    this.renderer.setClearColor(0x000050); // TODO Temp
    this.renderer.autoClear = false; // TODO ?

    this.tempSelectsSomething = [];
    this.renderTarget = new WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        minFilter: LinearFilter,
        magFilter: LinearFilter,
        format: RGBFormat,
        stencilBuffer: true,
      },
    );
    this.composer = new EffectComposer(this.renderer, this.renderTarget);
    const ssrrPass = new SSRrPass({
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
      width: window.innerWidth,
      height: window.innerHeight,
      selects: this.tempSelectsSomething,
    });

    const testScene = new Scene();
    const geometry = new IcosahedronGeometry(1.04, 100);
    const prutt = new Mesh(geometry);
    testScene.add(prutt);

    const renderPass = new RenderPass(this.scene, this.camera);
    renderPass.clear = false;

    const otherRenderPass = new RenderPass(testScene, this.camera);
    otherRenderPass.clear = false;

    // const box = new Mesh(new BoxGeometry(2, 2, 2));
    // testScene.add(box);

    const outputPass = new ShaderPass(CopyShader);
    outputPass.renderToScreen = false;

    this.composer.addPass(new ClearPass());
    this.composer.addPass(renderPass);
    // this.composer.addPass(new ClearMaskPass());
    // this.composer.addPass(new MaskPass(testScene, this.camera));
    // const customMaskPass = new CustomMaskPass(testScene, this.camera);
    // customMaskPass.inverse = true;
    // this.composer.addPass(customMaskPass);
    this.composer.addPass(otherRenderPass);
    // this.composer.addPass(new ClearMaskPass());
    this.composer.addPass(outputPass);

    // this.composer.addPass(ssrrPass);
    // this.composer.addPass(new ShaderPass(GammaCorrectionShader));

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
    requestAnimationFrame(this.animate);
    // Required if controls.enableDamping or controls.autoRotate are set to true
    this.controls.update();
    const time = this.clock.getElapsedTime();

    for (const obj of this.objects) {
      obj.update(time);
    }
    // this.renderer.render(this.scene, this.camera);
    this.composer.render();
  };

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);
  };
}
