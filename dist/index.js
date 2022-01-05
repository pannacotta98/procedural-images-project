import {Sky} from "./sky/Sky.js";
import {Application} from "./Application.js";
import {Terrain} from "./terrain/Terrain.js";
import {Water} from "./water/Water.js";
import {GUI} from "./gui.js";
import {Clouds} from "./clouds/Clouds.js";
import {Atmosphere} from "./atmosphere/Atmosphere.js";
import {Sun} from "./sun/Sun.js";
import {activeConfig, configAsJSON, presets, loadPreset} from "./config.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const presetStr = urlParams.get("preset");
if (presetStr) {
  const preset = presets.get(presetStr);
  if (preset)
    loadPreset(preset);
}
if (urlParams.has("nogui")) {
  document.getElementById("side-panel-container").style.display = "none";
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
window.configAsJSON = configAsJSON;
const sidePanel = document.getElementById("side-panel-container");
sidePanel.onscroll = () => {
  const scrollReminder = document.getElementById("scroll-reminder");
  const isAtBottom = sidePanel.scrollTop === sidePanel.scrollHeight - sidePanel.clientHeight;
  scrollReminder.style.opacity = isAtBottom ? "0" : "1";
};
document.getElementsByClassName("loading-screen")[0].style.opacity = "0";
