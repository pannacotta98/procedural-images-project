import type { Color } from 'three';
import {
  activeConfig,
  ConfigBoolValMeta,
  ConfigColorValMeta,
  ConfigFloatValMeta,
  ConfigIntValMeta,
  configMetaData,
  ConfigMetaValueType,
  loadPreset,
  presets,
} from './config';

/**
 * Highly specific gui class for this particular project.
 * Kind of a mess in many ways.
 */
export class GUI {
  controls: Control[] = [];

  constructor() {
    this.initConfigToggles();
    this.initPresetList();
  }

  private initPresetList() {
    const containerId = 'preset-settings';
    const container = document.createElement('ul');
    document.getElementById(containerId)?.append(container);
    for (const [presetName, preset] of presets) {
      const li = document.createElement('li');
      li.textContent = presetName;
      li.className = 'preset-item';
      container?.append(li);

      li.addEventListener('click', (event) => {
        loadPreset(preset);
        this.updateControls();
      });
    }
  }

  private initConfigToggles() {
    for (const [categoryName, categoryValues] of Object.entries(activeConfig)) {
      const containerId = categoryName + '-settings';
      const container = document.getElementById(containerId);
      if (!container) {
        console.error('Cant find container', containerId);
        continue;
      }
      for (let [key, value] of Object.entries(categoryValues)) {
        // @ts-ignore cant be bothered to figure out the types for this rn
        const metaData: ConfigMetaValueType = configMetaData[categoryName][key];

        if (metaData instanceof ConfigBoolValMeta) {
          this.controls.push(
            new Switch(metaData, categoryName, key, container),
          );
        } else if (metaData instanceof ConfigColorValMeta) {
          this.controls.push(
            new ColorSelect(metaData, categoryName, key, container),
          );
        } else if (
          metaData instanceof ConfigFloatValMeta ||
          metaData instanceof ConfigIntValMeta
        ) {
          this.controls.push(
            new Slider(metaData, categoryName, key, container),
          );
        } else {
          console.error('No matching control');
        }
      }
    }
  }

  updateControls() {
    for (const c of this.controls) c.update();
  }
}

interface Control {
  update: () => void;
}

class Switch implements Control {
  inpEl: HTMLInputElement;
  prop: string;
  cat: string;

  constructor(
    meta: ConfigBoolValMeta,
    cat: string,
    prop: string,
    parentObj: HTMLElement,
  ) {
    this.cat = cat;
    this.prop = prop;
    const id = parentObj.id + '-' + prop;

    const container = document.createElement('div');
    parentObj.append(container);

    this.inpEl = document.createElement('input');
    this.inpEl.type = 'checkbox';
    this.inpEl.id = id;
    this.inpEl.className = 'switch';
    container.append(this.inpEl);

    const label = document.createElement('label');
    label.textContent = meta.label;
    label.htmlFor = id;
    container.append(label);

    this.update();

    this.inpEl.addEventListener('input', (event) => {
      // @ts-ignore
      activeConfig[this.cat][this.prop] = event.target.checked;
    });
  }

  update() {
    // @ts-ignore heheheh
    this.inpEl.checked = activeConfig[this.cat][this.prop];
  }
}

class Slider implements Control {
  inpEl: HTMLInputElement;
  prop: string;
  cat: string;

  constructor(
    meta: ConfigFloatValMeta | ConfigIntValMeta,
    cat: string,
    prop: string,
    parentObj: HTMLElement,
  ) {
    this.cat = cat;
    this.prop = prop;
    const id = parentObj.id + '-' + prop;

    const container = document.createElement('div');
    parentObj.append(container);

    const label = document.createElement('div');
    label.textContent = meta.label;
    container.append(label);

    this.inpEl = document.createElement('input');
    this.inpEl.type = 'range';
    this.inpEl.step = (
      meta instanceof ConfigIntValMeta ? 1 : (meta.max - meta.min) / 100
    ).toString();
    this.inpEl.min = meta.min.toString();
    this.inpEl.max = meta.max.toString();
    this.inpEl.id = id;
    this.inpEl.className = 'slider';
    container.append(this.inpEl);

    this.update();

    this.inpEl.addEventListener('input', (event) => {
      // @ts-ignore
      activeConfig[this.cat][this.prop] = +event.target.value;
    });
  }

  update() {
    // @ts-ignore heheheh
    this.inpEl.value = activeConfig[this.cat][this.prop];
  }
}

class ColorSelect implements Control {
  inpEl: HTMLInputElement;
  prop: string;
  cat: string;

  constructor(
    meta: ConfigColorValMeta,
    cat: string,
    prop: string,
    parentObj: HTMLElement,
  ) {
    this.cat = cat;
    this.prop = prop;
    const id = parentObj.id + '-' + prop;

    const container = document.createElement('div');
    parentObj.append(container);

    this.inpEl = document.createElement('input');
    this.inpEl.type = 'color';
    this.inpEl.id = id;
    this.inpEl.className = 'color-select';
    container.append(this.inpEl);

    const label = document.createElement('label');
    label.textContent = meta.label;
    label.htmlFor = id;
    container.append(label);

    this.update();

    this.inpEl.addEventListener('input', (event) => {
      // @ts-ignore
      activeConfig[this.cat][this.prop] = event.target.value;
    });
  }

  update() {
    // @ts-ignore heheheh
    this.inpEl.value = activeConfig[this.cat][this.prop];
  }
}
