import type { DeepPartial } from './util';
import { merge } from 'lodash';

const defaultConfig = {
  terrain: {
    offsetScale: 0.22,
    numOctaves: 8,
    lacunarity: 2.0,
    persistance: 0.5,
    baseFreq: 1.2,
    exponent: 3.0,
    wireframe: false,
    absInvert: false,
    snowColor: '#ffffff',
    mountainColor: '#808080',
    landColor: '#94C245',
    sandColor: '#ECECAB',
  },
  atmosphere: {
    opacity: 0.5,
    fresnel: 3,
    wireframe: false,
    color: '#1f75ff',
  },
  clouds: {
    amount: 0.5,
    opacity: 1.0,
    height: 1.1,
    smoothness: 0.5,
    warp: 0.13,
    color: '#ffffff',
  },
  water: {
    height: 1.035,
    wavesIntensity: 0.002,
    wavesSize: 120,
    wavesSpeed: 3,
    opacity: 0.7,
    color: '#318FD7',
    useFresnel: true,
    useTrochoidalWaves: false,
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
    persistance: new ConfigFloatValMeta(0.1, 0.7, 'Persistence'),
    baseFreq: new ConfigFloatValMeta(0.5, 4, 'Fundamental frequency'),
    exponent: new ConfigFloatValMeta(0.01, 5, 'Exponent'),
    wireframe: new ConfigBoolValMeta('Wireframe'),
    absInvert: new ConfigBoolValMeta('Ridge mode'),
    snowColor: new ConfigColorValMeta('Snow color'),
    mountainColor: new ConfigColorValMeta('Mountains color'),
    landColor: new ConfigColorValMeta('Land color'),
    sandColor: new ConfigColorValMeta('Sand color'),
  },
  atmosphere: {
    wireframe: new ConfigBoolValMeta('Wireframe'),
    opacity: new ConfigFloatValMeta(0, 1, 'Opacity'),
    fresnel: new ConfigFloatValMeta(0, 10, 'Fresnel'),
    color: new ConfigColorValMeta('Color'),
  },
  clouds: {
    opacity: new ConfigFloatValMeta(0, 1, 'Opacity'),
    amount: new ConfigFloatValMeta(0, 1, 'Amount'),
    height: new ConfigFloatValMeta(0.9, 1.3, 'Height'),
    smoothness: new ConfigFloatValMeta(0, 1, 'Smoothness'),
    warp: new ConfigFloatValMeta(0.0, 1.0, 'Warp'),
    color: new ConfigColorValMeta('Color'),
  },
  water: {
    height: new ConfigFloatValMeta(0.98, 1.1, 'Water level'),
    wavesIntensity: new ConfigFloatValMeta(0, 0.004, 'Wave height'),
    wavesSize: new ConfigFloatValMeta(30, 400, 'Wave scale'),
    wavesSpeed: new ConfigFloatValMeta(0.0, 10, 'Wave speed'),
    opacity: new ConfigFloatValMeta(0, 1, 'Opacity'),
    color: new ConfigColorValMeta('Color'),
    useFresnel: new ConfigBoolValMeta('Use Fresnel'),
    useTrochoidalWaves: new ConfigBoolValMeta('Trochoidal waves'),
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

export function configAsJSON() {
  return JSON.stringify(activeConfig);
}

// ==== The presets ====
export const presets = new Map<string, PartialConfig>();

presets.set('Default', defaultConfig);

// presets.set('Water debug', {
//   terrain: { offsetScale: 0.0, numOctaves: 1, wireframe: false },
//   atmosphere: { wireframe: false, opacity: 0 },
//   clouds: { opacity: 0.0 },
// });

// presets.set('No clouds or atmosphere', {
//   atmosphere: { opacity: 0 },
//   clouds: { opacity: 0.0 },
// });

presets.set('Blurtarius', {
  terrain: {
    offsetScale: 0.18082,
    numOctaves: 8,
    lacunarity: 1.746,
    persistance: 0.5,
    baseFreq: 1.2,
    exponent: 2.3553,
    wireframe: false,
    absInvert: false,
    snowColor: '#ffffff',
    mountainColor: '#808080',
    landColor: '#94C245',
    sandColor: '#ffff00',
  },
  atmosphere: { opacity: 1, fresnel: 4.3, wireframe: false, color: '#99ff00' },
  clouds: {
    amount: 0.6,
    opacity: 0.56,
    height: 1.148,
    smoothness: 0.46,
    warp: 0,
  },
  water: {
    height: 1.0352,
    wavesIntensity: 0.002,
    wavesSize: 120,
    wavesSpeed: 4.4,
    opacity: 0.7,
    color: '#ff00ea',
    useFresnel: true,
    useTrochoidalWaves: false,
  },
  camera: { autoRotate: false },
});

presets.set('Iceland', {
  terrain: {
    offsetScale: 0.24076,
    numOctaves: 6,
    lacunarity: 1.993,
    persistance: 0.406,
    baseFreq: 1.2,
    exponent: 2.9042,
    wireframe: false,
    absInvert: false,
    snowColor: '#ffffff',
    mountainColor: '#ffffff',
    landColor: '#ffffff',
    sandColor: '#ffffff',
  },
  atmosphere: { opacity: 1, fresnel: 4.6, wireframe: false, color: '#5c9aff' },
  clouds: {
    amount: 0.48,
    opacity: 0.32,
    height: 1.124,
    smoothness: 0.51,
    warp: 0.13,
  },
  water: {
    height: 1.035,
    wavesIntensity: 0.002,
    wavesSize: 115.1,
    wavesSpeed: 1.8,
    opacity: 0.7,
    color: '#318FD7',
    useFresnel: true,
    useTrochoidalWaves: false,
  },
  camera: { autoRotate: false },
});

presets.set('Bumling 4', {
  terrain: {
    offsetScale: 0.15085,
    numOctaves: 9,
    lacunarity: 1.898,
    persistance: 0.418,
    baseFreq: 0.675,
    exponent: 1.2076,
    wireframe: false,
    absInvert: true,
    snowColor: '#949494',
    mountainColor: '#828282',
    landColor: '#7d7d7d',
    sandColor: '#ECECAB',
  },
  atmosphere: { opacity: 0, fresnel: 0, wireframe: false, color: '#1f75ff' },
  clouds: { amount: 1, opacity: 1, height: 0.9, smoothness: 0.5, warp: 0.13 },
  water: {
    height: 0.98,
    wavesIntensity: 0.002,
    wavesSize: 120,
    wavesSpeed: 3,
    opacity: 0.7,
    color: '#318FD7',
    useFresnel: true,
    useTrochoidalWaves: false,
  },
  camera: { autoRotate: false },
});

presets.set('Larvia', {
  terrain: {
    offsetScale: 0.44056,
    numOctaves: 1,
    lacunarity: 1.841,
    persistance: 0.352,
    baseFreq: 1.165,
    exponent: 5,
    wireframe: false,
    absInvert: false,
    snowColor: '#ffffff',
    mountainColor: '#ffffff',
    landColor: '#94C245',
    sandColor: '#ff3300',
  },
  atmosphere: { opacity: 0, fresnel: 6.5, wireframe: false, color: '#ffffff' },
  clouds: { amount: 0, opacity: 0, height: 1.012, smoothness: 0.5, warp: 0.13 },
  water: {
    height: 1.035,
    wavesIntensity: 0.002,
    wavesSize: 120,
    wavesSpeed: 3,
    opacity: 0.67,
    color: '#ff5900',
    useFresnel: false,
    useTrochoidalWaves: true,
  },
  camera: { autoRotate: false },
});

presets.set('Zerp 3—8', {
  terrain: {
    offsetScale: 0.11089,
    numOctaves: 8,
    lacunarity: 1.974,
    persistance: 0.46,
    baseFreq: 0.78,
    exponent: 3,
    wireframe: false,
    absInvert: true,
    snowColor: '#bd0000',
    mountainColor: '#940000',
    landColor: '#660000',
    sandColor: '#15d153',
  },
  atmosphere: { opacity: 0, fresnel: 0.6, wireframe: false, color: '#ff0000' },
  clouds: {
    amount: 0.98,
    opacity: 0.67,
    height: 1.04,
    smoothness: 0.5,
    warp: 0.65,
  },
  water: {
    height: 1.035,
    wavesIntensity: 0.00208,
    wavesSize: 120,
    wavesSpeed: 5.4,
    opacity: 0.8,
    color: '#35d733',
    useFresnel: true,
    useTrochoidalWaves: false,
  },
  camera: { autoRotate: false },
});

presets.set('Tinia', {
  terrain: {
    offsetScale: 0.53047,
    numOctaves: 10,
    lacunarity: 2.373,
    persistance: 0.508,
    baseFreq: 1.305,
    exponent: 4.501,
    wireframe: false,
    absInvert: false,
    snowColor: '#5c91b2',
    mountainColor: '#36679b',
    landColor: '#48562e',
    sandColor: '#c3c34b',
  },
  atmosphere: {
    opacity: 0.5,
    fresnel: 4.4,
    wireframe: false,
    color: '#262108',
  },
  clouds: {
    amount: 0.61,
    opacity: 1,
    height: 1.076,
    smoothness: 0.22,
    warp: 0.17,
  },
  water: {
    height: 1.0316,
    wavesIntensity: 0.00164,
    wavesSize: 174.3,
    wavesSpeed: 5.4,
    opacity: 0.8,
    color: '#836234',
    useFresnel: true,
    useTrochoidalWaves: false,
  },
  camera: { autoRotate: false },
});

presets.set('Bo:ld 3', {
  terrain: {
    offsetScale: 0.31069,
    numOctaves: 10,
    lacunarity: 1.1,
    persistance: 0.1,
    baseFreq: 3.685,
    exponent: 3.1038,
    wireframe: false,
    absInvert: false,
    snowColor: '#990000',
    mountainColor: '#ffffff',
    landColor: '#972020',
    sandColor: '#ffffff',
  },
  atmosphere: { opacity: 1, fresnel: 10, wireframe: false, color: '#ffffff' },
  clouds: {
    amount: 0.79,
    opacity: 0,
    height: 1.056,
    smoothness: 0.5,
    warp: 0.56,
  },
  water: {
    height: 1.035,
    wavesIntensity: 0.004,
    wavesSize: 30,
    wavesSpeed: 10,
    opacity: 0.61,
    color: '#fff700',
    useFresnel: true,
    useTrochoidalWaves: true,
  },
  camera: { autoRotate: false },
});

// ==== My somewhat secret presets ====
export const hiddenPresets = new Map<string, PartialConfig>();

hiddenPresets.set('ridge-test-1', {
  terrain: {
    offsetScale: 0.3,
    numOctaves: 8,
    lacunarity: 1.48,
    persistance: 0.418,
    baseFreq: 1.2,
    exponent: 3,
    wireframe: false,
    absInvert: true,
    snowColor: '#ffffff',
    mountainColor: '#808080',
    landColor: '#94C245',
    sandColor: '#ECECAB',
  },
  atmosphere: { opacity: 0.5, fresnel: 3, wireframe: false, color: '#1f75ff' },
  clouds: { amount: 0.5, opacity: 1, height: 1.1, smoothness: 0.5, warp: 0.13 },
  water: {
    height: 1.035,
    wavesIntensity: 0.002,
    wavesSize: 120,
    wavesSpeed: 3,
    opacity: 0.7,
    color: '#318FD7',
    useFresnel: true,
    useTrochoidalWaves: false,
  },
  camera: { autoRotate: false },
});

hiddenPresets.set('presentation-terrain-no-exp', {
  terrain: {
    offsetScale: 0.56044,
    numOctaves: 8,
    lacunarity: 2,
    persistance: 0.5,
    baseFreq: 1.2,
    exponent: 1.0,
    wireframe: false,
    absInvert: false,
    snowColor: '#ffffff',
    mountainColor: '#ffffff',
    landColor: '#ffffff',
    sandColor: '#ffffff',
  },
  atmosphere: { opacity: 0, fresnel: 0, wireframe: false, color: '#1f75ff' },
  clouds: {
    amount: 0,
    opacity: 1,
    height: 1.1,
    smoothness: 0.5,
    warp: 0.13,
    color: '#ffffff',
  },
  water: {
    height: 0.98,
    wavesIntensity: 0.002,
    wavesSize: 120,
    wavesSpeed: 3,
    opacity: 0.7,
    color: '#318FD7',
    useFresnel: true,
    useTrochoidalWaves: false,
  },
  camera: { autoRotate: true },
});

hiddenPresets.set('presentation-troch-waves-big', {
  terrain: {
    offsetScale: 0.001,
    numOctaves: 8,
    lacunarity: 2,
    persistance: 0.5,
    baseFreq: 1.2,
    exponent: 3,
    wireframe: false,
    absInvert: false,
    snowColor: '#ffffff',
    mountainColor: '#808080',
    landColor: '#94C245',
    sandColor: '#ECECAB',
  },
  atmosphere: { opacity: 0, fresnel: 3, wireframe: false, color: '#1f75ff' },
  clouds: {
    amount: 0,
    opacity: 0,
    height: 1.1,
    smoothness: 0.5,
    warp: 0.13,
    color: '#ffffff',
  },
  water: {
    height: 1.04,
    wavesIntensity: 0.002,
    wavesSize: 129.9,
    wavesSpeed: 3,
    opacity: 0.7,
    color: '#318FD7',
    useFresnel: true,
    useTrochoidalWaves: true,
  },
  camera: { autoRotate: false },
});

hiddenPresets.set('presentation-troch-waves-with-land', {
  terrain: {
    offsetScale: 0.26074,
    numOctaves: 8,
    lacunarity: 2,
    persistance: 0.442,
    baseFreq: 1.2,
    exponent: 3,
    wireframe: false,
    absInvert: false,
    snowColor: '#ffffff',
    mountainColor: '#808080',
    landColor: '#94C245',
    sandColor: '#ECECAB',
  },
  atmosphere: { opacity: 0, fresnel: 3, wireframe: false, color: '#1f75ff' },
  clouds: {
    amount: 0,
    opacity: 0,
    height: 1.1,
    smoothness: 0.5,
    warp: 0.13,
    color: '#ffffff',
  },
  water: {
    height: 1.04,
    wavesIntensity: 0.002,
    wavesSize: 129.9,
    wavesSpeed: 3,
    opacity: 0.7,
    color: '#318FD7',
    useFresnel: true,
    useTrochoidalWaves: true,
  },
  camera: { autoRotate: false },
});

hiddenPresets.set('presentation-calm-waves', {
  terrain: {
    offsetScale: 0.22,
    numOctaves: 8,
    lacunarity: 2,
    persistance: 0.5,
    baseFreq: 1.2,
    exponent: 3,
    wireframe: false,
    absInvert: false,
    snowColor: '#ffffff',
    mountainColor: '#808080',
    landColor: '#94C245',
    sandColor: '#ECECAB',
  },
  atmosphere: { opacity: 0, fresnel: 0, wireframe: false, color: '#1f75ff' },
  clouds: {
    amount: 0,
    opacity: 0,
    height: 1.1,
    smoothness: 0.5,
    warp: 0.13,
    color: '#ffffff',
  },
  water: {
    height: 1.035,
    wavesIntensity: 0.002,
    wavesSize: 120,
    wavesSpeed: 3,
    opacity: 0.7,
    color: '#318FD7',
    useFresnel: true,
    useTrochoidalWaves: false,
  },
  camera: { autoRotate: false },
});

hiddenPresets.set('presentation-clouds', {
  atmosphere: { opacity: 0 },
});
