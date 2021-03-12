
import { isEscEvent } from './util.js';

const main = document.querySelector('main');
const succesPopupTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorPopupTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const errorButtonElement = errorPopupTemplate.querySelector('.error__button');

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscEvent()) {
    evt.preventDefault();
    removeSuccessMessage();
  }
};

const onErrorMessageEscKeydown = (evt) => {
  if (isEscEvent()) {
    evt.preventDefault();
    removeErrorMessage();
  }
};

const showSuccessMessage = () => {
  main.appendChild(succesPopupTemplate);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
}

const removeSuccessMessage = () => {
  succesPopupTemplate.remove();
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
}

const showErrorMessage = () => {
  main.appendChild(errorPopupTemplate);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
}

const removeErrorMessage = () => {
  errorPopupTemplate.remove();
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
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
