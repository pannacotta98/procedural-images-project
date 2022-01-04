import { Sky } from './sky/Sky';
import { Application } from './Application';
import { Terrain } from './terrain/Terrain';
import { Water } from './water/Water';
import { GUI } from './gui';
import { Clouds } from './clouds/Clouds';
import { Atmosphere } from './atmosphere/Atmosphere';
import { Sun } from './sun/Sun';
import { activeConfig, configAsJSON, presets, loadPreset } from './config';

// Could this font be nice maybe?
// https://www.behance.net/gallery/33704618/ANURATI-Free-font
// https://www.behance.net/gallery/56035831/Alexana-Neue-Free-Font
// https://www.behance.net/gallery/36169711/Exan-3-Free-Font
// https://www.dafont.com/rezland.font
// Equinox – Minimal Display Font
// Maybe I'll get some cute font instead depending on the look of
// the planet.

// So i can use in iframes in presentation
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.has('nogui')) {
  (
    document.getElementById('side-panel-container') as HTMLElement
  ).style.opacity = '0';
  activeConfig.camera.autoRotate = true;

  const presetStr = urlParams.get('preset');
  if (presetStr) {
    const preset = presets.get(presetStr);
    if (preset) loadPreset(preset);
  }
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

(
  document.getElementsByClassName('loading-screen')[0] as HTMLElement
).style.opacity = '0';

new GUI();

// Just as a convenience for me
(window as any).configAsJSON = configAsJSON;
