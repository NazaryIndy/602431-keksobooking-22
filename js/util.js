const ALERT_SHOW_TIME = 5000;

const getIntegerRandom = (min, max) => {
  if (min > max || min < 0 || max <= 0) {
    return;
  }
  return Math.floor(min + Math.random() * (max + 1 - min));
}

const getFloatRandom = (min, max, simbolsAfterComma = 2) => {
  if (min > max || min < 0 || max <= 0) {
    return;
  }
  let rand = min + Math.random() * (max - min);
  return +rand.toFixed(simbolsAfterComma);
}

const getRandomArrayElement = (elements) => {
  return elements[getIntegerRandom(0, elements.length - 1)];
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getRandomArray = (array) => {
  const shuffledArray = shuffleArray(array);
  const size = getIntegerRandom(1, array.length);
  return shuffledArray.slice(0, size);
}

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export { getIntegerRandom, getFloatRandom, getRandomArrayElement, getRandomArray, showAlert, isEscEvent };
