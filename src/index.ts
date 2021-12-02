// // Option 1: Import the entire three.js core library.
import * as THREE from 'three';
import { defaultConfig } from './config';
import testFrag from './shaders/testFrag.glsl';
import testVert from './shaders/testVert.glsl';
import starsFrag from './shaders/starsFrag.glsl';
import starsVert from './shaders/starsVert.glsl';
import { addSlider } from './gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// // Option 2: Import just the parts you need.
// import { Scene } from 'three';
// const scene = new Scene();

// Could this font be nice maybe?
// https://www.behance.net/gallery/33704618/ANURATI-Free-font
// https://www.behance.net/gallery/56035831/Alexana-Neue-Free-Font
// https://www.behance.net/gallery/36169711/Exan-3-Free-Font
// https://www.dafont.com/rezland.font
// Equinox – Minimal Display Font
// Maybe I'll get some cute font instead depending on the look of
// the planet.

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

const material = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0.0 }, // TODO Fix time; now works but is it done correctly?
    resolution: { value: new THREE.Vector2() }, // TODO Also fix
  },
  vertexShader: testVert,
  fragmentShader: testFrag,
  // wireframe: true,
});

// const geometry = new THREE.SphereGeometry(1, 100, 100);
const geometry = new THREE.IcosahedronGeometry(1, 100);
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// NOTE Right cllick to pan
const controls = new OrbitControls(camera, renderer.domElement);
// controls.autoRotate = true;
controls.enableDamping = true;
controls.minDistance = 2;
controls.maxDistance = 10;
camera.position.z = 3;

controls.update();

// Staaaars
const sky = (function () {
  const geometry = new THREE.IcosahedronGeometry(30, 1);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0.0 }, // TODO Fix time; now works but is it done correctly?
      resolution: { value: new THREE.Vector2() }, // TODO Also fix
    },
    vertexShader: starsVert,
    fragmentShader: starsFrag,
    side: THREE.BackSide,
    // wireframe: true,
  });
  return new THREE.Mesh(geometry, material);
})();
scene.add(sky);

const animate = function (time?: number) {
  // NOTE Make sure to use time to calculate delta time if using time
  requestAnimationFrame(animate);
  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();
  material.uniforms.time.value = clock.getElapsedTime();
  renderer.render(scene, camera);
};

const clock = new THREE.Clock();
clock.start();
animate();

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
