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

export { getIntegerRandom, getFloatRandom, getRandomArrayElement, getRandomArray };
