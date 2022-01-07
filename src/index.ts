import { Sky } from './sky/Sky';
import { Application } from './Application';
import { Terrain } from './terrain/Terrain';
import { Water } from './water/Water';
import { GUI } from './gui';
import { Clouds } from './clouds/Clouds';
import { Atmosphere } from './atmosphere/Atmosphere';
import { Sun } from './sun/Sun';
import {
  activeConfig,
  configAsJSON,
  presets,
  loadPreset,
  hiddenPresets,
} from './config';

// So i can use in iframes in presentation
// and to help when developing
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const presetStr = urlParams.get('preset');
if (presetStr) {
  const preset = presets.get(presetStr) || hiddenPresets.get(presetStr);
  if (preset) loadPreset(preset);
}
if (urlParams.has('nogui')) {
  (
    document.getElementById('side-panel-container') as HTMLElement
  ).style.display = 'none';
  activeConfig.camera.autoRotate = true;
}

const sky = new Sky();
const terrain = new Terrain();
const water = new Water();
const clouds = new Clouds();
const atmosphere = new Atmosphere();
const sun = new Sun();

const application = new Application();
application.addSceneObject(sky);
application.addSceneObject(terrain);
application.addSceneObject(water);
application.addSceneObject(clouds);
application.addSceneObject(atmosphere);
application.addSceneObject(sun);
application.start();

new GUI();

// Just as a convenience for me
(window as any).configAsJSON = configAsJSON;

// Hide scrolling reminder if at bottom
const sidePanel = document.getElementById('side-panel-container')!;
sidePanel.onscroll = () => {
  const scrollReminder = document.getElementById('scroll-reminder')!;
  const isAtBottom =
    sidePanel.scrollTop === sidePanel.scrollHeight - sidePanel.clientHeight;
  scrollReminder.style.opacity = isAtBottom ? '0' : '1';
};

// Remove loading screen
(
  document.getElementsByClassName('loading-screen')[0] as HTMLElement
).style.opacity = '0';
