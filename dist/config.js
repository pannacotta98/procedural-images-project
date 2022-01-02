import {merge} from "../_snowpack/pkg/lodash.js";
const defaultConfig = {
  terrain: {
    offsetScale: 0.04,
    numOctaves: 8,
    baseFreq: 1.2,
    useExponentiation: true,
    wireframe: false
  },
  atmosphere: {
    opacity: 0.2,
    wireframe: false,
    color: "#eeeeee"
  },
  clouds: {
    opacity: 1
  }
};
export class ConfigIntValMeta {
  constructor(min, max, label) {
    this.min = min;
    this.max = max;
    this.label = label;
  }
}
export class ConfigFloatValMeta {
  constructor(min, max, label) {
    this.min = min;
    this.max = max;
    this.label = label;
  }
}
export class ConfigBoolValMeta {
  constructor(label) {
    this.label = label;
  }
}
export class ConfigColorValMeta {
  constructor(label) {
    this.label = label;
  }
}
export const configMetaData = {
  terrain: {
    offsetScale: new ConfigFloatValMeta(1e-3, 0.3, "Offset scale"),
    numOctaves: new ConfigIntValMeta(1, 10, "Number of octaves"),
    baseFreq: new ConfigFloatValMeta(0.5, 4, "Fundamental frequency"),
    useExponentiation: new ConfigBoolValMeta("Use exponentiation"),
    wireframe: new ConfigBoolValMeta("Wireframe")
  },
  atmosphere: {
    wireframe: new ConfigBoolValMeta("Wireframe"),
    opacity: new ConfigFloatValMeta(0, 1, "Opacity"),
    color: new ConfigColorValMeta("Color")
  },
  clouds: {
    opacity: new ConfigFloatValMeta(0, 1, "Opacity")
  }
};
function cloneConfig(config) {
  return JSON.parse(JSON.stringify(config));
}
export let activeConfig = cloneConfig(defaultConfig);
export function loadPreset(preset) {
  activeConfig = merge(cloneConfig(defaultConfig), cloneConfig(preset));
}
export const presets = new Map();
presets.set("Default", defaultConfig);
presets.set("Water debug", {
  terrain: {
    offsetScale: 0,
    numOctaves: 1,
    useExponentiation: true,
    wireframe: false
  },
  atmosphere: {
    wireframe: false,
    opacity: 0
  },
  clouds: {
    opacity: 0
  }
});
presets.set("No clouds or atmosphere", {
  atmosphere: {
    opacity: 0
  },
  clouds: {
    opacity: 0
  }
});
