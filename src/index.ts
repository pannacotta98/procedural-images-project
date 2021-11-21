// // Option 1: Import the entire three.js core library.
import * as THREE from 'three';
import { defaultConfig } from './config';
import testFrag from './shaders/testFrag.glsl';
import testVert from './shaders/testVert.glsl';
import { addSlider } from './gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// // Option 2: Import just the parts you need.
// import { Scene } from 'three';
// const scene = new Scene();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const material = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 1.0 }, // TODO Fix time
    resolution: { value: new THREE.Vector2() }, // TODO Also fix
  },
  vertexShader: testVert,
  fragmentShader: testFrag,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.enableDamping = true;
controls.minDistance = 1;
controls.maxDistance = 10;
camera.position.z = 5;

controls.update();

const animate = function (time?: number) {
  // TODO Make sure to use time to calculate delta time
  requestAnimationFrame(animate);

  // cube.rotation.x += defaultConfig.test.speed;
  // cube.rotation.y += defaultConfig.test.speed;

  // camera.zoom = defaultConfig.test.zoom;
  // camera.updateProjectionMatrix();

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
};

animate();

console.log(OrbitControls);
window.addEventListener('resize', onWindowResize);

// addSlider({
//   parentId: 'camera-setting',
//   value: defaultConfig.test.speed,
//   label: 'Testing speed',
//   min: 0,
//   max: 0.1,
//   onChange: (newVal) => (defaultConfig.test.speed = newVal),
// });

// addSlider({
//   parentId: 'camera-setting',
//   value: defaultConfig.test.zoom,
//   label: 'Zoom',
//   min: 0.5,
//   max: 5,
//   onChange: (newVal) => (defaultConfig.test.zoom = newVal),
// });

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// TODO
// How does frustum culling work?
