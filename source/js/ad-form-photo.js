const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview = document.querySelector('.ad-form__photo');

const isMatch = (type) => {
  return FILE_TYPES.some((it) => {
    return type.endsWith(it);
  });
};

const createImageElement = (src, alt) => {
  const imgElement = document.createElement('img');
  imgElement.src = src;
  imgElement.alt = alt;
  imgElement.width = 70;
  imgElement.height = 70;
  imgElement.style.borderRadius = '5px';
  photoPreview.appendChild(imgElement);
};

const addPhotosListener = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    if (isMatch(fileName)) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photoChooser.addEventListener('change', () => {
    const file = photoChooser.files[0];
    const fileName = file.name.toLowerCase();

    if (isMatch(fileName)) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        photoPreview.innerHTML = '';
        createImageElement(reader.result, fileName);
      });

      reader.readAsDataURL(file);
    }
  });
}

export { addPhotosListener };
