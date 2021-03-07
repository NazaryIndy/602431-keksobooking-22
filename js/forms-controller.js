const adForm = document.querySelector('.ad-form');
const addressField = adForm.querySelector('#address');

const disableForm = (form, className) => {
  form.classList.add(`${className}--disabled`);
  for (let i = 0; i < form.children.length; i++) {
    form.children[i].disabled = true;
  }
};

const enableForm = (form, className) => {
  form.classList.remove(`${className}--disabled`);
  for (let i = 0; i < form.children.length; i++) {
    form.children[i].disabled = false;
  }
};

const setAddresValue = ({lat, lng}) => {
  addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

export { enableForm, disableForm, setAddresValue};
