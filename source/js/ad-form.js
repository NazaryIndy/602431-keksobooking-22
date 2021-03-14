import { disableForm } from './util.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const MinPrices = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
};
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';

const adForm = document.querySelector('.ad-form');
const addressInput = adForm.querySelector('#address');
const typeOfHousingInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeInInput = adForm.querySelector('#timein');
const timeOutInput = adForm.querySelector('#timeout');
const titleInput = adForm.querySelector('#title');
const roomNumberInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');
const options = capacityInput.querySelectorAll('option');

const capacityToRoom = {
  1: { validValues: [1], message: '1 комната для 1 гостя' },
  2: { validValues: [1, 2], message: 'Можно выбрать 1 или 2 гостя' },
  3: { validValues:[1, 2, 3], message: 'Можно выбрать 1, 2 или 3 гостя' },
  100: { validValues: [100], message: '100 комнат не для гостей' },
};

const roomToCapacity = {
  1: { validValues: [1, 2, 3], message: '1 комната для 1 гостя' },
  2: { validValues: [2, 3], message: 'Для 2-х гостей нужно выбрать 2 или 3 комнаты' },
  3: { validValues:[3], message: 'Для 3-х гостей нужно выбрать 3 комнаты' },
  0: { validValues: [100], message: 'Не для гостей можно выбрать 100 комнат' },
};

const resetPhotos = () => {
  const avatarPreview = document.querySelector('.ad-form-header__preview img');
  const photoPreview = document.querySelector('.ad-form__photo');
  photoPreview.innerHTML = '';
  avatarPreview.src = DEFAULT_AVATAR_URL;
};

const resetPriceInput = () => {
  const typeOfHousingInput = adForm.querySelector('#type');
  const priceInput = adForm.querySelector('#price');
  priceInput.placeholder = priceInput.min = MinPrices[typeOfHousingInput.value.toUpperCase()];
};

const resetAdForm = () => {
  resetPhotos();
  adForm.reset();
  resetPriceInput();
};

disableForm(adForm, 'ad-form');

priceInput.addEventListener('change', (evt) => {
  const price = evt.target.value;
  const minPrice = typeOfHousingInput.value.toUpperCase();

  if (price < MinPrices[minPrice]) {
    priceInput.setCustomValidity(`Минимальная цена за этот типа жилья ${MinPrices[minPrice]}`);
  } else if (price > MAX_PRICE) {
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
  const capacity = evt.target.value;
  const errorMessages = roomToCapacity[capacity];

  if (errorMessages && errorMessages.validValues.every(value => roomNumberInput.value !== value.toString())) {
    capacityInput.setCustomValidity(roomToCapacity[capacity].message);
  } else {
    capacityInput.setCustomValidity('');
  }

  capacityInput.reportValidity();
});

roomNumberInput.addEventListener('change', (evt) => {
  const roomNumber = evt.target.value;
  const errorMessages = capacityToRoom[roomNumber];

  if (errorMessages && errorMessages.validValues.every(value => capacityInput.value !== value.toString())) {
    capacityInput.setCustomValidity(capacityToRoom[roomNumber].message);
  } else {
    capacityInput.setCustomValidity('');
  }

  capacityInput.reportValidity();
});

roomNumberInput.addEventListener('input', (evt) => {
  if (evt.target.value === '1') {
    for (let option of options) {
      option.disabled = (option.value !== '1');
    }
  } else if (evt.target.value === '2') {
    for (let option of options) {
      option.disabled = (option.value !== '1' && option.value !== '2');
    }
  } else if (evt.target.value === '3') {
    for (let option of options) {
      option.disabled = (option.value !== '1' && option.value !== '2' && option.value !== '3');
    }
  } else if (evt.target.value === '100') {
    for (let option of options) {
      option.disabled = (option.value !== '0');
    }
  }
});

const setAdFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => showSuccessMessage(),
      () => showErrorMessage(),
      new FormData(evt.target),
    )
  });
};

const setAdFormReset = (resetForm) => {
  adForm.addEventListener('reset', resetForm);
};

export { setAdFormSubmit, setAdFormReset, resetAdForm, adForm, addressInput };
