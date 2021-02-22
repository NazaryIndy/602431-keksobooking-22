const MinPrices = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
};
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

const form = document.querySelector('.ad-form');
const typeOfHousingInput = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const timeInInput = form.querySelector('#timein');
const timeOutInput = form.querySelector('#timeout');
const titleInput = form.querySelector('#title');
const roomNumberInput = form.querySelector('#room_number');
const capacityInput = form.querySelector('#capacity');
const options = capacityInput.querySelectorAll('option');

priceInput.addEventListener('change', () => {
  const valueLength = priceInput.value

  if (valueLength > MAX_PRICE) {
    priceInput.setCustomValidity('Значение должно быть меньше или равно 1000000');
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) +' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) +' симв.');
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

typeOfHousingInput.addEventListener('change', (evt) => {
  priceInput.placeholder = priceInput.min = MinPrices[evt.target.value.toUpperCase()];
});

timeInInput.addEventListener('change', (evt) => {
  timeOutInput.value = evt.target.value;
});

timeOutInput.addEventListener('change', (evt) => {
  timeInInput.value = evt.target.value;
});

capacityInput.addEventListener('change', (evt) => {
  if (evt.target.value === '1' && (roomNumberInput.value !== '1' && roomNumberInput.value !== '2' && roomNumberInput.value !== '3')) {
    capacityInput.setCustomValidity('1 комната для 1 гостя');
  } else if (evt.target.value === '2' && (roomNumberInput.value !== '2' && roomNumberInput.value !== '3')) {
    capacityInput.setCustomValidity('Для 2-х гостей нужно выбрать 2 или 3 комнаты');
  } else if (evt.target.value === '3' && roomNumberInput.value !== '3') {
    capacityInput.setCustomValidity('Для 3-х гостей нужно выбрать 3 комнаты');
  } else if  (evt.target.value === '0' && roomNumberInput.value !== '100') {
    capacityInput.setCustomValidity('Не для гостей можно выбрать 100 комнат');
  } else {
    capacityInput.setCustomValidity('');
  }
  capacityInput.reportValidity();
});

roomNumberInput.addEventListener('change', (evt) => {
  if (evt.target.value === '1' && capacityInput.value !== '1') {
    capacityInput.setCustomValidity('1 комната для 1 гостя');
  } else if (evt.target.value === '2' && capacityInput.value !== '1' && capacityInput.value !== '2') {
    capacityInput.setCustomValidity('Можно выбрать 1 или 2 гостя');
  } else if (evt.target.value === '3' && capacityInput.value !== '1' && capacityInput.value !== '2' && capacityInput.value !== '3') {
    capacityInput.setCustomValidity('Можно выбрать 1, 2 или 3 гостя');
  } else if  (evt.target.value === '100' && capacityInput.value !== '0') {
    capacityInput.setCustomValidity('100 комнат не для гостей');
  } else {
    capacityInput.setCustomValidity('');
  }
  capacityInput.reportValidity();
});

roomNumberInput.addEventListener('input', (evt) => {
  if (evt.target.value === '1') {
    for (let option of options) {
      if (option.value !== '1') {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    }
  } else if (evt.target.value === '2') {
    for (let option of options) {
      if (option.value !== '1' && option.value !== '2') {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    }
  } else if (evt.target.value === '3') {
    for (let option of options) {
      if (option.value !== '1' && option.value !== '2' && option.value !== '3') {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    }
  } else if (evt.target.value === '100') {
    for (let option of options) {
      if (option.value !== '0') {
        option.disabled = true;
      } else {
        option.disabled = true;
      }
    }
  }
});
