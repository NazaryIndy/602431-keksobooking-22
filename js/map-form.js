import { disableForm } from './util.js';

const mapFiltersForm = document.querySelector('.map__filters');
const typeInput = mapFiltersForm.querySelector('[name="housing-type"]');

const resetMapForm = () => {
  mapFiltersForm.reset();
}

disableForm(mapFiltersForm, 'map__filters');

const setType = (cb) => {
  typeInput.addEventListener('change', (evt) => {
    typeInput.value = evt.target.value;
    cb();
  });
};

export { mapFiltersForm, resetMapForm, setType };
