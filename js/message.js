
import { isEscEvent } from './util.js';

const main = document.querySelector('main');
const succesPopupTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorPopupTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const errorButtonElement = errorPopupTemplate.querySelector('.error__button');

const showSuccessMessage = () => {
  main.appendChild(succesPopupTemplate);
}

const removeSuccessMessage = () => {
  succesPopupTemplate.remove();
}

const showErrorMessage = () => {
  main.appendChild(errorPopupTemplate);
}

const removeErrorMessage = () => {
  errorPopupTemplate.remove();
}

if (document.body.contains(succesPopupTemplate)) {
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent()) {
      evt.preventDefault();
      removeSuccessMessage();
    }
  });
}

if (document.body.contains(errorPopupTemplate)) {
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent()) {
      evt.preventDefault();
      removeErrorMessage();
    }
  });
}

errorButtonElement.addEventListener('click', () => {
  removeErrorMessage();
});

errorPopupTemplate.addEventListener('click', () => {
  removeErrorMessage();
});

succesPopupTemplate.addEventListener('click', () => {
  removeSuccessMessage();
});

export { showSuccessMessage, showErrorMessage };
