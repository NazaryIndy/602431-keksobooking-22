const mapFiltersForm = document.querySelector('.map__filters');
const typeInput = mapFiltersForm.querySelector('[name="housing-type"]');

const setType = (cb) => {
  typeInput.addEventListener('change', (evt) => {
    typeInput.value = evt.target.value;
    cb();
  });
};

export { setType };
