const ALERT_SHOW_TIME = 5000;

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);

  alertContainer.addEventListener('click', () => {
    alertContainer.remove();
  });
}

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

const debounce = (cb, delay) => {
  let timeout = null;

  return ((...args) => {
    const next = () => cb(...args);
    clearTimeout(timeout);
    timeout = setTimeout(next, delay);
  })
};

export {
  showAlert,
  isEscEvent,
  disableForm,
  enableForm,
  debounce
};
