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

export { enableForm, disableForm };
