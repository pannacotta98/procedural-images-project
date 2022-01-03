import type { DeepPartial } from './util';
import { merge } from 'lodash';

const defaultConfig = {
  terrain: {
    offsetScale: 0.3,
    numOctaves: 8,
    lacunarity: 2.0,
    persistance: 0.5,
    baseFreq: 1.2,
    exponent: 3.0,
    wireframe: false,
    absInvert: false,
  },
  atmosphere: {
    opacity: 0.2,
    wireframe: false,
    color: '#eeeeee',
  },
  clouds: {
    opacity: 1.0,
    height: 1.1,
  },
  water: {
    height: 1.035,
  },
  camera: {
    autoRotate: false,
  },
};

type Config = typeof defaultConfig;
type PartialConfig = DeepPartial<Config>;

export interface ConfigMetaValueType {
  label: string;
}
export class ConfigIntValMeta implements ConfigMetaValueType {
  constructor(public min: number, public max: number, public label: string) {}
}
export class ConfigFloatValMeta implements ConfigMetaValueType {
  constructor(public min: number, public max: number, public label: string) {}
}
export class ConfigBoolValMeta implements ConfigMetaValueType {
  constructor(public label: string) {}
}
export class ConfigColorValMeta implements ConfigMetaValueType {
  constructor(public label: string) {}
}
export type ConfigMetaData = {
  [Category in keyof Config]: {
    [Property in keyof Config[Category]]: Config[Category][Property] extends number
      ? ConfigIntValMeta | ConfigFloatValMeta
      : ConfigBoolValMeta;
  };
};
export const configMetaData: ConfigMetaData = {
  terrain: {
    offsetScale: new ConfigFloatValMeta(0.001, 1.0, 'Offset scale'),
    numOctaves: new ConfigIntValMeta(1, 10, 'Number of octaves'),
    lacunarity: new ConfigFloatValMeta(1.1, 3, 'Lacunarity'),
    persistance: new ConfigFloatValMeta(0.1, 0.7, 'Persistance'),
    baseFreq: new ConfigFloatValMeta(0.5, 4, 'Fundamental frequency'),
    exponent: new ConfigFloatValMeta(0.01, 5, 'Exponent'),
    wireframe: new ConfigBoolValMeta('Wireframe'),
    absInvert: new ConfigBoolValMeta('Abs invert'),
  },
  atmosphere: {
    wireframe: new ConfigBoolValMeta('Wireframe'),
    opacity: new ConfigFloatValMeta(0, 1, 'Opacity'),
    color: new ConfigColorValMeta('Color'),
  },
  clouds: {
    opacity: new ConfigFloatValMeta(0, 1, 'Opacity'),
    height: new ConfigFloatValMeta(0.9, 1.3, 'Height'),
  },
  water: {
    height: new ConfigFloatValMeta(0.98, 1.1, 'Height'),
  },
  camera: {
    autoRotate: new ConfigBoolValMeta('Auto-rotate'),
  },
};

function cloneConfig(config: PartialConfig) {
  // I think this hack should be enough for my configs
  return JSON.parse(JSON.stringify(config));
}

export let activeConfig: Config = cloneConfig(defaultConfig);

export function loadPreset(preset: PartialConfig) {
  // If something is missing, use the default
  activeConfig = merge(cloneConfig(defaultConfig), cloneConfig(preset));
}

// ==== The presets ====
export const presets = new Map<string, PartialConfig>();

presets.set('Default', defaultConfig);

presets.set('Water debug', {
  terrain: {
    offsetScale: 0.0,
    numOctaves: 1,
    wireframe: false,
  },
  atmosphere: {
    wireframe: false,
    opacity: 0,
  },
  clouds: {
    opacity: 0.0,
  },
});

presets.set('No clouds or atmosphere', {
  atmosphere: {
    opacity: 0,
  },
  clouds: {
    opacity: 0.0,
  },
});
