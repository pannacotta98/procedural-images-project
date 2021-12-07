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
  const htmlToAdd = `<p>${label}</p>
  <input
    type="range"
    min="${min}"
    max="${max}"
    step="${isDiscrete ? 1 : (max - min) / 100}"
    value="${value}"
    class="slider"
    id="${label}"
  />`;
  const parent = document.getElementById(parentId);
  parent?.insertAdjacentHTML('beforeend', htmlToAdd);

  document.getElementById(label)?.addEventListener('input', (event) => {
    const element = event.target as HTMLInputElement;
    onChange(+element.value);
  });
}
