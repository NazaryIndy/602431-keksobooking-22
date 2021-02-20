const form = document.querySelector('.ad-form');

const prices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const typeOfHousingElement = form.querySelector('#type');
const priceElement = form.querySelector('#price');
const timeInElement = form.querySelector('#timein');
const timeOutElement = form.querySelector('#timeout');

typeOfHousingElement.addEventListener('change', (evt) => {
  priceElement.placeholder = priceElement.min = prices[evt.target.value];
});

timeInElement.addEventListener('change', (evt) => {
  timeOutElement.value = evt.target.value;
});

timeOutElement.addEventListener('change', (evt) => {
  timeInElement.value = evt.target.value;
});
