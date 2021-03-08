import { resetAdForm } from './ad-form.js';
import { resetMapForm } from './map-form.js';
import { setDefaultCoordinates } from './map.js';

const resetForm = () => {
  resetAdForm();
  resetMapForm();
  setDefaultCoordinates();
};

export { resetForm };
