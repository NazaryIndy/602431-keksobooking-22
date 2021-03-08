import { setAdFormSubmit, setAdFormReset } from './ad-form.js';
import { setType, mapFiltersForm } from './map-form.js';
import { addOffersToMap, clearMarkers } from './map.js';
import { showAlert, disableForm, enableForm } from './util.js';
import { getData } from './api.js';
import { resetForm } from './reset-form.js';

getData(
  (offers) => {
    addOffersToMap(offers);
    enableForm(mapFiltersForm, 'map__filters');
    setType(() => {
      clearMarkers();
      addOffersToMap(offers);
    });
  },
  (errorMessage) => {
    disableForm(mapFiltersForm, 'map__filters');
    showAlert(errorMessage);
  },
);

setAdFormSubmit(resetForm);
setAdFormReset(resetForm);
