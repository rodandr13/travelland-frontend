export const getScaleStyle = (
  index: number,
  currentIndex: number,
  imagesLength: number
) => {
  let scale = 0.66; // Базовое значение масштаба

  const isStart = currentIndex < 3;
  const isEnd = currentIndex >= imagesLength - 3;
  const distanceFromCurrent = Math.abs(currentIndex - index);

  if (isStart) {
    if (index <= 2) scale = 1;
    else if (index === 3) scale = 0.83;
  } else if (isEnd) {
    if (imagesLength - index <= 3)
      scale = 1; // Последние 3 элемента
    else if (imagesLength - index <= 5 && imagesLength - index > 3)
      scale = 0.83; // Предпоследние 2 перед последними тремя
  } else {
    // Средние индексы массива
    if (distanceFromCurrent <= 1) scale = 1;
    else if (distanceFromCurrent === 2) scale = 0.83;
  }

  return { transform: `scale(${scale})` };
};
