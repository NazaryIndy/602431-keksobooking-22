const returnIntegerRandom = (min, max) => {
  if (min > max || min < 0 || max <= 0) {
    return;
  }
  return Math.floor(min + Math.random() * (max + 1 - min));
}

const returnFloatRandom = (min, max, simbolsAfterComma = 2) => {
  if (min > max || min < 0 || max <= 0) {
    return;
  }
  let rand = min + Math.random() * (max - min);
  return +rand.toFixed(simbolsAfterComma);
}

returnIntegerRandom(1, 3);
returnFloatRandom(1, 3, 3);
