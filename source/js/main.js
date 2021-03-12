import { setAdFormSubmit, setAdFormReset } from './ad-form.js';
import { setFilters, mapFiltersForm } from './map-form.js';
import { addOffersToMap, clearMarkers } from './map.js';
import { showAlert, disableForm, enableForm, debounce } from './util.js';
import { getData } from './api.js';
import { resetForm } from './reset-form.js';
import { addPhotosListener } from './ad-form-photo.js';

const RERENDER_DELAY = 500;

getData(
  (offers) => {
    addOffersToMap(offers);
    enableForm(mapFiltersForm, 'map__filters');
    setFilters(debounce(
      () => {
        clearMarkers();
        addOffersToMap(offers);
      },
      RERENDER_DELAY,
    ));
  },
  (errorMessage) => {
    disableForm(mapFiltersForm, 'map__filters');
    showAlert(errorMessage);
  },
);

setAdFormSubmit(resetForm);
setAdFormReset(resetForm);
addPhotosListener();
