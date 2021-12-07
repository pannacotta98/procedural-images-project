import { Sky } from './sky/Sky';
import { Application } from './Application';
import { Terrain } from './terrain/Terrain';
import { Water } from './water/Water';

// Could this font be nice maybe?
// https://www.behance.net/gallery/33704618/ANURATI-Free-font
// https://www.behance.net/gallery/56035831/Alexana-Neue-Free-Font
// https://www.behance.net/gallery/36169711/Exan-3-Free-Font
// https://www.dafont.com/rezland.font
// Equinox – Minimal Display Font
// Maybe I'll get some cute font instead depending on the look of
// the planet.

const sky = new Sky();
const terrain = new Terrain();
const water = new Water();

const application = new Application();
application.addSceneObject(sky);
application.addSceneObject(terrain);
application.addSceneObject(water);
application.start();
console.log('test');

//@ts-ignore
document.getElementsByClassName('loading-screen')[0].style.opacity = 0;
// document.getElementsByClassName('loading-screen')[0].style.display = 'none';

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
