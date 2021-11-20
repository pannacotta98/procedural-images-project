interface SliderParameters {
  parentId: string;
  value: number;
  label: string;
  min: number;
  max: number;
  onChange: (newValue: number) => void;
}

export function addSlider({
  parentId,
  value,
  label,
  min,
  max,
  onChange,
}: SliderParameters) {
  const htmlToAdd = `<p>${label}</p>
  <input
    type="range"
    min="${min}"
    max="${max}"
    step="${(max - min) / 100}"
    value="${value}"
    class="slider"
    id="${label}"
  />`;
  const parent = document.getElementById(parentId);
  parent?.insertAdjacentHTML('afterend', htmlToAdd);

  document.getElementById(label)?.addEventListener('input', (event) => {
    const element = event.target as HTMLInputElement;
    onChange(+element.value);
    //console.log(variableToBind);
  });
}
