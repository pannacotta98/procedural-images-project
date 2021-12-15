import { activeConfig } from './config';

interface SliderParameters {
  parentId: string;
  value: number;
  label: string;
  min: number;
  max: number;
  onChange: (newValue: number) => void;
  isDiscrete?: boolean;
}

export function addSlider({
  parentId,
  value,
  label,
  min,
  max,
  onChange,
  isDiscrete = false,
}: SliderParameters) {
  const htmlToAdd = `<div>
    <p>${label}</p>
    <input
      type="range"
      min="${min}"
      max="${max}"
      step="${isDiscrete ? 1 : (max - min) / 100}"
      value="${value}"
      class="slider"
      id="${label}"
    />
  </div>
  `;
  const parent = document.getElementById(parentId);
  parent?.insertAdjacentHTML('beforeend', htmlToAdd);

  document.getElementById(label)?.addEventListener('input', (event) => {
    const element = event.target as HTMLInputElement;
    onChange(+element.value);
  });
}

interface SwitchParameters {
  parentId: string;
  value: boolean;
  label: string;
  onChange: (newValue: boolean) => void;
}

export function addSwitch({
  parentId,
  value,
  label,
  onChange,
}: SwitchParameters) {
  const htmlToAdd = `<div>
    <input
      type="checkbox"
      checked="${value}"
      class="switch"
      id="${label}"
    />
    <label for="${label}" >${label}</label>
  </div>
  `;
  const parent = document.getElementById(parentId);
  parent?.insertAdjacentHTML('beforeend', htmlToAdd);

  document.getElementById(label)?.addEventListener('input', (event) => {
    const element = event.target as HTMLInputElement;
    onChange(element.checked);
  });
}
