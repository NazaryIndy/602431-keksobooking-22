const form = document.querySelector('.ad-form');

const MIN_PRICES = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const typeOfHousingElement = form.querySelector('#type');
const priceElement = form.querySelector('#price');
const timeInElement = form.querySelector('#timein');
const timeOutElement = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');


typeOfHousingElement.addEventListener('change', (evt) => {
  priceElement.placeholder = priceElement.min = MIN_PRICES[evt.target.value];
});

timeInElement.addEventListener('change', (evt) => {
  timeOutElement.value = evt.target.value;
});

timeOutElement.addEventListener('change', (evt) => {
  timeInElement.value = evt.target.value;
});


const options = capacity.querySelectorAll('option');

roomNumber.addEventListener('change', (evt) => {
  if (evt.target.value === '1') {
    capacity.value = evt.target.value;
    for (let option of options) {
      if (option.value !== '1') {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    }
  } else if (evt.target.value === '2') {
    capacity.value = evt.target.value;
    for (let option of options) {

      if (option.value !== '1' && option.value !== '2') {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    }
  } else if (evt.target.value === '3') {
    capacity.value = evt.target.value;
    for (let option of options) {
      if (option.value !== '1' && option.value !== '2' && option.value !== '3') {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    }
  } else if (evt.target.value === '100') {
    capacity.value = '0';
    for (let option of options) {
      if (option.value !== '0') {
        option.disabled = true;
      }
    }
  }

});
