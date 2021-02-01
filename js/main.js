const returnIntegerRandom = (min, max) => {
  if (min > max || min <= 0 || max <= 0) {
    return;
  }
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const returnFloatRandom = (min, max, simbolsAfterComma = 2) => {
  if (min > max || min <= 0 || max <=0) {
    return;
  }
  let rand = min + Math.random() * (max - min);
  return +rand.toFixed(simbolsAfterComma);
}
